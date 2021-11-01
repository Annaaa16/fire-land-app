import { useState, useEffect } from 'react';

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

  const [isMore, setIsMore] = useState<boolean>(lengthInit < children.length);
  const [trimmedText, setTrimmedText] = useState<string>('');

  useEffect(() => {
    setTrimmedText(children.slice(0, lengthInit));
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
