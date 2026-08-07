import { useState } from "react";
import { type Reaction, ReactionPicker } from "./reaction-picker.tsx";

export default function ReactionPickerStory() {
  const [reactions, setReactions] = useState<Reaction[]>([
    { emoji: "\u{1F44D}", count: 3, reacted: true },
    { emoji: "\u{1F389}", count: 1, reacted: false },
    { emoji: "\u{1F680}", count: 5, reacted: false },
  ]);

  const handleToggle = (emoji: string) => {
    setReactions((prev) =>
      prev.map((r) =>
        r.emoji === emoji
          ? {
            ...r,
            reacted: !r.reacted,
            count: r.reacted ? r.count - 1 : r.count + 1,
          }
          : r
      )
    );
  };

  const handleAdd = (emoji: string) => {
    setReactions((prev) => {
      const existing = prev.find((r) => r.emoji === emoji);
      if (existing) {
        return prev.map((
          r,
        ) => (r.emoji === emoji ? { ...r, reacted: true, count: r.count + 1 } : r));
      }
      return [...prev, { emoji, count: 1, reacted: true }];
    });
  };

  return (
    <ReactionPicker
      reactions={reactions}
      onToggle={handleToggle}
      onAdd={handleAdd}
    />
  );
}

export function Empty() {
  return <ReactionPicker reactions={[]} onToggle={() => {}} onAdd={() => {}} />;
}

export function ManyReactions() {
  const many: Reaction[] = [
    { emoji: "\u{1F44D}", count: 12, reacted: true },
    { emoji: "\u{1F44E}", count: 2, reacted: false },
    { emoji: "\u{1F604}", count: 8, reacted: true },
    { emoji: "\u{1F389}", count: 5, reacted: false },
    { emoji: "\u{1F680}", count: 3, reacted: false },
    { emoji: "\u{2764}\u{FE0F}", count: 7, reacted: true },
  ];
  return <ReactionPicker reactions={many} onToggle={() => {}} onAdd={() => {}} />;
}
