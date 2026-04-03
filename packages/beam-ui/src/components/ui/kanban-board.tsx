import { useState, useMemo } from "react";
import { css, cx } from "styled-system/css";
import {
  DndContext,
  closestCorners,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface KanbanCard {
  id: string;
  title: string;
  labels?: { name: string; color: string }[];
  assignees?: { name: string; avatarUrl?: string }[];
  milestone?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  onChange: (columns: KanbanColumn[]) => void;
  onAddCard?: (columnId: string) => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Sortable card                                                       */
/* ------------------------------------------------------------------ */
function SortableCard({ card }: { card: KanbanCard }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <KanbanCardView card={card} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Card content (shared between sortable + overlay)                    */
/* ------------------------------------------------------------------ */
/** Standalone card display — usable outside the board (e.g., in lists, detail panels). */
export function KanbanCardView({ card, ghost }: { card: KanbanCard; ghost?: boolean }) {
  return (
    <div className={cx(cardStyle, ghost && cardGhostStyle)}>
      <p className={cardTitleStyle}>{card.title}</p>

      {card.labels && card.labels.length > 0 && (
        <div className={labelsRow}>
          {card.labels.map((l) => (
            <span
              key={l.name}
              className={labelPill}
              style={{ backgroundColor: l.color }}
            >
              {l.name}
            </span>
          ))}
        </div>
      )}

      <div className={cardFooter}>
        {card.assignees && card.assignees.length > 0 && (
          <div className={avatarStack}>
            {card.assignees.map((a, i) => (
              <div
                key={a.name}
                className={avatarCircle}
                style={{ zIndex: card.assignees!.length - i }}
                title={a.name}
              >
                {a.avatarUrl ? (
                  <img src={a.avatarUrl} alt={a.name} className={avatarImg} />
                ) : (
                  <span className={avatarInitial}>
                    {a.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {card.milestone && (
          <span className={milestoneText}>{card.milestone}</span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Column                                                              */
/* ------------------------------------------------------------------ */
function Column({
  column,
  onAddCard,
}: {
  column: KanbanColumn;
  onAddCard?: (columnId: string) => void;
}) {
  const cardIds = useMemo(() => column.cards.map((c) => c.id), [column.cards]);

  return (
    <div className={columnStyle}>
      <div className={columnHeader}>
        <span className={columnTitle}>{column.title}</span>
        <span className={columnCount}>{column.cards.length}</span>
      </div>

      <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
        <div className={columnBody}>
          {column.cards.map((card) => (
            <SortableCard key={card.id} card={card} />
          ))}
        </div>
      </SortableContext>

      {onAddCard && (
        <button
          className={addCardBtn}
          onClick={() => onAddCard(column.id)}
          type="button"
        >
          + Add card
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Board                                                               */
/* ------------------------------------------------------------------ */
export function KanbanBoard({
  columns,
  onChange,
  onAddCard,
  className,
}: KanbanBoardProps) {
  const [activeCard, setActiveCard] = useState<KanbanCard | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  function findColumn(cardId: string) {
    return columns.find((col) => col.cards.some((c) => c.id === cardId));
  }

  function handleDragStart(event: DragStartEvent) {
    const col = findColumn(String(event.active.id));
    const card = col?.cards.find((c) => c.id === String(event.active.id));
    setActiveCard(card ?? null);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const sourceCol = findColumn(activeId);
    // over might be a card or a column id
    let destCol = findColumn(overId) ?? columns.find((c) => c.id === overId);

    if (!sourceCol || !destCol || sourceCol.id === destCol.id) return;

    const newColumns = columns.map((col) => ({ ...col, cards: [...col.cards] }));
    const src = newColumns.find((c) => c.id === sourceCol.id)!;
    const dst = newColumns.find((c) => c.id === destCol!.id)!;
    const cardIndex = src.cards.findIndex((c) => c.id === activeId);
    const [card] = src.cards.splice(cardIndex, 1);

    const overIndex = dst.cards.findIndex((c) => c.id === overId);
    if (overIndex >= 0) {
      dst.cards.splice(overIndex, 0, card);
    } else {
      dst.cards.push(card);
    }

    onChange(newColumns);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const col = findColumn(activeId);
    if (!col) return;

    const oldIndex = col.cards.findIndex((c) => c.id === activeId);
    const newIndex = col.cards.findIndex((c) => c.id === overId);

    if (oldIndex !== newIndex && newIndex >= 0) {
      const newColumns = columns.map((c) => {
        if (c.id !== col.id) return c;
        return { ...c, cards: arrayMove(c.cards, oldIndex, newIndex) };
      });
      onChange(newColumns);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={cx(boardStyle, className)}>
        {columns.map((col) => (
          <Column key={col.id} column={col} onAddCard={onAddCard} />
        ))}
      </div>

      <DragOverlay>
        {activeCard ? <KanbanCardView card={activeCard} ghost /> : null}
      </DragOverlay>
    </DndContext>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */
const boardStyle = css({
  display: "flex",
  gap: "16px",
  overflowX: "auto",
  padding: "8px 0",
});

const columnStyle = css({
  minWidth: "260px",
  maxWidth: "320px",
  flex: "1 0 260px",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  display: "flex",
  flexDirection: "column",
});

const columnHeader = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  borderBottom: "1px solid",
  borderColor: "border.default",
});

const columnTitle = css({
  fontSize: "10px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: "text.muted",
});

const columnCount = css({
  fontSize: "11px",
  fontFamily: "mono",
  color: "text.muted",
  backgroundColor: "bg.page",
  padding: "2px 8px",
  border: "1px solid",
  borderColor: "border.default",
});

const columnBody = css({
  flex: 1,
  padding: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  minHeight: "60px",
});

const cardStyle = css({
  backgroundColor: "bg.page",
  border: "1px solid",
  borderColor: "border.default",
  padding: "12px",
  cursor: "grab",
  transition: "box-shadow 0.15s ease, border-color 0.15s ease",
  shadow: "xs",
  _hover: {
    borderColor: "sunbeam.orange",
  },
  _active: {
    cursor: "grabbing",
  },
});

const cardGhostStyle = css({
  boxShadow: "0 4px 20px rgba(250, 82, 15, 0.25)",
  borderColor: "sunbeam.orange",
});

const cardTitleStyle = css({
  fontSize: "13px",
  fontWeight: "button",
  color: "text.primary",
  lineHeight: 1.4,
  marginBottom: "8px",
});

const labelsRow = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "4px",
  marginBottom: "8px",
});

const labelPill = css({
  fontSize: "10px",
  padding: "1px 8px",
  color: "#fff",
  fontWeight: "button",
  letterSpacing: "0.02em",
});

const cardFooter = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
});

const avatarStack = css({
  display: "flex",
});

const avatarCircle = css({
  width: "22px",
  height: "22px",
  borderRadius: "50%",
  border: "2px solid",
  borderColor: "bg.page",
  backgroundColor: "bg.card",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "-6px",
  overflow: "hidden",
});

const avatarImg = css({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const avatarInitial = css({
  fontSize: "9px",
  fontWeight: "button",
  color: "text.muted",
  textTransform: "uppercase",
});

const milestoneText = css({
  fontSize: "10px",
  color: "text.muted",
  fontFamily: "mono",
});

const addCardBtn = css({
  padding: "8px 16px",
  fontSize: "12px",
  color: "text.muted",
  background: "none",
  border: "none",
  borderTop: "1px solid",
  borderColor: "border.default",
  cursor: "pointer",
  textAlign: "left",
  transition: "color 0.15s ease",
  _hover: {
    color: "sunbeam.orange",
  },
});
