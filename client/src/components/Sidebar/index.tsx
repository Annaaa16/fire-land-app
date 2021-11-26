import SidebarSmall from './SidebarSmall';

interface SidebarProps {
  messenger?: boolean;
}

function Sidebar({ messenger }: SidebarProps) {
  return <SidebarSmall messenger={messenger} />;
}

export default Sidebar;
