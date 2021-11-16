import { useEffect, useRef, useState } from 'react';

// clsx
import clsx from 'clsx';

// material ui icons
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import FlagIcon from '@mui/icons-material/Flag';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import CloseIcon from '@mui/icons-material/Close';

// react dropzone
import { useDropzone } from 'react-dropzone';

// react overlayscrollbars
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import { usePostsSelector, useUsersSelector } from '@/redux/selectors';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { postsActions } from '@/redux/slices/postsSlice';
import useStoreDispatch from '@/hooks/useStoreDispatch';
import useDetectKeydown from '@/hooks/useDetectKeydown';

import User from '@/components/User';
import Tooltip from '@/components/Tooltip';
import SenderPhoto from './SenderPhoto';

function NewsFeedSenderArea() {
  const { isShowSenderArea, toggleSenderArea } = useGlobalContext();
  const { updatePost: post } = usePostsSelector();
  const { currentUser } = useUsersSelector();

  const [isAddPhoto, setIsAddPhoto] = useState<boolean>(false);
  const [file, setFile] = useState<File | Object>({});
  const [preview, setPreview] = useState<string>('');
  const [content, setContent] = useState<string>(post?.content || '');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { textareaRows, handleTextareaRows } = useDetectKeydown();
  const dispatch = useStoreDispatch();

  const closeSenderArea = () => {
    toggleSenderArea(false);
    dispatch(postsActions.setUpdatePost(null));
  };

  const handleSubmitPost = () => {
    if (!content) return;

    const formData = new FormData();

    formData.append('content', content);
    formData.append('file', file as Blob);

    dispatch(postsActions.createPostRequest(formData));
    toggleSenderArea(false);
  };

  const handleUpdatePost = () => {
    if (!content) return;

    const formData = new FormData();
    const { _id, photo, photoId } = post!;

    formData.append('content', content);
    formData.append('photo', photo);
    formData.append('photoId', photoId);
    formData.append('file', file as Blob);

    dispatch(
      postsActions.updatePostRequest({ postId: _id, updatePayload: formData })
    );
    toggleSenderArea(false);
  };

  // Set cursor focus at last letter
  useEffect(() => {
    textareaRef.current?.focus();
    textareaRef.current?.setSelectionRange(content.length, content.length);
  }, [isShowSenderArea, content, isAddPhoto]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: ([file]) => {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    },
  });

  // Make sure to revoke the data uris to avoid memory leaks
  useEffect(
    () => () => {
      URL.revokeObjectURL(preview);
    },
    [preview]
  );

  return (
    <div className={clsx('fixed inset-0 z-50', 'flex px-4 md:px-0')}>
      <div
        onClick={closeSenderArea}
        className={clsx(
          'absolute inset-0',
          'w-full h-full',
          'bg-gray-900 opacity-80'
        )}
      />
      <div
        className={clsx(
          'relative',
          'm-auto w-[500px] rounded-xl shadow-lg',
          'bg-white dark:bg-dk-cpn'
        )}>
        <div className={clsx('relative')}>
          <h2
            className={clsx(
              'font-bold text-xl text-center py-5 leading-none border-b border-lt-line dark:border-dk-line',
              'dark:text-white'
            )}>
            Create Post
          </h2>
          <div
            onClick={closeSenderArea}
            className={clsx(
              'absolute top-1/2 right-4',
              'rounded-full p-2 -translate-y-1/2',
              'bg-gray-200 dark:bg-dk-tooltip lg:dark:bg-dk-input',
              'transition-all ease-out',
              'hover:bg-gray-300 dark:hover:bg-dk-tooltip',
              'cursor-pointer'
            )}>
            <CloseIcon className={clsx('dark:text-gray-400')} />
          </div>
        </div>

        <div className={clsx('relative', 'p-3')}>
          <div className={clsx('flex items-center mt-2 pb-2 ml-2')}>
            <User view='sm' avatar={currentUser.avatar} />
            <div className={clsx('ml-5')}>
              <span className={clsx('font-bold', 'dark:text-white')}>
                {currentUser.username}
              </span>
              <div
                className={clsx(
                  'flex items-center mt-1.5 px-2 py-1 rounded-md',
                  'bg-gray-200 dark:bg-dk-tooltip lg:dark:bg-dk-input',
                  'transition-all ease-out',
                  'cursor-pointer',
                  'hover:bg-gray-300 dark:hover:bg-dk-tooltip'
                )}>
                <span
                  className={clsx(
                    'text-xs mr-1 font-bold',
                    'dark:text-gray-500'
                  )}>
                  People
                </span>
                <PeopleIcon
                  className={clsx('!text-base', 'dark:text-gray-500')}
                />
              </div>
            </div>
          </div>

          <OverlayScrollbarsComponent
            options={{ scrollbars: { autoHide: 'scroll' } }}
            className={clsx(isAddPhoto ? 'max-h-72 md:max-h-100' : 'max-h-60')}>
            <textarea
              onKeyDown={handleTextareaRows}
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={isAddPhoto ? textareaRows : textareaRows + 3}
              className={clsx(
                'w-full pt-8 leading-4 outline-none resize-none overflow-y-hidden',
                'dark:bg-dk-cpn dark:text-white'
              )}
              placeholder={"What's on your mind, IG Dev?"}
            />
            {isAddPhoto && (
              <div className=''>
                <SenderPhoto
                  preview={preview}
                  setPreview={setPreview}
                  setIsAddPhoto={setIsAddPhoto}
                  getRootProps={getRootProps}
                  getInputProps={getInputProps}
                />
              </div>
            )}
          </OverlayScrollbarsComponent>

          <div
            className={clsx(
              'absolute right-5',
              isAddPhoto ? 'top-[82px]' : 'bottom-32'
            )}>
            <div className={clsx('group', 'cursor-pointer')}>
              <SentimentSatisfiedIcon
                className={clsx(
                  '!text-[28px]',
                  'text-gray-300 dark:text-gray-300 lg:dark:text-gray-500',
                  'hover:text-gray-400 dark:hover:text-white'
                )}
              />
              <Tooltip title='Emoji' direction='ttb' />
            </div>
          </div>

          <div
            className={clsx(
              'flex items-center justify-center md:justify-between px-4 py-3 mt-[17px] rounded-full border border-lt-line dark:border-dk-line'
            )}>
            <span
              className={clsx(
                'hidden md:block',
                'dark:text-white',
                'select-none'
              )}>
              Add to your post
            </span>
            <ul className={clsx('flex items-center')}>
              <li
                onClick={() => setIsAddPhoto(!isAddPhoto)}
                className={clsx('relative', 'group px-2.5', 'cursor-pointer')}>
                <PhotoLibraryIcon
                  className={clsx('!text-2xl', 'text-[#45bd62]')}
                />
                <Tooltip title='Photo' direction='ttb' />
              </li>
              <li
                className={clsx('relative', 'group px-2.5', 'cursor-pointer')}>
                <PersonAddIcon
                  className={clsx('!text-2xl', 'text-[#1877f2]')}
                />
                <Tooltip title='Tag People' direction='ttb' />
              </li>
              <li
                className={clsx('relative', 'group px-2.5', 'cursor-pointer')}>
                <SentimentVerySatisfiedIcon
                  className={clsx('!text-2xl', 'text-[#f7b928]')}
                />
                <Tooltip title='Feeling' direction='ttb' />
              </li>
              <li
                className={clsx('relative', 'group px-2.5', 'cursor-pointer')}>
                <EditLocationAltIcon
                  className={clsx('!text-2xl', 'text-[#f5533d]')}
                />
                <Tooltip title='Check In' direction='ttb' />
              </li>
              <li
                className={clsx('relative', 'group px-2.5', 'cursor-pointer')}>
                <FlagIcon className={clsx('!text-2xl', 'text-[#39afd5]')} />
                <Tooltip title='Life Event' direction='ttb' />
              </li>
            </ul>
          </div>

          <button
            onClick={post ? handleUpdatePost : handleSubmitPost}
            className={clsx(
              'mt-4 py-3.5 w-full font-bold rounded-lg',
              'text-white bg-primary-v1 dark:bg-primary-v3',
              'transition-all',
              'hover:bg-primary-v1-hv dark:hover:bg-primary-v3-hv'
            )}>
            {post ? 'Update' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewsFeedSenderArea;
