import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { 
  Users, UserPlus, UserCheck, TrendingUp, DollarSign, 
  Clock, AlertCircle, Plus, FileText, Trophy 
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from './ui/badge';

const engagementData = [
  { date: 'Mon', clients: 45, adherence: 78 },
  { date: 'Tue', clients: 52, adherence: 82 },
  { date: 'Wed', clients: 49, adherence: 75 },
  { date: 'Thu', clients: 58, adherence: 85 },
  { date: 'Fri', clients: 55, adherence: 80 },
  { date: 'Sat', clients: 48, adherence: 72 },
  { date: 'Sun', clients: 42, adherence: 68 },
];

const earningsData = [
  { month: 'Jan', amount: 4200 },
  { month: 'Feb', amount: 4800 },
  { month: 'Mar', amount: 5200 },
  { month: 'Apr', amount: 5800 },
  { month: 'May', amount: 6400 },
  { month: 'Jun', amount: 7200 },
];

export function OverviewPage() {
  const summaryStats = [
    {
      title: 'Total Clients',
      value: '124',
      icon: Users,
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      title: 'New Clients This Week',
      value: '8',
      icon: UserPlus,
      change: '+25%',
      changeType: 'positive' as const,
    },
    {
      title: 'Active Clients Today',
      value: '87',
      icon: UserCheck,
      change: '70%',
      changeType: 'neutral' as const,
    },
    {
      title: 'Avg. Adherence',
      value: '78%',
      icon: TrendingUp,
      change: '+5%',
      changeType: 'positive' as const,
    },
    {
      title: 'Avg. Progress',
      value: '82%',
      icon: TrendingUp,
      change: '+3%',
      changeType: 'positive' as const,
    },
    {
      title: 'Monthly Earnings',
      value: '$7,200',
      icon: DollarSign,
      change: '+15%',
      changeType: 'positive' as const,
    },
    {
      title: 'Pending Payouts',
      value: '$2,400',
      icon: Clock,
      change: '',
      changeType: 'neutral' as const,
    },
  ];

  const alerts = [
    {
      type: 'warning',
      title: 'Client Inactive',
      description: 'Sarah Johnson hasn\'t logged in for 5 days',
      time: '2 hours ago',
    },
    {
      type: 'success',
      title: 'New Referral',
      description: 'Mark Williams signed up through your referral link',
      time: '3 hours ago',
    },
    {
      type: 'info',
      title: 'Plan Ending Soon',
      description: '3 clients have plans ending this week',
      time: '5 hours ago',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl">Overview</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-500">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{stat.value}</div>
                {stat.change && (
                  <p className={`text-xs ${
                    stat.changeType === 'positive' ? 'text-green-600' : 
                    stat.changeType === 'negative' ? 'text-red-600' : 
                    'text-gray-500'
                  }`}>
                    {stat.change} from last period
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Trends</CardTitle>
            <CardDescription>Active clients and adherence over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="clients" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="adherence" stroke="#ec4899" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Earnings Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Earnings Trends</CardTitle>
            <CardDescription>Monthly earnings over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts / Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Important updates and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert, index) => (
              <Alert key={index} variant={alert.type === 'warning' ? 'destructive' : 'default'}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{alert.title}</AlertTitle>
                <AlertDescription className="flex items-center justify-between">
                  <span>{alert.description}</span>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button className="h-24 flex flex-col gap-2">
              <Plus className="h-6 w-6" />
              <span>Add Client</span>
            </Button>
            <Button className="h-24 flex flex-col gap-2" variant="outline">
              <FileText className="h-6 w-6" />
              <span>Assign Plan</span>
            </Button>
            <Button className="h-24 flex flex-col gap-2" variant="outline">
              <Trophy className="h-6 w-6" />
              <span>Create Challenge</span>
            </Button>
            <Button className="h-24 flex flex-col gap-2" variant="outline">
              <DollarSign className="h-6 w-6" />
              <span>View Payouts</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
