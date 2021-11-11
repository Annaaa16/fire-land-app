export interface GlobalInitContext {
  isShowSenderArea: boolean;
  toggleSenderArea: (isOpen: boolean) => void;
  theme: string;
  toggleTheme: (value: string) => void;
  visitWall: (userId: string) => void;
  handleMakeFriend: (receiverId: string) => void;
}
