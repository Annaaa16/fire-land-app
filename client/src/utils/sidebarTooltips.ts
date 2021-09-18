// material ui icons
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ForumIcon from '@mui/icons-material/Forum';
import EventNoteIcon from '@mui/icons-material/EventNote';
import StoreIcon from '@mui/icons-material/Store';
import TextsmsIcon from '@mui/icons-material/Textsms';

export const sidebarTooltips = [
  { isActive: true, title: 'Newsfeed', icon: LibraryBooksIcon },
  { isActive: false, title: 'Message', icon: TextsmsIcon },
  { isActive: false, title: 'Groups', icon: PeopleAltIcon },
  { isActive: false, title: 'Members', icon: SupervisorAccountIcon },
  { isActive: false, title: 'Videos', icon: VideoLibraryIcon },
  { isActive: false, title: 'Forums', icon: ForumIcon },
  { isActive: false, title: 'Todos', icon: EventNoteIcon },
  { isActive: false, title: 'Marketplace', icon: StoreIcon },
];
