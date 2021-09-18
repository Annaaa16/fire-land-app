// clsx
import clsx from 'clsx';

import Meta from '@/layouts/Meta';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarSmall from '@/components/SidebarSmall';
import NewsFeedBanner from './components/NewsFeedBanner';
import NewsFeedMembers from './components/NewsFeedMembers';
import NewsFeedContent from './components/NewsFeedContent';
import NewsFeedWidgets from './components/NewsFeedWidgets';

function NewsFeed() {
  return (
    <Meta title='News Feed'>
      <Header />
      {/* <Sidebar /> */}
      {/* <SidebarSmall /> */}

      <main className='bg-lt-body dark:bg-dk-body'>
        <div className={clsx('lg:w-[1184px] px-4 lg:px-0 mx-auto py-10')}>
          <NewsFeedBanner />
          <NewsFeedMembers />

          <section
            className={clsx('grid grid-cols-3 gap-5 justify-between mt-7')}>
            <NewsFeedContent />
            <NewsFeedWidgets />
          </section>
        </div>
      </main>
    </Meta>
  );
}

export default NewsFeed;
