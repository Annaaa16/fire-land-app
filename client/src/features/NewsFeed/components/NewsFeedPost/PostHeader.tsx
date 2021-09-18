// clsx
import clsx from 'clsx';

// material ui icons
import GroupIcon from '@mui/icons-material/Group';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import User from '@/components/User';

function PostHeader() {
  return (
    <div className={clsx('relative', 'flex items-center px-2 md:px-4 py-4')}>
      <User view='small' subClass={clsx('ml-1 md:ml-0 z-0')} />
      <div className={clsx('ml-4')}>
        <span
          className={clsx(
            'font-bold',
            'dark:text-white',
            'cursor-pointer',
            'lg:hover:underline'
          )}>
          IG Dev
        </span>
        <div className={clsx('flex items-center mt-1')}>
          <span
            className={clsx(
              'text-xs mr-1',
              'text-gray-text',
              'cursor-pointer',
              'lg:hover:underline'
            )}>
            30m
          </span>
          <GroupIcon className={clsx('!text-[15px]', 'text-gray-text')} />
        </div>

        <div
          className={clsx(
            'absolute top-1/2 right-4',
            'group -translate-y-1/2',
            'cursor-pointer'
          )}>
          <MoreHorizIcon
            fontSize='large'
            className={clsx(
              'text-gray-400',
              '!transition-all !ease-out',
              'lg:group-hover:text-gray-500 lg:dark:group-hover:text-white'
            )}
          />

          <ul
            className={clsx(
              'absolute right-0 top-full z-20',
              'p-2 mt-1 min-w-max rounded-lg shadow-sender-header-ls scale-0 opacity-0 invisible',
              'bg-white dark:bg-dk-cpn',
              'origin-top-right transition-all duration-[350ms] ease-out',
              'pointer-events-none',
              'group-hover:scale-100 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto'
            )}>
            <li
              className={clsx(
                'pl-2 pr-4 py-3 rounded-lg',
                'dark:bg-dk-cpn',
                'transition-all ease-out',
                'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
              )}>
              <PushPinOutlinedIcon className={clsx('dark:text-white')} />
              <span
                className={clsx(
                  'ml-1.5 font-bold text-xs md:text-sm',
                  'dark:text-white'
                )}>
                Pin post
              </span>
            </li>
            <li
              className={clsx(
                'pl-2 pr-4 py-3 rounded-lg',
                'dark:bg-dk-cpn',
                'transition-all ease-out',
                'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
              )}>
              <BookmarksOutlinedIcon className={clsx('dark:text-white')} />
              <span
                className={clsx(
                  'ml-1.5 font-bold text-xs md:text-sm',
                  'dark:text-white'
                )}>
                Save post
              </span>
            </li>

            <li
              className={clsx(
                'h-px w-full my-1.5',
                'bg-lt-line dark:bg-dk-line'
              )}
            />

            <li
              className={clsx(
                'pl-2 pr-4 py-3 rounded-lg',
                'dark:bg-dk-cpn',
                'transition-all ease-out',
                'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
              )}>
              <EditOutlinedIcon className={clsx('dark:text-white')} />
              <span
                className={clsx(
                  'ml-1.5 font-bold text-xs md:text-sm',
                  'dark:text-white'
                )}>
                Edit post
              </span>
            </li>
            <li
              className={clsx(
                'pl-2 pr-4 py-3 rounded-lg',
                'dark:bg-dk-cpn',
                'transition-all ease-out',
                'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
              )}>
              <PeopleOutlinedIcon className={clsx('dark:text-white')} />
              <span
                className={clsx(
                  'ml-1.5 font-bold text-xs md:text-sm',
                  'dark:text-white'
                )}>
                Edit audience
              </span>
            </li>
            <li
              className={clsx(
                'pl-2 pr-4 py-3 rounded-lg',
                'dark:bg-dk-cpn',
                'transition-all ease-out',
                'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
              )}>
              <NotificationsOffOutlinedIcon
                className={clsx('dark:text-white')}
              />
              <span
                className={clsx(
                  'ml-1.5 font-bold text-xs md:text-sm',
                  'dark:text-white'
                )}>
                Turn off notification for this post
              </span>
            </li>
            <li
              className={clsx(
                'pl-2 pr-4 py-3 rounded-lg',
                'dark:bg-dk-cpn',
                'transition-all ease-out',
                'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
              )}>
              <EventNoteOutlinedIcon className={clsx('dark:text-white')} />
              <span
                className={clsx(
                  'ml-1.5 font-bold text-xs md:text-sm',
                  'dark:text-white'
                )}>
                Edit date
              </span>
            </li>

            <li
              className={clsx(
                'h-px w-full my-1.5',
                'bg-lt-line dark:bg-dk-line'
              )}
            />

            <li
              className={clsx(
                'pl-2 pr-4 py-3 rounded-lg',
                'dark:bg-dk-cpn',
                'transition-all ease-out',
                'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
              )}>
              <ArchiveOutlinedIcon className={clsx('dark:text-white')} />
              <span
                className={clsx(
                  'ml-1.5 font-bold text-xs md:text-sm',
                  'dark:text-white'
                )}>
                Move to archive
              </span>
            </li>
            <li
              className={clsx(
                'pl-2 pr-4 py-3 rounded-lg',
                'dark:bg-dk-cpn',
                'transition-all ease-out',
                'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
              )}>
              <DeleteOutlineOutlinedIcon className={clsx('dark:text-white')} />
              <span
                className={clsx(
                  'ml-1.5 font-bold text-xs md:text-sm',
                  'dark:text-white'
                )}>
                Move to trash
              </span>
            </li>

            <li className={clsx('absolute right-0 -top-4 z-50', 'w-1/2 h-8')} />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PostHeader;
