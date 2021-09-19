// clsx
import clsx from 'clsx';

import Meta from '@/layouts/Meta';
import SidebarSmall from '@/components/SidebarSmall';
import MessagesContact from './components/MessagesContact';
import MessagesChat from './components/MessagesChat';

function Messages() {
  return (
    <Meta title='Messenger'>
      <main className={clsx('flex')}>
        <div className={clsx('hidden lg:block')}>
          <SidebarSmall isMessenger={true} />
        </div>
        <MessagesContact />
        <MessagesChat />
      </main>
    </Meta>
  );
}

export default Messages;
