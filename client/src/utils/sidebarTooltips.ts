// material ui icons
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ForumIcon from '@material-ui/icons/Forum';
import EventNoteIcon from '@material-ui/icons/EventNote';
import StoreIcon from '@material-ui/icons/Store';
import TextsmsIcon from '@material-ui/icons/Textsms';

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
