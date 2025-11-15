import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
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
import { Plus, Users, TrendingUp, Eye, Edit, Trash } from 'lucide-react';

const mockStaff = [
  {
    id: 1,
    name: 'Jessica Smith',
    role: 'Senior Trainer',
    email: 'jessica@example.com',
    assignedClients: 32,
    avgAdherence: 85,
    avgProgress: 82,
    status: 'active',
  },
  {
    id: 2,
    name: 'Tom Anderson',
    role: 'Trainer',
    email: 'tom@example.com',
    assignedClients: 28,
    avgAdherence: 78,
    avgProgress: 75,
    status: 'active',
  },
  {
    id: 3,
    name: 'Maria Garcia',
    role: 'Nutritionist',
    email: 'maria@example.com',
    assignedClients: 45,
    avgAdherence: 88,
    avgProgress: 86,
    status: 'active',
  },
  {
    id: 4,
    name: 'David Chen',
    role: 'Trainer',
    email: 'david@example.com',
    assignedClients: 24,
    avgAdherence: 72,
    avgProgress: 70,
    status: 'inactive',
  },
];

export function StaffPage() {
  const [addStaffDialogOpen, setAddStaffDialogOpen] = React.useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Staff Management</h1>
          <p className="text-gray-500">Manage your team and assign clients</p>
        </div>
        <Dialog open={addStaffDialogOpen} onOpenChange={setAddStaffDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>Invite a team member to join your organization</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trainer">Trainer</SelectItem>
                    <SelectItem value="senior-trainer">Senior Trainer</SelectItem>
                    <SelectItem value="nutritionist">Nutritionist</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setAddStaffDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setAddStaffDialogOpen(false)}>
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Total Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{mockStaff.length}</div>
            <p className="text-xs text-gray-500">Active members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {mockStaff.reduce((sum, staff) => sum + staff.assignedClients, 0)}
            </div>
            <p className="text-xs text-gray-500">Across all staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Avg. Adherence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {Math.round(mockStaff.reduce((sum, staff) => sum + staff.avgAdherence, 0) / mockStaff.length)}%
            </div>
            <p className="text-xs text-green-600">+4% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Avg. Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {Math.round(mockStaff.reduce((sum, staff) => sum + staff.avgProgress, 0) / mockStaff.length)}%
            </div>
            <p className="text-xs text-green-600">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Staff List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockStaff.map((staff) => (
          <Card key={staff.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {staff.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{staff.name}</CardTitle>
                    <CardDescription>{staff.role}</CardDescription>
                    <p className="text-xs text-gray-500 mt-1">{staff.email}</p>
                  </div>
                </div>
                <Badge variant={staff.status === 'active' ? 'default' : 'secondary'}>
                  {staff.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Users className="h-4 w-4 mx-auto mb-1 text-purple-600" />
                    <p className="text-xl">{staff.assignedClients}</p>
                    <p className="text-xs text-gray-500">Clients</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <TrendingUp className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                    <p className="text-xl">{staff.avgAdherence}%</p>
                    <p className="text-xs text-gray-500">Adherence</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <TrendingUp className="h-4 w-4 mx-auto mb-1 text-green-600" />
                    <p className="text-xl">{staff.avgProgress}%</p>
                    <p className="text-xs text-gray-500">Progress</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Users className="h-3 w-3 mr-1" />
                    Assign Clients
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    View Dashboard
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Staff Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Performance Comparison</CardTitle>
          <CardDescription>Compare performance metrics across your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockStaff.map((staff) => (
              <div key={staff.id} className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>
                    {staff.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{staff.name}</span>
                    <span className="text-xs text-gray-500">{staff.assignedClients} clients</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-500">Adherence</span>
                        <span>{staff.avgAdherence}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-600" 
                          style={{ width: `${staff.avgAdherence}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span>{staff.avgProgress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-600" 
                          style={{ width: `${staff.avgProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
