import { FormEvent, useState } from 'react';

// socket
import io from 'socket.io-client';

// clsx
import clsx from 'clsx';

// material ui icons
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';

import Tooltip from '@/components/Tooltip';

function ChatFooter() {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const socket = io('http://localhost:4000', {
      withCredentials: true,
    });

    socket.emit('chat message', inputValue);
    socket.emit('some event', {
      someProperty: 'some value',
      otherProperty: 'other value',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        'fixed bottom-0 left-0 lg:left-[calc(80px+370px)] right-0 z-50',
        'flex items-center h-[59px] md:h-16 px-1 md:px-3 mt-auto py-2.5 md:py-4 border-t border-lt-line dark:border-dk-line',
        'bg-white dark:bg-dk-cpn'
      )}>
      <ul className={clsx('flex items-center mr-2')}>
        <li className={clsx('relative', 'group px-1.5', 'cursor-pointer')}>
          <ControlPointIcon
            className={clsx(
              '!text-xl md:!text-2xl',
              'text-primary-v1 dark:text-primary-v4'
            )}
          />
          <Tooltip title='Open more actions' direction='ttb' />
        </li>
        <li className={clsx('relative', 'group px-1.5', 'cursor-pointer')}>
          <PhotoLibraryIcon
            className={clsx(
              '!text-xl md:!text-2xl',
              'text-primary-v1 dark:text-primary-v4'
            )}
          />
          <Tooltip title='Attach a photo' direction='ttb' />
        </li>
        <li className={clsx('relative', 'group px-1.5', 'cursor-pointer')}>
          <StorefrontOutlinedIcon
            className={clsx(
              '!text-xl md:!text-2xl',
              'text-primary-v1 dark:text-primary-v4'
            )}
          />
          <Tooltip title='Choose a sticker' direction='ttb' />
        </li>
      </ul>

      <div
        className={clsx(
          'flex items-center flex-1 justify-between mr-1 md:mr-2 pr-3 rounded-full',
          'bg-lt-input dark:bg-dk-input'
        )}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Aa'
          className={clsx(
            'w-full px-5 py-3 md:py-3 text-xs md:text-sm outline-none rounded-full',
            'bg-transparent dark:text-white dark:bg-dk-input'
          )}
        />
        <div className={clsx('relative', 'group', 'cursor-pointer')}>
          <EmojiEmotionsIcon
            className={clsx('text-primary-v1 dark:text-primary-v4')}
          />
          <Tooltip title='Choose an emoji' direction='ttb' />
        </div>
      </div>

      <div className={clsx('relative', 'group mx-2')}>
        <SendIcon
          fontSize='large'
          className={clsx(
            '!text-2xl md:!text-2xl',
            'text-primary-v1 dark:text-primary-v4',
            'cursor-pointer'
          )}
        />
        <Tooltip title='Send' direction='ttb' />
      </div>
    </form>
  );
}

export default ChatFooter;