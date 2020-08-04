import * as React from "react";
import { css, cx } from "emotion";
import ResponsiveContainer, {
  Breakpoint,
  breakpoint,
  containerBreakpoint,
  display
} from "./ResponsiveContainer";
import { spacing } from "./spacing";

export default function App() {
  return (
    <div
      className={css({
        // Defaul value for custom container rem (cem) unit should be 1rem
        "--cem": "1rem"
      })}
    >
      <h1>Container query demo</h1>

      <div
        className={css({
          padding: "8px",
          border: "1px solid black",
          marginBottom: "12px"
        })}
      >
        Normal container
      </div>

      <ResponsiveContainer
        className={css({
          padding: "8px",
          border: "1px solid red",
          marginBottom: "12px",
          "--cem": "0.5rem",
          [containerBreakpoint(Breakpoint.SM)]: {
            "--cem": "1rem"
          },
          [containerBreakpoint(Breakpoint.MD)]: {
            "--cem": "1.5rem"
          },
          [containerBreakpoint(Breakpoint.LG)]: {
            "--cem": "2rem"
          },
          [containerBreakpoint(Breakpoint.XL)]: {
            "--cem": "2.5rem"
          }
        })}
      >
        <p>Resizable container 1</p>
        <p>
          Current sizes:
          <br />
          <span className={cx(display(Breakpoint.XS, "block"))}>XS</span>
          <span
            className={cx(display("none"), display(Breakpoint.SM, "block"))}
          >
            SM
          </span>
          <span
            className={cx(display("none"), display(Breakpoint.MD, "block"))}
          >
            MD
          </span>
          <span
            className={cx(display("none"), display(Breakpoint.LG, "block"))}
          >
            LG
          </span>
          <span
            className={cx(display("none"), display(Breakpoint.XL, "block"))}
          >
            XL
          </span>
        </p>

        <p>
          Current exclusive size:
          <span className={cx(display(Breakpoint.SM, "none"))}>XS-ONLY</span>
          <span
            className={cx(
              display("none"),
              display(Breakpoint.SM, "block"),
              display(Breakpoint.MD, "none")
            )}
          >
            SM-ONLY
          </span>
          <span
            className={cx(
              display("none"),
              display(Breakpoint.MD, "block"),
              display(Breakpoint.LG, "none")
            )}
          >
            MD-ONLY
          </span>
          <span
            className={cx(
              display("none"),
              display(Breakpoint.LG, "block"),
              display(Breakpoint.XL, "none")
            )}
          >
            LG-ONLY
          </span>
          <span
            className={cx(display("none"), display(Breakpoint.XL, "block"))}
          >
            XL-ONLY
          </span>
        </p>

        <p>
          This text changes color with different container widths
          <span
            className={css({
              display: "block",
              color: "orange",
              [breakpoint(Breakpoint.SM)]: {
                color: "red"
              },
              [breakpoint(Breakpoint.MD)]: {
                color: "blue"
              },
              [breakpoint(Breakpoint.LG)]: {
                color: "green"
              },
              [breakpoint(Breakpoint.XL)]: {
                color: "purple"
              }
            })}
          >
            Responsive colored text
          </span>
        </p>

        <p>
          Class name order doesn't matter:
          <span
            className={cx(display(Breakpoint.MD, "block"), display("none"))}
          >
            MD, LG, XL only text
          </span>
        </p>
        <p>
          Reverse relationship: show on mobile and hide on desktop
          <span
            className={cx(display("block"), display(Breakpoint.LG, "none"))}
          >
            XS, SM, MD only text
          </span>
        </p>

        <div style={{ border: "1px solid green", padding: spacing(2) }}>
          container rem (<code>cem</code>) spacing demo
        </div>

        <h5 style={{ fontSize: spacing(1) }}>cem font size demo</h5>
      </ResponsiveContainer>

      <p>This demo showcases responsive containers inside a flex container:</p>
      <div
        className={css({
          display: "flex",
          "& > * + *": { marginLeft: "12px" },
          marginBottom: "12px",
          padding: "8px",
          border: "1px solid purple"
        })}
      >
        <ResponsiveContainer
          className={css({
            padding: "8px",
            border: "1px solid blue"
          })}
        >
          Resizable container 2
          <ContainerQuery breakpoint={Breakpoint.XS}>XS</ContainerQuery>
          <ContainerQuery breakpoint={Breakpoint.SM}>SM</ContainerQuery>
          <ContainerQuery breakpoint={Breakpoint.MD}>MD</ContainerQuery>
          <ContainerQuery breakpoint={Breakpoint.LG}>LG</ContainerQuery>
          <ContainerQuery breakpoint={Breakpoint.XL}>XL</ContainerQuery>
        </ResponsiveContainer>
        <ResponsiveContainer
          className={css({
            flex: "1",
            padding: "8px",
            border: "1px solid blue"
          })}
        >
          Resizable container 3
          <ContainerQuery breakpoint={Breakpoint.XS}>XS</ContainerQuery>
          <ContainerQuery breakpoint={Breakpoint.SM}>SM</ContainerQuery>
          <ContainerQuery breakpoint={Breakpoint.MD}>MD</ContainerQuery>
          <ContainerQuery breakpoint={Breakpoint.LG}>LG</ContainerQuery>
          <ContainerQuery breakpoint={Breakpoint.XL}>XL</ContainerQuery>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/**
 * Uses an additional div element to asbtract some logic around showing and hiding
 * content under specified breakpoint
 */
const ContainerQuery: React.FC<{ breakpoint: Breakpoint }> = ({
  breakpoint: b,
  children
}) => (
  <div className={cx(display("none"), display(b, "block"))}>{children}</div>
);
