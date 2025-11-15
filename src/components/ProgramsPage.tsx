import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Plus, Calendar, Users, DollarSign, Trophy, Edit, Trash } from 'lucide-react';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';

const mockPrograms = [
  {
    id: 1,
    name: 'Summer Shred Challenge',
    goal: 'Weight Loss',
    duration: '8 weeks',
    startDate: 'May 1, 2025',
    endDate: 'Jun 26, 2025',
    price: '$99',
    participants: 24,
    revenue: 2376,
    status: 'active',
  },
  {
    id: 2,
    name: 'Muscle Building Program',
    goal: 'Muscle Gain',
    duration: '12 weeks',
    startDate: 'Apr 15, 2025',
    endDate: 'Jul 7, 2025',
    price: '$149',
    participants: 18,
    revenue: 2682,
    status: 'active',
  },
  {
    id: 3,
    name: 'Spring Fitness Bootcamp',
    goal: 'General Fitness',
    duration: '6 weeks',
    startDate: 'Mar 1, 2025',
    endDate: 'Apr 12, 2025',
    price: '$79',
    participants: 32,
    revenue: 2528,
    status: 'completed',
  },
];

const mockParticipants = [
  { name: 'Sarah Johnson', progress: 85, rank: 1 },
  { name: 'Mike Chen', progress: 92, rank: 2 },
  { name: 'Emily Rodriguez', progress: 78, rank: 3 },
  { name: 'David Kim', progress: 65, rank: 4 },
  { name: 'Lisa Wang', progress: 88, rank: 5 },
];

export function ProgramsPage() {
  const [selectedProgram, setSelectedProgram] = React.useState<typeof mockPrograms[0] | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Programs & Challenges</h1>
          <p className="text-gray-500">Create and manage group programs</p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Program
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Program</DialogTitle>
              <DialogDescription>Set up a new program or challenge for your clients</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Program Name</Label>
                  <Input placeholder="e.g., Summer Shred Challenge" />
                </div>
                <div className="space-y-2">
                  <Label>Goal</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight-loss">Weight Loss</SelectItem>
                      <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                      <SelectItem value="fitness">General Fitness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4 weeks</SelectItem>
                      <SelectItem value="6">6 weeks</SelectItem>
                      <SelectItem value="8">8 weeks</SelectItem>
                      <SelectItem value="12">12 weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input placeholder="$99" type="number" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Assign Participants</Label>
                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Select Clients
                </Button>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setCreateDialogOpen(false)}>
                Create Program
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Programs List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl">Active Programs</h2>
          {mockPrograms.map((program) => (
            <Card 
              key={program.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedProgram?.id === program.id ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setSelectedProgram(program)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{program.name}</CardTitle>
                    <CardDescription>{program.goal}</CardDescription>
                  </div>
                  <Badge variant={program.status === 'active' ? 'default' : 'secondary'}>
                    {program.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{program.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span>{program.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="h-4 w-4 text-gray-500" />
                    <span>${program.revenue.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {program.startDate} - {program.endDate}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Program Detail */}
        <div>
          {selectedProgram ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{selectedProgram.name}</CardTitle>
                    <CardDescription>Program Details & Leaderboard</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Summary */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <p className="text-2xl">{selectedProgram.participants}</p>
                    <p className="text-sm text-gray-500">Participants</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl">${selectedProgram.revenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Revenue</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
                    <p className="text-2xl">82%</p>
                    <p className="text-sm text-gray-500">Avg Progress</p>
                  </div>
                </div>

                {/* Leaderboard */}
                <div>
                  <h3 className="mb-4">Leaderboard</h3>
                  <div className="space-y-3">
                    {mockParticipants.map((participant) => (
                      <div key={participant.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-sm">{participant.rank}</span>
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm">{participant.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={participant.progress} className="flex-1 h-2" />
                            <span className="text-xs text-gray-500">{participant.progress}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Users className="h-4 w-4 mr-2" />
                    Add Participant
                  </Button>
                  <Button variant="outline" className="flex-1">
                    End Program
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center py-12">
                <p className="text-gray-500">Select a program to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
