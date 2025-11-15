import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Plus, Search, Upload, Copy, Share2, Apple, Dumbbell, Heart } from 'lucide-react';

const mockPlans = [
  {
    id: 1,
    name: 'High Protein Meal Plan',
    type: 'meal',
    duration: '4 weeks',
    popularity: 'high',
    assignedTo: 45,
    icon: Apple,
  },
  {
    id: 2,
    name: 'Strength Training Program',
    type: 'workout',
    duration: '8 weeks',
    popularity: 'high',
    assignedTo: 38,
    icon: Dumbbell,
  },
  {
    id: 3,
    name: 'Mindfulness & Meditation',
    type: 'habit',
    duration: '30 days',
    popularity: 'medium',
    assignedTo: 22,
    icon: Heart,
  },
  {
    id: 4,
    name: 'Keto Meal Plan',
    type: 'meal',
    duration: '6 weeks',
    popularity: 'high',
    assignedTo: 31,
    icon: Apple,
  },
  {
    id: 5,
    name: 'HIIT Workout Plan',
    type: 'workout',
    duration: '4 weeks',
    popularity: 'medium',
    assignedTo: 28,
    icon: Dumbbell,
  },
  {
    id: 6,
    name: 'Hydration Tracking',
    type: 'habit',
    duration: '21 days',
    popularity: 'low',
    assignedTo: 15,
    icon: Heart,
  },
  {
    id: 7,
    name: 'Vegan Meal Plan',
    type: 'meal',
    duration: '4 weeks',
    popularity: 'medium',
    assignedTo: 19,
    icon: Apple,
  },
  {
    id: 8,
    name: 'Full Body Workout',
    type: 'workout',
    duration: '12 weeks',
    popularity: 'high',
    assignedTo: 42,
    icon: Dumbbell,
  },
];

export function PlansLibraryPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterType, setFilterType] = React.useState('all');
  const [filterPopularity, setFilterPopularity] = React.useState('all');

  const filteredPlans = mockPlans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || plan.type === filterType;
    const matchesPopularity = filterPopularity === 'all' || plan.popularity === filterPopularity;
    return matchesSearch && matchesType && matchesPopularity;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meal':
        return 'bg-green-100 text-green-700';
      case 'workout':
        return 'bg-purple-100 text-purple-700';
      case 'habit':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPopularityBadge = (popularity: string) => {
    const variants = {
      high: 'default',
      medium: 'secondary',
      low: 'outline',
    } as const;
    return variants[popularity as keyof typeof variants] || 'secondary';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Plans Library</h1>
          <p className="text-gray-500">Manage meal plans, workout plans, and habit trackers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Plan
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search plans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="meal">Meal Plans</SelectItem>
                <SelectItem value="workout">Workout Plans</SelectItem>
                <SelectItem value="habit">Habit Plans</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPopularity} onValueChange={setFilterPopularity}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Popularity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Popularity</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPlans.map((plan) => {
          const Icon = plan.icon;
          return (
            <Card key={plan.id} className="hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className={`p-3 rounded-lg ${getTypeColor(plan.type)}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge variant={getPopularityBadge(plan.popularity)}>
                    {plan.popularity}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <CardDescription>{plan.duration}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Assigned to:</span>
                    <span>{plan.assignedTo} clients</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Copy className="h-3 w-3 mr-1" />
                      Duplicate
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="h-3 w-3 mr-1" />
                      Assign
                    </Button>
                  </div>
                  <Button className="w-full" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredPlans.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 mb-4">No plans found matching your filters</p>
            <Button variant="outline">
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
