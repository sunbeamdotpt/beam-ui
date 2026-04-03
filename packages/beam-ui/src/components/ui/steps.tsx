import {
  StepsRoot,
  StepsList,
  StepsItem,
  StepsTrigger,
  StepsIndicator,
  StepsSeparator,
} from "@ark-ui/react/steps";
import { css, cx } from "styled-system/css";

interface StepItem {
  title: string;
  description?: string;
}

interface StepsProps {
  steps: StepItem[];
  currentStep: number;
  onChange?: (step: number) => void;
}

export function Steps({ steps, currentStep, onChange }: StepsProps) {
  return (
    <StepsRoot
      count={steps.length}
      step={currentStep}
      onStepChange={onChange ? (details) => onChange(details.step) : undefined}
      className={root}
    >
      <StepsList className={list}>
        {steps.map((stepItem, index) => (
          <StepsItem key={index} index={index} className={item}>
            <StepsTrigger className={trigger}>
              <StepsIndicator
                className={cx(
                  indicator,
                  index < currentStep
                    ? completedIndicator
                    : index === currentStep
                      ? currentIndicator
                      : upcomingIndicator
                )}
              >
                {index < currentStep ? (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path
                      d="M1 5L4.5 8.5L11 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span className={stepNumber}>{index + 1}</span>
                )}
              </StepsIndicator>
              <div className={labelWrap}>
                <span
                  className={cx(
                    label,
                    index === currentStep ? currentLabel : undefined
                  )}
                >
                  {stepItem.title}
                </span>
                {stepItem.description && (
                  <span className={description}>{stepItem.description}</span>
                )}
              </div>
            </StepsTrigger>
            {index < steps.length - 1 && (
              <StepsSeparator
                className={cx(
                  separator,
                  index < currentStep ? completedSeparator : undefined
                )}
              />
            )}
          </StepsItem>
        ))}
      </StepsList>
    </StepsRoot>
  );
}

const root = css({
  width: "100%",
});

const list = css({
  display: "flex",
  alignItems: "flex-start",
});

const item = css({
  display: "flex",
  alignItems: "center",
  flex: 1,
});

const trigger = css({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
  whiteSpace: "nowrap",
});

const indicator = css({
  width: "32px",
  height: "32px",
  borderRadius: "full",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  transition: "all 0.2s ease",
});

const completedIndicator = css({
  backgroundColor: "sunbeam.orange",
});

const currentIndicator = css({
  backgroundColor: "transparent",
  border: "2px solid",
  borderColor: "sunbeam.orange",
});

const upcomingIndicator = css({
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
});

const stepNumber = css({
  fontSize: "13px",
  fontWeight: "heading",
  fontFamily: "body",
  color: "text.primary",
});

const labelWrap = css({
  display: "flex",
  flexDirection: "column",
  gap: "1px",
});

const label = css({
  fontSize: "14px",
  fontWeight: "body",
  fontFamily: "body",
  color: "text.secondary",
  lineHeight: 1.3,
});

const currentLabel = css({
  fontWeight: "heading",
  color: "text.primary",
});

const description = css({
  fontSize: "12px",
  color: "text.muted",
  fontFamily: "body",
  lineHeight: 1.3,
});

const separator = css({
  flex: 1,
  height: "2px",
  backgroundColor: "border.default",
  margin: "0 12px",
  borderRadius: "full",
  transition: "background-color 0.2s ease",
  alignSelf: "center",
});

const completedSeparator = css({
  backgroundColor: "sunbeam.orange",
});
