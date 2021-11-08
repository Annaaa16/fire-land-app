import Image from '@/components/Image';

// clsx
import clsx from 'clsx';

interface PostContentProps {
  content: string;
  photo: string;
}

function PostContent(props: PostContentProps) {
  const { content, photo } = props;

  return (
    <>
      <p
        className={clsx(
          'px-2 mt-3 mb-4 md:px-4 text-xs md:text-sm leading-5',
          'dark:text-white'
        )}>
        {content}
      </p>
      {photo && (
        <div
          className={clsx('relative', 'h-[300px] lg:h-[500px]', 'bg-gray-100')}>
          <Image
            src={photo}
            layout='fill'
            objectFit='contain'
            alt='Post thumb'
            className={clsx('w-full h-full object-cover')}
          />
        </div>
      )}
    </>
  );
}

export default PostContent;
