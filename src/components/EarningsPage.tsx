import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { DollarSign, TrendingUp, Clock, CreditCard, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Jan', amount: 4200 },
  { month: 'Feb', amount: 4800 },
  { month: 'Mar', amount: 5200 },
  { month: 'Apr', amount: 5800 },
  { month: 'May', amount: 6400 },
  { month: 'Jun', amount: 7200 },
];

const transactions = [
  {
    id: 1,
    date: 'Nov 14, 2025',
    client: 'Sarah Johnson',
    type: 'Premium Plan',
    amount: 149,
    status: 'completed',
  },
  {
    id: 2,
    date: 'Nov 13, 2025',
    client: 'Summer Shred Challenge',
    type: 'Program',
    amount: 99,
    status: 'completed',
  },
  {
    id: 3,
    date: 'Nov 12, 2025',
    client: 'Mike Chen',
    type: 'Standard Plan',
    amount: 99,
    status: 'completed',
  },
  {
    id: 4,
    date: 'Nov 11, 2025',
    client: 'Emily Rodriguez',
    type: 'Premium Plan',
    amount: 149,
    status: 'pending',
  },
  {
    id: 5,
    date: 'Nov 10, 2025',
    client: 'David Kim',
    type: 'Basic Plan',
    amount: 49,
    status: 'completed',
  },
  {
    id: 6,
    date: 'Nov 9, 2025',
    client: 'Lisa Wang',
    type: 'Premium Plan',
    amount: 149,
    status: 'completed',
  },
  {
    id: 7,
    date: 'Nov 8, 2025',
    client: 'Muscle Building Program',
    type: 'Program',
    amount: 149,
    status: 'completed',
  },
];

export function EarningsPage() {
  const totalEarnings = 42580;
  const monthlyEarnings = 7200;
  const pendingPayouts = 2400;
  const growthRate = 15;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Earnings & Payouts</h1>
          <p className="text-gray-500">Track your revenue and manage payouts</p>
        </div>
        <Button>
          <CreditCard className="h-4 w-4 mr-2" />
          Connect Payout Account
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-gray-500">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500">Monthly Earnings</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${monthlyEarnings.toLocaleString()}</div>
            <p className="text-xs text-green-600">+{growthRate}% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500">Pending Payouts</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${pendingPayouts.toLocaleString()}</div>
            <p className="text-xs text-gray-500">Available in 3 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500">Avg. Transaction</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">$118</div>
            <p className="text-xs text-gray-500">Per client</p>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Earnings Trend</CardTitle>
          <CardDescription>Monthly earnings over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest payments and earnings</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Client/Program</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.client}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>${transaction.amount}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payout Connection */}
      <Card>
        <CardHeader>
          <CardTitle>Payout Account</CardTitle>
          <CardDescription>Connect your bank account to receive payouts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p>No payout account connected</p>
                <p className="text-sm text-gray-500">Connect with Stripe to receive payments</p>
              </div>
            </div>
            <Button>
              Connect Stripe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
