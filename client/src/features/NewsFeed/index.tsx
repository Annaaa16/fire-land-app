import Meta from '@/layouts/Meta';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarSmall from '@/components/SidebarSmall';

function NewsFeed() {
  return (
    <Meta title='News Feed'>
      <Header />
      <Sidebar />
      {/* <SidebarSmall /> */}
    </Meta>
  );
}

export default NewsFeed;
