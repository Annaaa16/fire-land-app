// material ui icons
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GroupsIcon from '@mui/icons-material/Groups';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ForumIcon from '@mui/icons-material/Forum';
import EventNoteIcon from '@mui/icons-material/EventNote';
import StoreIcon from '@mui/icons-material/Store';
import TextsmsIcon from '@mui/icons-material/Textsms';

const sidebarTooltips = [
  { active: true, title: 'Newsfeed', icon: LibraryBooksIcon },
  { active: false, title: 'Message', icon: TextsmsIcon },
  { active: false, title: 'Groups', icon: GroupsIcon },
  { active: false, title: 'Members', icon: SupervisorAccountIcon },
  { active: false, title: 'Videos', icon: VideoLibraryIcon },
  { active: false, title: 'Forums', icon: ForumIcon },
  { active: false, title: 'Todos', icon: EventNoteIcon },
  { active: false, title: 'Marketplace', icon: StoreIcon },
];

export default sidebarTooltips;
