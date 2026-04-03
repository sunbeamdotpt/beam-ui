import { useId } from "react";
import { css, cx } from "styled-system/css";
import {
  DatePickerRoot,
  DatePickerControl,
  DatePickerInput,
  DatePickerTrigger,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerTable,
  DatePickerTableHead,
  DatePickerTableHeader,
  DatePickerTableBody,
  DatePickerTableRow,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerPrevTrigger,
  DatePickerNextTrigger,
  DatePickerViewTrigger,
  DatePickerView,
  DatePickerViewControl,
  DatePickerContext,
  parseDate,
} from "@ark-ui/react/date-picker";
import { Icon } from "./icon";

interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  label,
  placeholder = "Select date",
  disabled = false,
  className,
}: DatePickerProps) {
  const inputId = useId();
  return (
    <div className={cx(wrapper, className)}>
      {label && <label htmlFor={inputId} className={labelStyle}>{label}</label>}
      <DatePickerRoot
        value={value ? [parseDate(value)] : undefined}
        onValueChange={(details) => {
          const dv = details.value[0];
          if (dv) {
            const iso = `${dv.year}-${String(dv.month).padStart(2, "0")}-${String(dv.day).padStart(2, "0")}`;
            onChange?.(iso);
          }
        }}
        disabled={disabled}
        closeOnSelect
      >
        <DatePickerControl className={controlStyle}>
          <DatePickerInput id={inputId} className={inputStyle} placeholder={placeholder} />
          <DatePickerTrigger className={triggerButton} aria-label="Open calendar">
            <Icon name="calendar_today" size={18} />
          </DatePickerTrigger>
        </DatePickerControl>

        <DatePickerPositioner className={positionerStyle}>
          <DatePickerContent className={contentStyle}>
            <DatePickerView view="day">
              <DatePickerContext>
                {(context) => (
                  <>
                    <DatePickerViewControl className={navRow}>
                      <DatePickerPrevTrigger className={navButton} aria-label="Previous">
                        <Icon name="chevron_left" size={18} />
                      </DatePickerPrevTrigger>
                      <DatePickerViewTrigger className={viewTrigger}>
                        {context.visibleRangeText.start}
                      </DatePickerViewTrigger>
                      <DatePickerNextTrigger className={navButton} aria-label="Next">
                        <Icon name="chevron_right" size={18} />
                      </DatePickerNextTrigger>
                    </DatePickerViewControl>

                    <DatePickerTable className={tableStyle}>
                      <DatePickerTableHead>
                        <DatePickerTableRow>
                          {context.weekDays.map((weekDay, i) => (
                            <DatePickerTableHeader key={i} className={headerCell}>
                              {weekDay.narrow}
                            </DatePickerTableHeader>
                          ))}
                        </DatePickerTableRow>
                      </DatePickerTableHead>
                      <DatePickerTableBody>
                        {context.weeks.map((week, i) => (
                          <DatePickerTableRow key={i}>
                            {week.map((day, j) => (
                              <DatePickerTableCell key={j} value={day} className={dayCell}>
                                <DatePickerTableCellTrigger className={dayCellTrigger}>
                                  {day.day}
                                </DatePickerTableCellTrigger>
                              </DatePickerTableCell>
                            ))}
                          </DatePickerTableRow>
                        ))}
                      </DatePickerTableBody>
                    </DatePickerTable>
                  </>
                )}
              </DatePickerContext>
            </DatePickerView>

            <DatePickerView view="month">
              <DatePickerContext>
                {(context) => (
                  <>
                    <DatePickerViewControl className={navRow}>
                      <DatePickerPrevTrigger className={navButton} aria-label="Previous">
                        <Icon name="chevron_left" size={18} />
                      </DatePickerPrevTrigger>
                      <DatePickerViewTrigger className={viewTrigger}>
                        {context.visibleRange.start.year}
                      </DatePickerViewTrigger>
                      <DatePickerNextTrigger className={navButton} aria-label="Next">
                        <Icon name="chevron_right" size={18} />
                      </DatePickerNextTrigger>
                    </DatePickerViewControl>

                    <DatePickerTable className={tableStyle}>
                      <DatePickerTableBody>
                        {context.getMonthsGrid({ columns: 4, format: "short" }).map((months, i) => (
                          <DatePickerTableRow key={i}>
                            {months.map((month, j) => (
                              <DatePickerTableCell key={j} value={month.value} className={dayCell}>
                                <DatePickerTableCellTrigger className={dayCellTrigger}>
                                  {month.label}
                                </DatePickerTableCellTrigger>
                              </DatePickerTableCell>
                            ))}
                          </DatePickerTableRow>
                        ))}
                      </DatePickerTableBody>
                    </DatePickerTable>
                  </>
                )}
              </DatePickerContext>
            </DatePickerView>

            <DatePickerView view="year">
              <DatePickerContext>
                {(context) => (
                  <>
                    <DatePickerViewControl className={navRow}>
                      <DatePickerPrevTrigger className={navButton} aria-label="Previous">
                        <Icon name="chevron_left" size={18} />
                      </DatePickerPrevTrigger>
                      <DatePickerViewTrigger className={viewTrigger}>
                        {context.getYearsGrid().at(0)?.at(0)?.label} &ndash;{" "}
                        {context.getYearsGrid().at(-1)?.at(-1)?.label}
                      </DatePickerViewTrigger>
                      <DatePickerNextTrigger className={navButton} aria-label="Next">
                        <Icon name="chevron_right" size={18} />
                      </DatePickerNextTrigger>
                    </DatePickerViewControl>

                    <DatePickerTable className={tableStyle}>
                      <DatePickerTableBody>
                        {context.getYearsGrid({ columns: 4 }).map((years, i) => (
                          <DatePickerTableRow key={i}>
                            {years.map((year, j) => (
                              <DatePickerTableCell key={j} value={year.value} className={dayCell}>
                                <DatePickerTableCellTrigger className={dayCellTrigger}>
                                  {year.label}
                                </DatePickerTableCellTrigger>
                              </DatePickerTableCell>
                            ))}
                          </DatePickerTableRow>
                        ))}
                      </DatePickerTableBody>
                    </DatePickerTable>
                  </>
                )}
              </DatePickerContext>
            </DatePickerView>
          </DatePickerContent>
        </DatePickerPositioner>
      </DatePickerRoot>
    </div>
  );
}

