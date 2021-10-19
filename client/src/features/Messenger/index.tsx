// clsx
import clsx from 'clsx';

import Meta from '@/layouts/Meta';
import SidebarSmall from '@/components/SidebarSmall';
import MessengerContact from './components/MessengerContact';
import MessengerChat from './components/MessengerChat';

function Messenger() {
  return (
    <Meta title='Messenger'>
      <main className={clsx('flex h-screen')}>
        <div className={clsx('hidden lg:block')}>
          <SidebarSmall isMessenger={true} />
        </div>
        <MessengerContact />
        <MessengerChat />
      </main>
    </Meta>
  );
}

export default Messenger;
