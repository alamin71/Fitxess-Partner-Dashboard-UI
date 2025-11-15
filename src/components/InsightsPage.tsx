import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { FileText, Download, Calendar, TrendingUp, Users, Target } from 'lucide-react';
import { Progress } from './ui/progress';

const weeklySummary = {
  week: 'Nov 8-14, 2025',
  totalClients: 124,
  activeClients: 87,
  avgAdherence: 78,
  avgProgress: 82,
  newClients: 8,
  completedWorkouts: 342,
  loggedMeals: 456,
};

const clientSnapshots = [
  {
    name: 'Sarah Johnson',
    goal: 'Weight Loss',
    progress: 85,
    adherence: 92,
    trend: 'up',
    notes: 'Excellent progress this week. Increased protein intake as planned.',
  },
  {
    name: 'Mike Chen',
    goal: 'Muscle Gain',
    progress: 78,
    adherence: 88,
    trend: 'up',
    notes: 'Strength improvements noted. Ready to increase training volume.',
  },
  {
    name: 'Emily Rodriguez',
    goal: 'General Fitness',
    progress: 72,
    adherence: 75,
    trend: 'stable',
    notes: 'Consistent performance. Consider adding variety to workouts.',
  },
];

const programSummaries = [
  {
    name: 'Summer Shred Challenge',
    participants: 24,
    avgProgress: 82,
    completion: 68,
    status: 'active',
  },
  {
    name: 'Muscle Building Program',
    participants: 18,
    avgProgress: 76,
    completion: 55,
    status: 'active',
  },
];

export function InsightsPage() {
  const [timeRange, setTimeRange] = React.useState('week');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Insights</h1>
          <p className="text-gray-500">Detailed reports and performance analytics</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Weekly Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Weekly Summary</CardTitle>
              <CardDescription>{weeklySummary.week}</CardDescription>
            </div>
            <Badge variant="outline">
              <Calendar className="h-3 w-3 mr-1" />
              Week 45
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-gray-500">Total Clients</span>
              </div>
              <p className="text-2xl">{weeklySummary.totalClients}</p>
              <p className="text-xs text-green-600">+{weeklySummary.newClients} this week</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-gray-500">Active Clients</span>
              </div>
              <p className="text-2xl">{weeklySummary.activeClients}</p>
              <p className="text-xs text-gray-500">{Math.round((weeklySummary.activeClients / weeklySummary.totalClients) * 100)}% of total</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-500">Avg. Adherence</span>
              </div>
              <p className="text-2xl">{weeklySummary.avgAdherence}%</p>
              <p className="text-xs text-green-600">+5% from last week</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-orange-600" />
                <span className="text-sm text-gray-500">Avg. Progress</span>
              </div>
              <p className="text-2xl">{weeklySummary.avgProgress}%</p>
              <p className="text-xs text-green-600">+3% from last week</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Completed Workouts</p>
              <p className="text-xl">{weeklySummary.completedWorkouts}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Logged Meals</p>
              <p className="text-xl">{weeklySummary.loggedMeals}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Progress Snapshots */}
      <Card>
        <CardHeader>
          <CardTitle>Client Progress Snapshots</CardTitle>
          <CardDescription>Top performing clients this week</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {clientSnapshots.map((client) => (
            <div key={client.name} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p>{client.name}</p>
                  <p className="text-sm text-gray-500">{client.goal}</p>
                </div>
                <Badge variant={
                  client.trend === 'up' ? 'default' : 
                  client.trend === 'down' ? 'destructive' : 
                  'secondary'
                }>
                  {client.trend === 'up' ? '↑' : client.trend === 'down' ? '↓' : '→'} 
                  {' '}{client.trend}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span>{client.progress}%</span>
                  </div>
                  <Progress value={client.progress} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-500">Adherence</span>
                    <span>{client.adherence}%</span>
                  </div>
                  <Progress value={client.adherence} className="h-2" />
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded text-sm">
                <p className="text-gray-700">{client.notes}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Program Summaries */}
      <Card>
        <CardHeader>
          <CardTitle>Program Summaries</CardTitle>
          <CardDescription>Active programs performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {programSummaries.map((program) => (
              <div key={program.name} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p>{program.name}</p>
                    <p className="text-sm text-gray-500">{program.participants} participants</p>
                  </div>
                  <Badge>{program.status}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500">Avg. Progress</span>
                      <span>{program.avgProgress}%</span>
                    </div>
                    <Progress value={program.avgProgress} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500">Completion Rate</span>
                      <span>{program.completion}%</span>
                    </div>
                    <Progress value={program.completion} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
          <CardDescription>Generate detailed reports for your records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-24 flex flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span>Weekly Summary</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span>Client Reports</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span>Program Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
