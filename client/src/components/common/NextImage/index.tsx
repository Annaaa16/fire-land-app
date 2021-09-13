import Image from 'next/image';

// clsx
import clsx from 'clsx';

import styles from './styles.module.scss';

interface IProps {
  src: string;
  alt: string;
  className?: string;
}

function NextImage(props: IProps) {
  const { src, alt, className } = props;

  return (
    <div className={styles.container}>
      <Image
        src={src}
        layout='fill'
        alt={alt}
        className={clsx(styles.img, className)}
      />
    </div>
  );
}

export default NextImage;
