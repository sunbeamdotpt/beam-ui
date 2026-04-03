import { useState, useEffect, type ReactNode } from "react";
import { css, cx } from "styled-system/css";
import {
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogCloseTrigger,
  DialogTitle,
} from "@ark-ui/react/dialog";
import { Button } from "./button";
import { Icon } from "./icon";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface WizardStep {
  title: string;
  description?: string;
  content: ReactNode;
  /** If true, the Next button is disabled until the consumer sets it to false */
  isValid?: boolean;
}

export interface WizardProps {
  steps: WizardStep[];
  onComplete: () => void;
  onCancel?: () => void;
  /** Called when step changes — receives the new step index */
  onStepChange?: (step: number) => void;
  /** Labels for the buttons */
  nextLabel?: string;
  backLabel?: string;
  completeLabel?: string;
  cancelLabel?: string;
  className?: string;
}

export interface WizardModalProps extends WizardProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

/* ------------------------------------------------------------------ */
/* Wizard                                                              */
/* ------------------------------------------------------------------ */

export function Wizard({
  steps,
  onComplete,
  onCancel,
  onStepChange,
  nextLabel = "Continue",
  backLabel = "Back",
  completeLabel = "Finish",
  cancelLabel = "Cancel",
  className,
}: WizardProps) {
  const [current, setCurrent] = useState(0);
  const step = steps[current];
  const isFirst = current === 0;
  const isLast = current === steps.length - 1;
  const canProceed = step.isValid !== false;

  const goNext = () => {
    if (isLast) {
      onComplete();
    } else {
      const next = current + 1;
      setCurrent(next);
      onStepChange?.(next);
    }
  };

  const goBack = () => {
    if (!isFirst) {
      const prev = current - 1;
      setCurrent(prev);
      onStepChange?.(prev);
    }
  };

  return (
    <div className={cx(wrapper, className)}>
      {/* Step indicator */}
      <nav aria-label="Wizard progress" className={stepIndicator}>
        {steps.map((s, i) => (
          <div key={i} className={stepItem} aria-current={i === current ? "step" : undefined}>
            <div className={cx(
              stepCircle,
              i < current ? stepDone :
              i === current ? stepActive :
              stepPending
            )} aria-hidden="true">
              {i < current ? (
                <Icon name="check" size={14} />
              ) : (
                <span className={stepNumber}>{i + 1}</span>
              )}
            </div>
            <span className={cx(
              stepLabel,
              i === current && stepLabelActive
            )}>
              {s.title}
            </span>
            {i < steps.length - 1 && (
              <div className={cx(stepLine, i < current && stepLineDone)} aria-hidden="true" />
            )}
          </div>
        ))}
      </nav>

      {/* Content */}
      <div className={content} aria-live="polite">
        {step.description && (
          <p className={description}>{step.description}</p>
        )}
        <div className={body}>
          {step.content}
        </div>
      </div>

      {/* Actions */}
      <div className={actions}>
        <div className={actionsLeft}>
          {onCancel && isFirst && (
            <Button variant="ghost" onClick={onCancel}>{cancelLabel}</Button>
          )}
          {!isFirst && (
            <Button variant="ghost" onClick={goBack}>
              <Icon name="arrow_back" size={16} />
              {backLabel}
            </Button>
          )}
        </div>
        <div className={actionsRight}>
          <span className={stepCount}>{current + 1} of {steps.length}</span>
          <Button
            variant="primary"
            onClick={goNext}
            disabled={!canProceed}
            aria-disabled={!canProceed}
          >
            {isLast ? completeLabel : nextLabel}
            {!isLast && <Icon name="arrow_forward" size={16} />}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* WizardModal                                                         */
/* ------------------------------------------------------------------ */

export function WizardModal({
  open,
  onClose,
  title,
  onCancel,
  ...wizardProps
}: WizardModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <DialogRoot open={open} onOpenChange={(d) => { if (!d.open) onClose(); }}>
      <DialogBackdrop className={modalBackdrop} />
      <DialogPositioner className={modalPositioner}>
        <DialogContent className={modalContent}>
          <div className={modalHeader}>
            {title && <DialogTitle className={modalTitle}>{title}</DialogTitle>}
            <DialogCloseTrigger className={modalClose} aria-label="Close wizard">
              <Icon name="close" size={20} />
            </DialogCloseTrigger>
          </div>
          <Wizard
            {...wizardProps}
            onCancel={onCancel ?? onClose}
          />
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const wrapper = css({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
});

const stepIndicator = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0",
});

const stepItem = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const stepCircle = css({
  width: "28px",
  height: "28px",
  borderRadius: "full",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "xs",
  fontWeight: "button",
  fontFamily: "mono",
  flexShrink: 0,
  transition: "all 0.2s ease",
});

const stepDone = css({
  backgroundColor: "sunbeam.orange",
  color: "white",
});

const stepActive = css({
  backgroundColor: "sunbeam.orange",
  color: "white",
  boxShadow: "0 0 0 3px rgba(250, 82, 15, 0.2)",
});

const stepPending = css({
  backgroundColor: "bg.card",
  color: "text.muted",
  border: "1px solid",
  borderColor: "border.default",
});

const stepNumber = css({
  fontSize: "xs",
});

const stepLabel = css({
  fontSize: "xs",
  color: "text.muted",
  fontWeight: "body",
  whiteSpace: "nowrap",
  display: { base: "none", md: "block" },
});

const stepLabelActive = css({
  color: "text.primary",
  fontWeight: "heading",
});

const stepLine = css({
  width: { base: "16px", md: "40px" },
  height: "2px",
  backgroundColor: "border.default",
  marginInline: "8px",
  flexShrink: 0,
  transition: "background-color 0.2s ease",
});

const stepLineDone = css({
  backgroundColor: "sunbeam.orange",
});

const content = css({
  minHeight: "120px",
});

const description = css({
  fontSize: "sm",
  color: "text.secondary",
  lineHeight: 1.6,
  marginBottom: "16px",
});

const body = css({});

const actions = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: "16px",
  borderTop: "1px solid",
  borderColor: "border.subtle",
});

const actionsLeft = css({
  display: "flex",
  gap: "8px",
});

const actionsRight = css({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const stepCount = css({
  fontSize: "xs",
  fontFamily: "mono",
  color: "text.muted",
});

/* Modal styles */

const modalBackdrop = css({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: 50,
});

const modalPositioner = css({
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 51,
  padding: "24px",
});

const modalContent = css({
  backgroundColor: "bg.page",
  border: "1px solid",
  borderColor: "border.default",
  shadow: "golden",
  width: "100%",
  maxWidth: "600px",
  maxHeight: "85vh",
  overflowY: "auto",
  padding: "24px",
});

const modalHeader = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
});

const modalTitle = css({
  fontSize: "xl",
  fontWeight: "heading",
  fontFamily: "heading",
  color: "text.primary",
  margin: 0,
});

const modalClose = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "text.muted",
  padding: "4px",
  _hover: { color: "sunbeam.orange" },
});
