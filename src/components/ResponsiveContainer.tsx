import React, {
  useRef,
  useEffect,
  RefCallback,
  HTMLAttributes,
  FC,
} from "react";
import { keys } from "../lib/utils";
import { Breakpoint } from "../lib/breakpoint";

export const DEFAULT_BREAKPOINTS = {
  [Breakpoint.XS]: 0,
  [Breakpoint.SM]: 384,
  [Breakpoint.MD]: 576,
  [Breakpoint.LG]: 768,
  [Breakpoint.XL]: 960,
};

/**
 * We only need a single ResizeObserver for all of our responsive containers as this is more performant then creating
 * an observer for each container
 */
const responsiveObserver = new ResizeObserver((entries) => {
  const rawBreakpointClasses: Record<Breakpoint, string> = {
    [Breakpoint.XS]: Breakpoint.XS.slice(1),
    [Breakpoint.SM]: Breakpoint.SM.slice(1),
    [Breakpoint.MD]: Breakpoint.MD.slice(1),
    [Breakpoint.LG]: Breakpoint.LG.slice(1),
    [Breakpoint.XL]: Breakpoint.XL.slice(1),
  };

  entries.forEach((entry) => {
    keys(DEFAULT_BREAKPOINTS).forEach((breakpoint) => {
      const minWidth = DEFAULT_BREAKPOINTS[breakpoint];

      // add the breakpoint when the minimum width was met and remove it otherwise
      if (entry.contentRect.width >= minWidth) {
        entry.target.classList.add(rawBreakpointClasses[breakpoint]);
      } else {
        entry.target.classList.remove(rawBreakpointClasses[breakpoint]);
      }
    });
  });
});

/**
 * Creates a responsive container area. Uses a global ResizeObserver under the hood to avoid React's reconciliation
 * and relies only on CSS cascading.
 */
const ResponsiveContainer: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const previousNodeRef = useRef<HTMLDivElement>();
  const containerRef: RefCallback<HTMLDivElement> = (node) => {
    if (node) {
      responsiveObserver.observe(node);
      // Save the current node to unobserve it later, when the node changes
      previousNodeRef.current = node;
    } else if (previousNodeRef.current) {
      responsiveObserver.unobserve(previousNodeRef.current);
    }
  };

  useEffect(() => {
    return () => responsiveObserver.disconnect();
  }, []);

  return <div ref={containerRef} {...props} />;
};

export default ResponsiveContainer;