const wrapper = css({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  width: "100%",
});

const labelStyle = css({
  fontSize: "12px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "text.secondary",
  fontFamily: "body",
});

const controlStyle = css({
  display: "flex",
  alignItems: "center",
  width: "100%",
});

const inputStyle = css({
  width: "100%",
  padding: "10px 12px",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  borderRadius: "0",
  fontSize: "14px",
  fontFamily: "mono",
  color: "text.primary",
  outline: "none",
  transition: "all 0.15s ease",
  _focus: {
    ringWidth: "2px",
    ringColor: "sunbeam.orange",
    borderColor: "transparent",
  },
  _disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  _placeholder: {
    color: "text.muted",
  },
});

const triggerButton = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 12px",
  height: "auto",
  alignSelf: "stretch",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  borderLeft: "none",
  borderRadius: "0",
  cursor: "pointer",
  color: "text.secondary",
  transition: "color 0.15s ease",
  _hover: {
    color: "sunbeam.orange",
  },
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "sunbeam.orange",
    outlineOffset: "-2px",
  },
  _disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

const positionerStyle = css({
  zIndex: 50,
});

const contentStyle = css({
  backgroundColor: "bg.page",
  border: "1px solid",
  borderColor: "border.default",
  shadow: "golden",
  padding: "16px",
  zIndex: 50,
  outline: "none",
  minWidth: "280px",
  "&[data-state=closed]": {
    display: "none",
  },
});

const navRow = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "12px",
});

const navButton = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "text.secondary",
  padding: "4px",
  transition: "color 0.15s ease",
  _hover: {
    color: "sunbeam.orange",
  },
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "sunbeam.orange",
    outlineOffset: "2px",
  },
});

const viewTrigger = css({
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "heading",
  fontFamily: "body",
  color: "text.primary",
  padding: "4px 8px",
  transition: "color 0.15s ease",
  _hover: {
    color: "sunbeam.orange",
  },
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "sunbeam.orange",
    outlineOffset: "2px",
  },
});

const tableStyle = css({
  width: "100%",
  borderCollapse: "collapse",
});

const headerCell = css({
  fontSize: "11px",
  fontWeight: "button",
  textTransform: "uppercase",
  color: "text.muted",
  textAlign: "center",
  padding: "4px",
  fontFamily: "mono",
});

const dayCell = css({
  textAlign: "center",
  padding: "1px",
});

const dayCellTrigger = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  fontSize: "13px",
  fontFamily: "mono",
  color: "text.primary",
  background: "none",
  border: "1px solid transparent",
  cursor: "pointer",
  transition: "all 0.15s ease",
  borderRadius: "0",
  _hover: {
    backgroundColor: "bg.card",
    borderColor: "border.default",
  },
  _today: {
    fontWeight: "heading",
    borderColor: "border.default",
  },
  _selected: {
    backgroundColor: "sunbeam.orange",
    color: "white",
    borderColor: "sunbeam.orange",
    fontWeight: "heading",
  },
  "&[data-outside-range]": {
    color: "text.muted",
    opacity: 0.4,
  },
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "sunbeam.orange",
    outlineOffset: "1px",
  },
  _disabled: {
    opacity: 0.3,
    cursor: "not-allowed",
  },
});
