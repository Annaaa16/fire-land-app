import { useState } from 'react';

// clsx
import clsx from 'clsx';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect ';

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
              className={clsx('font-semibold', buttonClass)}>
              Read more...
            </button>
          ) : (
            <button
              onClick={() => {
                setTrimmedText(children.slice(0, lengthInit));
                setIsMore(true);
              }}
              className={clsx('font-semibold', buttonClass)}>
              Show less
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Paragraph;
