import { useState, useEffect } from 'react';

// clsx
import clsx from 'clsx';

// types
import { Post } from '@/models/common';

import { emotions } from '@/hooks/useReactions';

interface PostDetailReactionsProps {
  reactions: Post['reactions'];
}

function PostDetailReactions({ reactions }: PostDetailReactionsProps) {
  const [highestEmotions, setHighestEmotions] = useState<
    Array<{ type: string; count: number }>
  >([]);

  useEffect(() => {
    setHighestEmotions(() => {
      const emotions: { [key: string]: number } = {};
      const storage: typeof highestEmotions = [];

      reactions.forEach((reaction) => {
        const key = reaction.emotion;

        if (key in emotions) {
          emotions[key] = emotions[key] + 1;
        } else {
          emotions[key] = 1;
        }
      });

      Object.entries(emotions).forEach(([type, count]) => {
        storage.push({ type, count });
      });

      return storage.sort((a, b) => b.count - a.count).slice(0, 3);
    });
  }, [reactions]);

  return (
    <div className={clsx('flex items-center mr-2')}>
      {highestEmotions.map((emotion, idx) => (
        <div
          key={emotion.type}
          className={clsx(
            'relative',
            idx === 0 ? 'z-3' : idx === 1 ? 'z-2' : 'z-1',
            'group w-4.5 md:w-5 rounded-full border border-white dark:border-dk-cpn',
            idx > 0 && '-ml-0.5',
            'bg-white dark:bg-dk-cpn',
            'cursor-pointer'
          )}>
          <img
            className={clsx('w-full h-full')}
            src={emotions[emotion.type].icon}
            alt='Emotion'
          />
        </div>
      ))}
    </div>
  );
}

export default PostDetailReactions;
