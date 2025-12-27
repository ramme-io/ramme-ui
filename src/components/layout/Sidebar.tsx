import React, { createContext, useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { Icon, IconName } from '../ui/Icon';
import { Avatar } from '../ui/Avatar';

// --- Types ---
export interface SidebarItem {
  id: string;
  label: string;
  icon: IconName;
  href?: string;
  onClick?: () => void;
  subItems?: Omit<SidebarItem, 'icon'>[]; 
  badge?: string | number;
}

export interface SidebarUser {
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface SidebarProps {
  items: SidebarItem[];
  user?: SidebarUser;
  className?: string;
  logo?: React.ReactNode;
  activeItemId?: string;
  onNavigate?: (item: SidebarItem) => void;
  footerSlot?: React.ReactNode;
}

interface SidebarContextType {
  collapsed: boolean;
  toggleCollapsed: () => void;
  activeItemId?: string;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// --- Sub-components ---

const SidebarHeader = ({ logo, collapsed }: { logo?: React.ReactNode; collapsed: boolean }) => (
  <div className={cn("flex h-16 items-center border-b px-4", collapsed ? "justify-center" : "justify-between")}>
    {!collapsed && (logo || <span className="text-lg font-bold">App</span>)}
  </div>
);

const SidebarNavItem = ({ 
  item, 
  collapsed, 
  isActive, 
  onClick 
}: { 
  item: SidebarItem; 
  collapsed: boolean; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full items-center gap-x-3 rounded-md p-2 text-sm font-medium transition-colors",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
        collapsed && "justify-center"
      )}
      title={collapsed ? item.label : undefined}
    >
      <Icon name={item.icon} className="h-5 w-5 shrink-0" />
      {!collapsed && (
        <>
          <span className="flex-1 text-left">{item.label}</span>
          {item.badge && (
            <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {item.badge}
            </span>
          )}
        </>
      )}
    </button>
  );
};

const SidebarFooter = ({ user, collapsed, slot }: { user?: SidebarUser; collapsed: boolean; slot?: React.ReactNode }) => (
  <div className="mt-auto border-t p-4">
    {slot}
    {user && (
      <div className={cn("flex items-center gap-x-3 mt-4", collapsed && "justify-center")}>
        <Avatar name={user.name} src={user.avatarUrl} size="sm" />
        {!collapsed && (
          <div className="flex flex-col overflow-hidden">
            <span className="truncate text-sm font-medium">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground">{user.email}</span>
          </div>
        )}
      </div>
    )}
  </div>
);

// --- Main Component ---

/**
 * @wizard
 * @name Sidebar
 * @description A collapsible sidebar navigation component with support for branding, navigation items, and user profile.
 * @tags layout, navigation, sidebar
 * @props
 * - name: items
 * type: SidebarItem[]
 * description: Array of navigation items.
 * - name: user
 * type: SidebarUser
 * description: User profile information for the footer.
 * - name: activeItemId
 * type: string
 * description: ID of the currently active navigation item.
 * @category layout
 * @id sidebar
 */
export const Sidebar: React.FC<SidebarProps> = ({
  items,
  user,
  className,
  logo,
  activeItemId,
  onNavigate,
  footerSlot,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  // Auto-collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Check on mount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapsed, activeItemId }}>
      <div
        className={cn(
          "flex h-screen flex-col border-r bg-card transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          className
        )}
      >
        <SidebarHeader logo={logo} collapsed={collapsed} />
        
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <nav className="space-y-1">
            {items.map((item) => (
              <SidebarNavItem 
                key={item.id}
                item={item}
                collapsed={collapsed}
                isActive={activeItemId === item.id}
                onClick={() => {
                  item.onClick?.();
                  onNavigate?.(item);
                }}
              />
            ))}
          </nav>
        </div>

        <button 
          onClick={toggleCollapsed}
          className="absolute -right-3 top-20 z-50 rounded-full border bg-background p-1 text-muted-foreground shadow-sm hover:text-foreground"
        >
          <Icon name={collapsed ? 'chevron-right' : 'chevron-left'} className="h-4 w-4" />
        </button>

        <SidebarFooter user={user} collapsed={collapsed} slot={footerSlot} />
      </div>
    </SidebarContext.Provider>
  );
};