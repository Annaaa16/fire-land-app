// clsx
import clsx from 'clsx';

function PostContent() {
  const img = 'https://odindesignthemes.com/vikinger/img/cover/04.jpg';

  return (
    <>
      <p
        className={clsx(
          'px-2 mt-3 mb-4 md:px-4 text-xs md:text-sm leading-5',
          'dark:text-white'
        )}>
        Mấy ai còn nhớ đồ dùng cổ này nữa không a 😂😂 Mấy ai còn nhớ đồ dùng cổ
        này nữa không a 😂😂
      </p>

      <div className={clsx('h-[500px]')}>
        <img
          src={img}
          alt='Post'
          className={clsx('w-full h-full object-cover')}
        />
      </div>
    </>
  );
}

export default PostContent;
