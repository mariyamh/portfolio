import { Fragment, type CSSProperties } from "react";

/**
 * Text split into words, each in its own mask, so the words can rise into
 * place one after another (`.split-word` in globals.css).
 *
 * The full text is kept once for assistive technology and search; the split
 * copy is hidden from them, so nothing is read word by word.
 *
 * Used in a [data-reveal="words"] parent: the words rise when it scrolls into
 * view. `from` offsets the word index, to continue a sequence across two
 * calls.
 */
export function SplitWords({
  text,
  start = 0,
  step = 90,
  from = 0,
}: {
  text: string;
  start?: number;
  step?: number;
  from?: number;
}) {
  const words = text.split(" ");

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className="split-word">
              <span
                style={
                  {
                    "--w": from + i,
                    "--d": `${start + (from + i) * step}ms`,
                  } as CSSProperties
                }
              >
                {word}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </>
  );
}
