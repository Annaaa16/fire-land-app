// clsx
import clsx from 'clsx';

import Meta from '@/layouts/Meta';
import MessengerContact from '@/features/Messenger/components/MessengerContact';
import MessengerChat from '@/features/Messenger/components/MessengerChat';
import Sidebar from '@/components/Sidebar';

function Messenger() {
  return (
    <Meta title='Messenger'>
      <div className={clsx('flex h-screen')}>
        <div className={clsx('hidden lg:block')}>
          <Sidebar messenger />
        </div>
        <MessengerContact />
        <MessengerChat />
      </div>
    </Meta>
  );
}

export default Messenger;
