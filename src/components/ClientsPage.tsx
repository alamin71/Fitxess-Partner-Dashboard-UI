import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  Search, Filter, ArrowUpDown, Plus, MessageSquare, 
  Calendar, TrendingUp, Apple, Dumbbell, Heart, Target 
} from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';

const mockClients = [
  {
    id: 1,
    name: 'Sarah Johnson',
    goal: 'Weight Loss',
    adherence: 85,
    lastCheckIn: '2 hours ago',
    lastMeal: 'Lunch - Grilled Chicken Salad',
    lastWorkout: 'Upper Body Strength',
    status: 'active',
    plan: 'Premium Plan',
  },
  {
    id: 2,
    name: 'Mike Chen',
    goal: 'Muscle Gain',
    adherence: 92,
    lastCheckIn: '5 hours ago',
    lastMeal: 'Post-Workout Shake',
    lastWorkout: 'Leg Day',
    status: 'active',
    plan: 'Standard Plan',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    goal: 'General Fitness',
    adherence: 78,
    lastCheckIn: '1 day ago',
    lastMeal: 'Dinner - Salmon & Vegetables',
    lastWorkout: 'Cardio Session',
    status: 'active',
    plan: 'Premium Plan',
  },
  {
    id: 4,
    name: 'David Kim',
    goal: 'Weight Loss',
    adherence: 45,
    lastCheckIn: '5 days ago',
    lastMeal: 'Breakfast - Oatmeal',
    lastWorkout: 'Morning Walk',
    status: 'inactive',
    plan: 'Basic Plan',
  },
];

export function ClientsPage() {
  const [selectedClient, setSelectedClient] = React.useState<typeof mockClients[0] | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterGoal, setFilterGoal] = React.useState('all');
  const [filterStatus, setFilterStatus] = React.useState('all');

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGoal = filterGoal === 'all' || client.goal === filterGoal;
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesGoal && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Clients</h1>
          <p className="text-gray-500">Manage and track your clients' progress</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterGoal} onValueChange={setFilterGoal}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Goals</SelectItem>
                <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                <SelectItem value="Muscle Gain">Muscle Gain</SelectItem>
                <SelectItem value="General Fitness">General Fitness</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Client List / Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client List */}
        <div className="lg:col-span-1 space-y-4">
          {filteredClients.map((client) => (
            <Card 
              key={client.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedClient?.id === client.id ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setSelectedClient(client)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p>{client.name}</p>
                      <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                        {client.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{client.goal}</p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Adherence</span>
                        <span>{client.adherence}%</span>
                      </div>
                      <Progress value={client.adherence} className="h-1" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{client.lastCheckIn}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Client Detail */}
        <div className="lg:col-span-2">
          {selectedClient ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-lg">
                        {selectedClient.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{selectedClient.name}</CardTitle>
                      <p className="text-sm text-gray-500">{selectedClient.goal} • {selectedClient.plan}</p>
                    </div>
                  </div>
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="nutrition" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                    <TabsTrigger value="workouts">Workouts</TabsTrigger>
                    <TabsTrigger value="metrics">Metrics</TabsTrigger>
                    <TabsTrigger value="plans">Plans</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="nutrition" className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Apple className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm">Last Logged Meal</p>
                          <p>{selectedClient.lastMeal}</p>
                        </div>
                      </div>
                      <Calendar className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-2xl">1,850</p>
                        <p className="text-sm text-gray-500">Calories Today</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-2xl">120g</p>
                        <p className="text-sm text-gray-500">Protein</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-2xl">85%</p>
                        <p className="text-sm text-gray-500">Adherence</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="workouts" className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Dumbbell className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="text-sm">Last Workout</p>
                          <p>{selectedClient.lastWorkout}</p>
                        </div>
                      </div>
                      <Calendar className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-2xl">4/5</p>
                        <p className="text-sm text-gray-500">This Week</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-2xl">45min</p>
                        <p className="text-sm text-gray-500">Avg Duration</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-2xl">92%</p>
                        <p className="text-sm text-gray-500">Completion</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="metrics" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-gray-500">Weight</span>
                        </div>
                        <p className="text-2xl">165 lbs</p>
                        <p className="text-xs text-green-600">-5 lbs from start</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-purple-600" />
                          <span className="text-sm text-gray-500">Body Fat</span>
                        </div>
                        <p className="text-2xl">22%</p>
                        <p className="text-xs text-green-600">-3% from start</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-gray-500">Resting HR</span>
                        </div>
                        <p className="text-2xl">62 bpm</p>
                        <p className="text-xs text-green-600">-8 bpm from start</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Dumbbell className="h-4 w-4 text-orange-600" />
                          <span className="text-sm text-gray-500">Muscle Mass</span>
                        </div>
                        <p className="text-2xl">125 lbs</p>
                        <p className="text-xs text-green-600">+2 lbs from start</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="plans" className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p>Premium Plan</p>
                          <p className="text-sm text-gray-500">Started: Jan 15, 2025</p>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                      <Progress value={65} className="mb-2" />
                      <p className="text-xs text-gray-500">65 days remaining</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Assign New Plan
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center py-12">
                <p className="text-gray-500">Select a client to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
