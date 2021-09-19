// clsx
import clsx from 'clsx';

import ContactHeader from './ContactHeader';
import ContactContent from './ContactContent';

function MessagesContact() {
  return (
    <div
      className={clsx(
        'hidden lg:block w-[370px] py-10 border-r border-lt-line dark:border-dk-line',
        'bg-white dark:bg-dk-cpn'
      )}>
      <ContactHeader />
      <ContactContent />
    </div>
  );
}

export default MessagesContact;
