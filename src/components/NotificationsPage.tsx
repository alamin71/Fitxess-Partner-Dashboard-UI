import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  AlertCircle, UserPlus, Calendar, MessageSquare, DollarSign, 
  CheckCheck, Trash2 
} from 'lucide-react';

const mockNotifications = [
  {
    id: 1,
    type: 'inactive',
    title: 'Client Inactive',
    message: 'Sarah Johnson hasn\'t logged in for 5 days',
    time: '2 hours ago',
    read: false,
    icon: AlertCircle,
    color: 'text-orange-600',
  },
  {
    id: 2,
    type: 'referral',
    title: 'New Referral',
    message: 'Mark Williams signed up through your referral link',
    time: '3 hours ago',
    read: false,
    icon: UserPlus,
    color: 'text-green-600',
  },
  {
    id: 3,
    type: 'plan',
    title: 'Plan Ending Soon',
    message: '3 clients have plans ending this week',
    time: '5 hours ago',
    read: false,
    icon: Calendar,
    color: 'text-blue-600',
  },
  {
    id: 4,
    type: 'message',
    title: 'New Message',
    message: 'Mike Chen: "Can we adjust my workout schedule?"',
    time: '6 hours ago',
    read: true,
    icon: MessageSquare,
    color: 'text-purple-600',
  },
  {
    id: 5,
    type: 'payout',
    title: 'Payout Processed',
    message: 'Your payout of $2,400 has been processed',
    time: '1 day ago',
    read: true,
    icon: DollarSign,
    color: 'text-green-600',
  },
  {
    id: 6,
    type: 'inactive',
    title: 'Client Inactive',
    message: 'David Kim hasn\'t logged in for 7 days',
    time: '1 day ago',
    read: true,
    icon: AlertCircle,
    color: 'text-orange-600',
  },
  {
    id: 7,
    type: 'referral',
    title: 'New Referral',
    message: 'Jessica Brown signed up through your referral link',
    time: '2 days ago',
    read: true,
    icon: UserPlus,
    color: 'text-green-600',
  },
  {
    id: 8,
    type: 'message',
    title: 'New Message',
    message: 'Emily Rodriguez: "Great session today!"',
    time: '2 days ago',
    read: true,
    icon: MessageSquare,
    color: 'text-purple-600',
  },
];

export function NotificationsPage() {
  const [notifications, setNotifications] = React.useState(mockNotifications);
  const [activeTab, setActiveTab] = React.useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Notifications</h1>
          <p className="text-gray-500">
            {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">
                All
                {notifications.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {notifications.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="referral">Referrals</TabsTrigger>
              <TabsTrigger value="message">Messages</TabsTrigger>
              <TabsTrigger value="payout">Payouts</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          {filteredNotifications.length > 0 ? (
            <div className="space-y-2">
              {filteredNotifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      !notification.read ? 'bg-purple-50 border-purple-200' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-white ${notification.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <p>{notification.title}</p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-purple-600 rounded-full" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as Read
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500">
              <p>No notifications in this category</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
