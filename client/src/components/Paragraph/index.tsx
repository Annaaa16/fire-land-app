import { useState, useLayoutEffect, useEffect } from 'react';

// clsx
import clsx from 'clsx';

interface ParagraphProps {
  lengthInit: number;
  children: string;
  bodyClass?: string;
  paragraphClass?: string;
  buttonClass?: string;
}

function Paragraph(props: ParagraphProps) {
  const { lengthInit, children, bodyClass, paragraphClass, buttonClass } =
    props;

  const [trimmedText, setTrimmedText] = useState<string>('');
  const [isMore, setIsMore] = useState<boolean>(false);

  const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    setTrimmedText(children.slice(0, lengthInit));
    setIsMore(lengthInit < children.length);
  }, [children, lengthInit]);

  return (
    <div className={bodyClass}>
      <p className={paragraphClass}>
        {isMore ? trimmedText + '...' : trimmedText}
      </p>
      {lengthInit < children.length && (
        <>
          {isMore ? (
            <button
              onClick={() => {
                setTrimmedText(children);
                setIsMore(false);
              }}
              className={clsx('font-bold', buttonClass)}>
              Read more...
            </button>
          ) : (
            <button
              onClick={() => {
                setTrimmedText(children.slice(0, lengthInit));
                setIsMore(true);
              }}
              className={clsx('font-bold', buttonClass)}>
              Show less
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Paragraph;
