import { useState, useRef } from 'react';

// clsx
import clsx from 'clsx';

// material ui icons
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';

// types
import { FormEvent } from 'react';

import { useMessengerSelector, useUsersSelector } from '@/redux/selectors';
import { messengerActions } from '@/redux/slices/messengerSlice';
import { useSocketContext } from '@/contexts/SocketContext';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import Tooltip from '@/components/Tooltip';
import useAutoFocus from '@/hooks/useAutoFocus';

function ChatFooter() {
  const { currentUser } = useUsersSelector();
  const { conversationId } = useMessengerSelector();

  const [message, setMessage] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const { socketConversations } = useSocketContext();
  const dispatch = useStoreDispatch();

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) return;

    socketConversations.sendMessage(message);

    dispatch(
      messengerActions.createMessageRequest({
        senderId: currentUser._id,
        text: message,
        conversationId,
      })
    );
    setMessage('');
  };

  useAutoFocus(inputRef, conversationId);

  return (
    <form
      onSubmit={handleSendMessage}
      className={clsx(
        'flex items-center h-[59px] md:h-[68px] px-1 md:px-3 mt-auto py-2.5 md:py-4 border-t border-lt-line dark:border-dk-line',
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
          <Tooltip
            title='Open more actions'
            direction='ttb'
            className={clsx('!left-[calc(100%+14px)]')}
          />
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
          'flex-between flex-1 mr-1 md:mr-2 pr-3 rounded-full',
          'bg-lt-input dark:bg-dk-input'
        )}>
        <input
          value={message}
          ref={inputRef}
          onChange={(e) => setMessage(e.target.value)}
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

      <button type='submit' className={clsx('relative', 'group mx-2')}>
        <SendIcon
          fontSize='large'
          className={clsx(
            '!text-2xl md:!text-2xl',
            'text-primary-v1 dark:text-primary-v4',
            'cursor-pointer'
          )}
        />
        <Tooltip title='Send' direction='ttb' />
      </button>
    </form>
  );
}

export default ChatFooter;
