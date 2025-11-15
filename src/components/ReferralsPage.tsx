import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Copy, Share2, Users, UserPlus, TrendingUp, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const referralStats = {
  link: 'https://fitxess.app/ref/johndoe',
  clicks: 245,
  signups: 38,
  conversions: 24,
  conversionRate: 63.2,
};

const campaigns = [
  {
    id: 1,
    name: 'Instagram Campaign',
    clicks: 120,
    signups: 18,
    conversions: 12,
    status: 'active',
  },
  {
    id: 2,
    name: 'Email Newsletter',
    clicks: 85,
    signups: 15,
    conversions: 9,
    status: 'active',
  },
  {
    id: 3,
    name: 'Facebook Group',
    clicks: 40,
    signups: 5,
    conversions: 3,
    status: 'paused',
  },
];

export function ReferralsPage() {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralStats.link);
    toast.success('Referral link copied to clipboard!');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl">Referrals</h1>
        <p className="text-gray-500">Grow your client base and earn rewards</p>
      </div>

      {/* Referral Link */}
      <Card>
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
          <CardDescription>Share this link to invite new clients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input 
              value={referralStats.link} 
              readOnly 
              className="flex-1"
            />
            <Button onClick={handleCopyLink}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500">Total Clicks</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{referralStats.clicks}</div>
            <p className="text-xs text-gray-500">Link visits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500">Signups</CardTitle>
            <UserPlus className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{referralStats.signups}</div>
            <p className="text-xs text-gray-500">New accounts created</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500">Conversions</CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{referralStats.conversions}</div>
            <p className="text-xs text-gray-500">Paying clients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500">Conversion Rate</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{referralStats.conversionRate}%</div>
            <p className="text-xs text-green-600">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Tracking */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Campaign Tracking</CardTitle>
              <CardDescription>Monitor performance of different referral campaigns</CardDescription>
            </div>
            <Button>
              Create Campaign
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Signups</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>{campaign.name}</TableCell>
                  <TableCell>{campaign.clicks}</TableCell>
                  <TableCell>{campaign.signups}</TableCell>
                  <TableCell>{campaign.conversions}</TableCell>
                  <TableCell>
                    <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Referral Program Info */}
      <Card>
        <CardHeader>
          <CardTitle>Referral Program Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="mb-1">Grow Your Network</p>
                <p className="text-sm text-gray-500">
                  Invite unlimited clients and expand your fitness community
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="mb-1">Earn Rewards</p>
                <p className="text-sm text-gray-500">
                  Get 10% commission on all referred client subscriptions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="mb-1">Track Performance</p>
                <p className="text-sm text-gray-500">
                  Monitor your referrals with detailed analytics and insights
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
