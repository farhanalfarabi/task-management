"use client";

import { createContext, useContext, useRef, useState, useEffect, useMemo, useCallback } from "react";
import { atom, useAtom } from "jotai";
import throttle from "lodash.throttle";
import { getDaysInMonth } from "date-fns";
import { createInitialTimelineData, getOffset } from "./utils";

const draggingAtom = atom(false);
const scrollXAtom = atom(0);

export const useGanttDragging = () => useAtom(draggingAtom);
export const useGanttScrollX = () => useAtom(scrollXAtom);

export const GanttContext = createContext(null);

export const GanttProvider = ({
  zoom = 100,
  range = "monthly",
  onAddItem,
  children,
  className,
  sidebarCollapsed = false,
}) => {
  const scrollRef = useRef(null);
  const [timelineData, setTimelineData] = useState(() =>
    createInitialTimelineData(new Date())
  );
  const [, setScrollX] = useGanttScrollX();
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const headerHeight = 60;
  const rowHeight = 36;

  // Recalculate columnWidth when range changes
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const columnWidth = useMemo(() => {
    let width = 50;
    if (range === "monthly") {
      width = isMobile ? 120 : 150;
    } else if (range === "quarterly") {
      width = isMobile ? 80 : 100;
    } else {
      width = isMobile ? 40 : 50;
    }
    return width;
  }, [range, isMobile]);

  const cssVariables = useMemo(
    () => ({
      "--gantt-zoom": `${zoom}`,
      "--gantt-column-width": `${(zoom / 100) * columnWidth}px`,
      "--gantt-header-height": `${headerHeight}px`,
      "--gantt-row-height": `${rowHeight}px`,
      "--gantt-sidebar-width": `${sidebarWidth}px`,
    }),
    [zoom, columnWidth, sidebarWidth]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft =
        scrollRef.current.scrollWidth / 2 - scrollRef.current.clientWidth / 2;
      setScrollX(scrollRef.current.scrollLeft);
    }
  }, [setScrollX]);

  useEffect(() => {
    const updateSidebarWidth = () => {
      // If sidebar is collapsed, set width to 0
      if (sidebarCollapsed) {
        setSidebarWidth(0);
        return;
      }
      
      const sidebarElement = scrollRef.current?.querySelector(
        '[data-roadmap-ui="gantt-sidebar"]'
      );
      if (!sidebarElement) {
        setSidebarWidth(0);
        return;
      }
      
      // Responsive sidebar width: smaller on mobile
      const isMobile = window.innerWidth < 768;
      const newWidth = isMobile ? 200 : 300;
      setSidebarWidth(newWidth);
    };

    updateSidebarWidth();

    // Update on resize
    const handleResize = () => {
      updateSidebarWidth();
    };
    window.addEventListener('resize', handleResize);

    const observer = new MutationObserver(updateSidebarWidth);
    if (scrollRef.current) {
      observer.observe(scrollRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [sidebarCollapsed]);

  const handleScroll = useCallback(
    throttle(() => {
      const scrollElement = scrollRef.current;
      if (!scrollElement) {
        return;
      }

      const { scrollLeft, scrollWidth, clientWidth } = scrollElement;
      setScrollX(scrollLeft);

      if (scrollLeft === 0) {
        const firstYear = timelineData[0]?.year;
        if (!firstYear) {
          return;
        }

        const newTimelineData = [...timelineData];
        newTimelineData.unshift({
          year: firstYear - 1,
          quarters: new Array(4).fill(null).map((_, quarterIndex) => ({
            months: new Array(3).fill(null).map((_, monthIndex) => {
              const month = quarterIndex * 3 + monthIndex;
              return {
                days: getDaysInMonth(new Date(firstYear, month, 1)),
              };
            }),
          })),
        });

        setTimelineData(newTimelineData);
        scrollElement.scrollLeft = scrollElement.clientWidth;
        setScrollX(scrollElement.scrollLeft);
      } else if (scrollLeft + clientWidth >= scrollWidth) {
        const lastYear = timelineData.at(-1)?.year;
        if (!lastYear) {
          return;
        }

        const newTimelineData = [...timelineData];
        newTimelineData.push({
          year: lastYear + 1,
          quarters: new Array(4).fill(null).map((_, quarterIndex) => ({
            months: new Array(3).fill(null).map((_, monthIndex) => {
              const month = quarterIndex * 3 + monthIndex;
              return {
                days: getDaysInMonth(new Date(lastYear, month, 1)),
              };
            }),
          })),
        });

        setTimelineData(newTimelineData);
        scrollElement.scrollLeft =
          scrollElement.scrollWidth - scrollElement.clientWidth;
        setScrollX(scrollElement.scrollLeft);
      }
    }, 100),
    [timelineData, setScrollX]
  );

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  const scrollToFeature = useCallback(
    (feature) => {
      const scrollElement = scrollRef.current;
      if (!scrollElement) {
        return;
      }

      const timelineStartDate = new Date(timelineData[0].year, 0, 1);

      const offset = getOffset(
        feature.startAt,
        timelineStartDate,
        {
          zoom,
          range,
          columnWidth,
          sidebarWidth,
          headerHeight,
          rowHeight,
          onAddItem,
          placeholderLength: 2,
          timelineData,
          ref: scrollRef,
        }
      );

      const targetScrollLeft = Math.max(0, offset);

      scrollElement.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });
    },
    [
      timelineData,
      zoom,
      range,
      columnWidth,
      sidebarWidth,
      headerHeight,
      rowHeight,
      onAddItem,
    ]
  );

  const contextValue = useMemo(
    () => ({
      zoom,
      range,
      headerHeight,
      columnWidth,
      sidebarWidth,
      rowHeight,
      onAddItem,
      timelineData,
      placeholderLength: 2,
      ref: scrollRef,
      scrollToFeature,
    }),
    [
      zoom,
      range,
      headerHeight,
      columnWidth,
      sidebarWidth,
      rowHeight,
      onAddItem,
      timelineData,
      scrollToFeature,
    ]
  );

  return (
    <GanttContext.Provider value={contextValue}>
      <div
        className={`gantt relative grid h-full w-full flex-none select-none overflow-x-auto overflow-y-auto rounded-sm bg-secondary ${range} ${className || ""}`}
        ref={scrollRef}
        style={{
          ...cssVariables,
          gridTemplateColumns: sidebarCollapsed ? "0 1fr" : "var(--gantt-sidebar-width) 1fr",
          WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
        }}
      >
        {children}
      </div>
    </GanttContext.Provider>
  );
};

