import { useRef } from 'react';

// clsx
import clsx from 'clsx';

// material ui icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GradeIcon from '@mui/icons-material/Grade';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// react timeago
import Timeago from 'react-timeago';

import { getRect, setStyle, removeStyle } from '@/helpers/dom';
import { useMoviesContext } from '@/contexts/MoviesContext';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect ';
import tmdb from '@/configs/tmdb';

import Image from '@/components/Image';

function MoviesPreview() {
  const { containerEl, targetEl, preview, handleHidePreview } =
    useMoviesContext();

  const hoverRef = useRef<HTMLDivElement>(null!);

  useIsomorphicLayoutEffect(() => {
    const hoverEl = hoverRef.current;

    if (!containerEl || !targetEl) return;

    const transtitionStart = () => {
      setStyle(hoverEl, 'transform', 'translateY(-50%) scale(0.5)');
    };

    const transitionEnd = () => {
      setStyle(hoverEl, 'transform', 'translateY(-50%) scale(1)');
      setStyle(hoverEl, 'opacity', '1');
      transitionStyle();
    };

    const transitionStyle = () => {
      setStyle(hoverEl, 'transition', 'all 0.2s ease-out');
    };

    const isReachStart =
      Math.floor(getRect(targetEl).left) <=
      Math.floor(getRect(containerEl).left);
    const isReachEnd =
      Math.floor(getRect(targetEl).right) >=
      Math.floor(getRect(containerEl).right);

    const top = getRect(targetEl).top + getRect(targetEl).height / 2;

    setStyle(hoverEl, 'top', top + 'px');
    setStyle(hoverEl, 'opacity', '0');

    if (isReachStart) {
      transtitionStart();
      setStyle(hoverEl, 'left', getRect(containerEl).left + 'px');

      return transitionEnd();
    }

    if (isReachEnd) {
      transtitionStart();

      const left =
        getRect(containerEl).right - Math.floor(getRect(hoverEl).width) * 2; // multiply by 2 cuz the init scale is 0.5

      setStyle(hoverEl, 'left', left + 'px');

      return transitionEnd();
    }

    // Pre-order to fix UI
    setStyle(hoverEl, 'transform', 'translate(-50%, -50%) scale(0.5)');

    const center = getRect(targetEl).left + getRect(targetEl).width / 2;

    setStyle(hoverEl, 'left', center + 'px');

    setStyle(hoverEl, 'transform', 'translate(-50%, -50%) scale(1)');
    setStyle(hoverEl, 'opacity', '1');
    transitionStyle();

    // Remove styles attached to dom element before
    return () => {
      removeStyle(hoverEl, 'top');
      removeStyle(hoverEl, 'left');
      removeStyle(hoverEl, 'right');
      removeStyle(hoverEl, 'transform');
    };
  }, [targetEl]);

  if (!preview || !targetEl || !containerEl) return null;

  return (
    <div
      ref={hoverRef}
      onMouseLeave={handleHidePreview}
      className={clsx(
        'fixed z-10',
        'h-90 w-[345px] max-w-full rounded-lg shadow-box overflow-hidden',
        'bg-dk-cpn'
      )}>
      <Image
        src={tmdb.getW500Image(preview.image)}
        layout='fill'
        alt='Thumbnail'
        styleLoading='cover'
        className={clsx('h-3/5', 'cursor-pointer')}
      />

      <div className={clsx('flex flex-col space-y-3 px-3 pt-4 pb-5')}>
        <div className={clsx('flex justify-between')}>
          <div className='flex space-x-3'>
            <div
              className={clsx(
                'group flex-center w-11 h-11 rounded-full',
                'bg-white',
                'transition-all',
                'cursor-pointer',
                'hover:bg-gray-300'
              )}>
              <PlayArrowIcon
                className={clsx(
                  '!text-3xl',
                  'text-dk-cpn',
                  '!duration-250',
                  'group-hover:scale-110'
                )}
              />
            </div>
            <div
              className={clsx(
                'group flex-center w-11 h-11 rounded-full border-2 border-gray-300',
                'bg-transparent',
                'transition-all',
                'cursor-pointer',
                'hover:bg-gray-900'
              )}>
              <AddIcon
                className={clsx(
                  '!text-2xl',
                  'text-white',
                  '!duration-250',
                  'group-hover:scale-110'
                )}
              />
            </div>
            <div
              className={clsx(
                'group flex-center w-11 h-11 rounded-full border-2 border-gray-300',
                'bg-transparent',
                'transition-all',
                'cursor-pointer',
                'hover:bg-gray-900'
              )}>
              <ThumbUpOutlinedIcon
                className={clsx(
                  '!text-lg',
                  'text-white',
                  '!duration-250',
                  'group-hover:scale-110'
                )}
              />
            </div>
            <div
              className={clsx(
                'group flex-center w-11 h-11 rounded-full border-2 border-gray-300',
                'bg-transparent',
                'transition-all',
                'cursor-pointer',
                'hover:bg-gray-900'
              )}>
              <ThumbDownAltOutlinedIcon
                className={clsx(
                  '!text-lg',
                  'text-white',
                  '!duration-250',
                  'group-hover:scale-110'
                )}
              />
            </div>
          </div>
          <div
            className={clsx(
              'group flex-center w-11 h-11 rounded-full border-2 border-gray-300',
              'bg-transparent',
              'transition-all',
              'cursor-pointer',
              'hover:bg-gray-900'
            )}>
            <ArrowForwardIosIcon
              className={clsx(
                '!text-lg rotate-90',
                'text-white',
                '!duration-250',
                'group-hover:scale-110'
              )}
            />
          </div>
        </div>

        <div className={clsx('flex items-center space-x-3', 'text-white')}>
          <Timeago
            live={false}
            date={preview.releaseDate}
            className={clsx('text-green-500')}
          />
          <div className={clsx('flex items-center')}>
            <AccessTimeIcon
              className={clsx('!text-lg mr-1', 'text-gray-400')}
            />
            <span className={clsx('text-sm-1', 'text-gray-400')}>00:00</span>
          </div>
          <span
            className={clsx(
              'px-1 text-xs-1 border border-gray-400',
              'text-gray-400'
            )}>
            HD
          </span>
        </div>

        <div className={clsx('flex items-center space-x-4', 'text-white')}>
          <div className={clsx('flex items-center')}>
            <GradeIcon className={clsx('!text-lg mr-1', 'text-yellow-400')} />
            <span>{preview.voteAverage}</span>
          </div>
          <div className={clsx('flex items-center')}>
            <FavoriteIcon className={clsx('!text-base mr-1', 'text-red-400')} />
            <span>{preview.voteCount}</span>
          </div>
          <div className={clsx('flex items-center')}>
            <PersonIcon className={clsx('!text-xl mr-1', 'text-blue-400')} />
            <span>7+</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviesPreview;
