// clsx
import clsx from 'clsx';

interface ContactEmptyListProps {
  message: string;
}

function ContactEmptyList({ message }: ContactEmptyListProps) {
  return (
    <div
      className={clsx(
        'text-sm-1 text-center mt-2',
        'text-gray-lt dark:text-gray-dk'
      )}>
      {message}
    </div>
  );
}

export default ContactEmptyList;
