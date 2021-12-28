import { useState } from 'react';
import { useRouter } from 'next/router';

// material ui icons
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GroupsIcon from '@mui/icons-material/Groups';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ForumIcon from '@mui/icons-material/Forum';
import EventNoteIcon from '@mui/icons-material/EventNote';
import StoreIcon from '@mui/icons-material/Store';
import TextsmsIcon from '@mui/icons-material/Textsms';

import { PATHS } from '@/constants';
import { useGlobalContext } from '@/contexts/GlobalContext';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect ';

import SidebarSmall from './SidebarSmall';
import SidebarLarge from './SidebarLarge';

interface SidebarProps {
  messenger?: boolean;
}

const menu = [
  {
    active: false,
    title: 'Newsfeed',
    icon: LibraryBooksIcon,
    maintain: false,
    path: PATHS.NEWSFEED,
  },
  {
    active: false,
    title: 'Message',
    icon: TextsmsIcon,
    maintain: false,
    path: PATHS.MESSENGER,
  },
  {
    active: false,
    title: 'Marketplace',
    icon: StoreIcon,
    maintain: false,
    path: PATHS.MARKETPLACE,
  },
  {
    active: false,
    title: 'Groups',
    icon: GroupsIcon,
    maintain: true,
    path: '',
  },
  {
    active: false,
    title: 'Members',
    icon: SupervisorAccountIcon,
    maintain: true,
    path: '',
  },
  {
    active: false,
    title: 'Videos',
    icon: VideoLibraryIcon,
    maintain: true,
    path: '',
  },
  {
    active: false,
    title: 'Forums',
    icon: ForumIcon,
    maintain: true,
    path: '',
  },
  {
    active: false,
    title: 'Todos',
    icon: EventNoteIcon,
    maintain: true,
    path: '',
  },
];

function Sidebar({ messenger }: SidebarProps) {
  const { notifyMaintain } = useGlobalContext();

  const [cloneMenu, setCloneMenu] = useState(menu);

  const router = useRouter();

  const handleNavigate = (maintain: boolean, path: string) => {
    maintain ? notifyMaintain() : router.push(path);
  };

  useIsomorphicLayoutEffect(() => {
    const path = router.asPath;

    setCloneMenu((prevMenu) => {
      return prevMenu.map((menu) => ({
        ...menu,
        active: menu.path.includes(path),
      }));
    });
  }, [router]);

  return (
    <SidebarSmall
      menu={cloneMenu}
      handleNavigate={handleNavigate}
      messenger={messenger}
    />
  );
}

export default Sidebar;
