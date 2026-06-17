"use client";

import * as React from "react";
import { DayPicker, useDayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function MonthCaption({ calendarMonth }: { calendarMonth: { date: Date } }) {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();
  return (
    <div className="flex items-center justify-between pt-1 w-full">
      <span className="text-sm font-medium">
        {format(calendarMonth.date, "MMMM yyyy")}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => previousMonth && goToMonth(previousMonth)}
          disabled={!previousMonth}
          aria-label="Go to previous month"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 disabled:opacity-30",
          )}
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          onClick={() => nextMonth && goToMonth(nextMonth)}
          disabled={!nextMonth}
          aria-label="Go to next month"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 disabled:opacity-30",
          )}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center pt-1",
        caption_label: "text-sm font-medium",
        nav: "hidden",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "text-muted-foreground w-8 font-normal text-[0.8rem] text-center",
        weeks: "mt-2",
        week: "flex w-full mt-2",
        day: "relative p-0 text-center text-sm [&:has([aria-selected])]:bg-accent [&:has([aria-selected])]:rounded-md",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100",
        ),
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md",
        today: "bg-accent text-accent-foreground rounded-md",
        outside: "text-muted-foreground opacity-50",
        disabled: "text-muted-foreground opacity-50",
        range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        range_start: "rounded-l-md",
        range_end: "rounded-r-md",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        MonthCaption,
      }}
      {...props}
    />
  );
}

export { Calendar };
