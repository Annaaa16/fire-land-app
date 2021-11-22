import { forwardRef } from 'react';

// clsx
import clsx from 'clsx';

// headless ui
import { Transition } from '@headlessui/react';

// types
import { Reaction } from '@/models/common';

import { emotions } from '@/hooks/useReactions';

interface ReactionsProps {
  reactPost: (payload: {
    emotion: string;
    isReact: boolean;
    isUpdate: boolean;
  }) => void;
  isShowReactions: boolean;
  reaction: Reaction | undefined;
}

function Reactions(
  { isShowReactions, reaction, reactPost }: ReactionsProps,
  ref: any
) {
  const handleReactPost = (key: string) => {
    reactPost({
      emotion: key,
      isReact: true,
      isUpdate: Boolean(reaction),
    });
  };

  return (
    <Transition
      show={isShowReactions}
      enter={clsx('z-10', 'duration-200 ease-out', 'pointer-events-none')}
      enterFrom='opacity-0 -translate-y-4 scale-50'
      enterTo={clsx(
        'opacity-100 -translate-y-10 scale-100',
        'pointer-events-auto'
      )}>
      <div
        ref={ref}
        className={clsx(
          'absolute bottom-full left-0 lg:left-1/2 z-10',
          'inline-flex items-center space-x-1.5 lg:-translate-x-1/2 py-1 px-1 rounded-full border border-lt-line dark:border-dk-line',
          'bg-white dark:bg-dk-cpn'
        )}>
        {Object.values(emotions).map((emotion) => (
          <div
            onClick={() => handleReactPost(emotion.type)}
            key={emotion.type}
            className={clsx(
              'w-8 h-8',
              'cursor-pointer',
              'transition-all ease-out',
              'hover:scale-[1.2] hover:-translate-y-1'
            )}>
            <img
              src={emotion.icon}
              alt='Reaction'
              className={clsx('w-full h-full object-cover')}
            />
          </div>
        ))}
      </div>
    </Transition>
  );
}

export default forwardRef(Reactions);
