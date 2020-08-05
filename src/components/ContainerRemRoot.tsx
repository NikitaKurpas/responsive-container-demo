import React, { FC, HTMLProps } from "react";
import { cx, css } from "emotion";
import { breakpointSelector, Breakpoint } from "../lib/breakpoint";

export const CEM_VAR_NAME = "cem";

/**
 * Declares the custom container rem (cem) variable that changes with respect to the responsive container width higher
 * in the DOM tree.
 */
const ContainerRemRoot: FC<HTMLProps<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cx(
        css({
          [`--${CEM_VAR_NAME}`]: "0.5rem",
          [breakpointSelector(Breakpoint.SM)]: {
            [`--${CEM_VAR_NAME}`]: "1rem",
          },
          [breakpointSelector(Breakpoint.MD)]: {
            [`--${CEM_VAR_NAME}`]: "1.5rem",
          },
          [breakpointSelector(Breakpoint.LG)]: {
            [`--${CEM_VAR_NAME}`]: "2rem",
          },
          [breakpointSelector(Breakpoint.XL)]: {
            [`--${CEM_VAR_NAME}`]: "2.5rem",
          },
        }),
        className
      )}
      {...props}
    />
  );
};

export default ContainerRemRoot;
