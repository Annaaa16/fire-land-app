// clsx
import clsx from 'clsx';

import Meta from '@/layouts/Meta';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarSmall from '@/components/SidebarSmall';
import NewsFeedBanner from './components/NewsFeedBanner';
import NewsFeedMembers from './components/NewsFeedMembers';

function NewsFeed() {
  return (
    <Meta title='News Feed'>
      <Header />
      {/* <Sidebar /> */}
      {/* <SidebarSmall /> */}

      <main
        className={clsx('lg:w-newsfeed-content-w px-4 lg:px-0 mx-auto py-10')}>
        <NewsFeedBanner />
        <NewsFeedMembers />
      </main>
    </Meta>
  );
}

export default NewsFeed;
