import React from 'react';
import { 
  Home, Users, MessageSquare, Trophy, BookOpen, DollarSign, 
  UserPlus, BarChart3, UsersRound, Building2, Settings, Bell,
  ChevronLeft, ChevronRight, Menu
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole?: 'trainer' | 'gym' | 'medspa';
  unreadMessages?: number;
  notifications?: number;
}

export function DashboardLayout({ 
  children, 
  currentPage, 
  onNavigate,
  userRole = 'trainer',
  unreadMessages = 3,
  notifications = 5
}: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'messaging', label: 'Messaging', icon: MessageSquare, badge: unreadMessages },
    { id: 'programs', label: 'Programs & Challenges', icon: Trophy },
    { id: 'plans', label: 'Plans Library', icon: BookOpen },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'referrals', label: 'Referrals', icon: UserPlus },
    { id: 'insights', label: 'Insights', icon: BarChart3 },
  ];

  // Conditional menu items
  if (userRole === 'gym' || userRole === 'medspa') {
    menuItems.push(
      { id: 'staff', label: 'Staff', icon: UsersRound },
      { id: 'organization', label: 'Organization', icon: Building2 }
    );
  }

  menuItems.push(
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: notifications }
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white">F</span>
            </div>
            <span className="text-lg">Fitxess</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Menu Items */}
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-purple-100 text-purple-900' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <Badge variant="destructive" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>
      </ScrollArea>

      {/* User Profile */}
      {!collapsed && (
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span>JD</span>
            </div>
            <div className="flex-1">
              <div>John Doe</div>
              <div className="text-sm text-gray-500">Fitness Partner</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden md:flex flex-col bg-white border-r transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b z-20 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white">F</span>
          </div>
          <span className="text-lg">Fitxess</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        >
          <aside 
            className="w-64 h-full bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
}
