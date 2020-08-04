import React, { FC } from "react";
import { css, cx } from "emotion";
import ResponsiveContainer from "src/components/ResponsiveContainer";
import { spacing } from "src/lib/spacing";
import { display, breakpointSelector, Breakpoint } from "src/lib/breakpoint";
import ContainerRemRoot from "src/components/ContainerRemRoot";
import { responsiveCss } from "src/lib/responsiveStyles";

const App: FC = () => (
  <div
    className={css({
      // Default value for custom container rem (cem) unit should be 1rem
      "--cem": "1rem",
    })}
  >
    <h1>Container query demo</h1>
    <h3>Look ma, no re-renders!</h3>

    <div
      className={css({
        padding: "8px",
        border: "1px solid black",
        marginBottom: "12px",
      })}
    >
      Normal container
    </div>

    <ResponsiveContainer
      className={css({
        padding: "8px",
        border: "1px solid red",
        marginBottom: "12px",
      })}
    >
      <ContainerRemRoot>
        <p>Responsive container 1</p>
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
              [breakpointSelector(Breakpoint.SM)]: {
                color: "red",
              },
              [breakpointSelector(Breakpoint.MD)]: {
                color: "blue",
              },
              [breakpointSelector(Breakpoint.LG)]: {
                color: "green",
              },
              [breakpointSelector(Breakpoint.XL)]: {
                color: "purple",
              },
            })}
          >
            Responsive colored text
          </span>
        </p>

        <p>
          This text uses the augmented <code>css</code> function to specify
          styles:
          <span
            className={responsiveCss({
              display: "block",
              fontSize: "12px",
              [Breakpoint.SM]: {
                fontSize: "12px",
              },
              [Breakpoint.MD]: {
                fontSize: "16px",
              },
              [Breakpoint.LG]: {
                fontSize: "20px",
              },
              [Breakpoint.XL]: {
                fontSize: "24px",
              },
            })}
          >
            Responsive size text
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
      </ContainerRemRoot>
    </ResponsiveContainer>

    <p>This demo showcases responsive containers inside a flex container:</p>
    <div
      className={css({
        display: "flex",
        "& > * + *": { marginLeft: "12px" },
        marginBottom: "12px",
        padding: "8px",
        border: "1px solid purple",
      })}
    >
      <ResponsiveContainer
        className={css({
          padding: "8px",
          border: "1px solid blue",
        })}
      >
        Responsive container 2
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
          border: "1px solid blue",
        })}
      >
        Responsive container 3
        <ContainerQuery breakpoint={Breakpoint.XS}>XS</ContainerQuery>
        <ContainerQuery breakpoint={Breakpoint.SM}>SM</ContainerQuery>
        <ContainerQuery breakpoint={Breakpoint.MD}>MD</ContainerQuery>
        <ContainerQuery breakpoint={Breakpoint.LG}>LG</ContainerQuery>
        <ContainerQuery breakpoint={Breakpoint.XL}>XL</ContainerQuery>
      </ResponsiveContainer>
    </div>
  </div>
);

export default App;

/**
 * Uses an additional div element to abstract some logic around showing and hiding content under specified breakpoint
 */
const ContainerQuery: FC<{ breakpoint: Breakpoint }> = ({
  breakpoint: b,
  children,
}) => (
  <div className={cx(display("none"), display(b, "block"))}>{children}</div>
);
