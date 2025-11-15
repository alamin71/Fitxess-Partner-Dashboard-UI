import React from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Search, Send, Paperclip, Bot } from 'lucide-react';

const mockConversations = [
  {
    id: 1,
    name: 'Sarah Johnson',
    lastMessage: 'Thanks for the meal plan update!',
    timestamp: '10:30 AM',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'Mike Chen',
    lastMessage: 'Can we adjust my workout schedule?',
    timestamp: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    lastMessage: 'Great session today!',
    timestamp: 'Yesterday',
    unread: 1,
    online: true,
  },
  {
    id: 4,
    name: 'Summer Challenge Group',
    lastMessage: 'John: Keep pushing everyone! 💪',
    timestamp: '2 days ago',
    unread: 5,
    online: false,
    isGroup: true,
  },
];

const mockMessages = [
  {
    id: 1,
    sender: 'Sarah Johnson',
    message: 'Hi! I have a question about the meal plan you sent',
    timestamp: '10:15 AM',
    isMe: false,
  },
  {
    id: 2,
    sender: 'Me',
    message: 'Of course! What would you like to know?',
    timestamp: '10:16 AM',
    isMe: true,
  },
  {
    id: 3,
    sender: 'Sarah Johnson',
    message: 'Can I substitute chicken with fish in the dinner recipes?',
    timestamp: '10:17 AM',
    isMe: false,
  },
  {
    id: 4,
    sender: 'Me',
    message: 'Absolutely! Fish is a great alternative. I recommend salmon or cod for similar protein content.',
    timestamp: '10:18 AM',
    isMe: true,
  },
  {
    id: 5,
    sender: 'Sarah Johnson',
    message: 'Perfect! And one more thing - the portion sizes look different from last week',
    timestamp: '10:20 AM',
    isMe: false,
  },
  {
    id: 6,
    sender: 'Me',
    message: 'Yes, I adjusted them based on your progress. We\'re increasing protein slightly to support your strength training.',
    timestamp: '10:22 AM',
    isMe: true,
  },
  {
    id: 7,
    sender: 'Sarah Johnson',
    message: 'Thanks for the meal plan update!',
    timestamp: '10:30 AM',
    isMe: false,
  },
];

export function MessagingPage() {
  const [selectedConversation, setSelectedConversation] = React.useState(mockConversations[0]);
  const [messageText, setMessageText] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, send the message
      setMessageText('');
    }
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)]">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl">Messaging</h1>
          <p className="text-gray-500">Chat with your clients and groups</p>
        </div>

        {/* Messaging Interface */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 min-h-0">
          {/* Conversations List */}
          <Card className="flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors mb-1 ${
                      selectedConversation.id === conversation.id
                        ? 'bg-purple-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback>
                            {conversation.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="truncate">{conversation.name}</p>
                          {conversation.unread > 0 && (
                            <Badge variant="destructive" className="ml-2">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {conversation.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Chat Area */}
          <Card className="md:col-span-2 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {selectedConversation.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p>{selectedConversation.name}</p>
                  {selectedConversation.online && (
                    <p className="text-xs text-green-600">Online</p>
                  )}
                  {selectedConversation.isGroup && (
                    <p className="text-xs text-gray-500">12 members</p>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Bot className="h-4 w-4 mr-2" />
                AI Assist
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isMe
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {!message.isMe && (
                        <p className="text-xs mb-1 opacity-70">{message.sender}</p>
                      )}
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.isMe ? 'text-purple-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 flex gap-2">
                <Button variant="ghost" size="sm">
                  Quick Reply 1
                </Button>
                <Button variant="ghost" size="sm">
                  Quick Reply 2
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
