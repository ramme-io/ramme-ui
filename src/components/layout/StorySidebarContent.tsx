import { SidebarItem } from './Sidebar';
import { IconName } from '../ui/Icon';

export const mockItems: SidebarItem[] = [
  { id: '1', label: 'Dashboard', icon: 'layout' as IconName },
  { id: '2', label: 'Analytics', icon: 'bar-chart' as IconName },
  { id: '3', label: 'Settings', icon: 'settings' as IconName },
];

export const mockUser = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
};