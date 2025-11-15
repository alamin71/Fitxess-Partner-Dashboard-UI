import React from 'react';
import { DashboardLayout } from './components/DashboardLayout';
import { OverviewPage } from './components/OverviewPage';
import { ClientsPage } from './components/ClientsPage';
import { MessagingPage } from './components/MessagingPage';
import { ProgramsPage } from './components/ProgramsPage';
import { PlansLibraryPage } from './components/PlansLibraryPage';
import { EarningsPage } from './components/EarningsPage';
import { ReferralsPage } from './components/ReferralsPage';
import { InsightsPage } from './components/InsightsPage';
import { StaffPage } from './components/StaffPage';
import { OrganizationPage } from './components/OrganizationPage';
import { SettingsPage } from './components/SettingsPage';
import { NotificationsPage } from './components/NotificationsPage';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState('overview');
  const [userRole] = React.useState<'trainer' | 'gym' | 'medspa'>('gym'); // Change to 'trainer', 'gym', or 'medspa' to test different roles

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <OverviewPage />;
      case 'clients':
        return <ClientsPage />;
      case 'messaging':
        return <MessagingPage />;
      case 'programs':
        return <ProgramsPage />;
      case 'plans':
        return <PlansLibraryPage />;
      case 'earnings':
        return <EarningsPage />;
      case 'referrals':
        return <ReferralsPage />;
      case 'insights':
        return <InsightsPage />;
      case 'staff':
        return <StaffPage />;
      case 'organization':
        return <OrganizationPage />;
      case 'settings':
        return <SettingsPage />;
      case 'notifications':
        return <NotificationsPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <>
      <DashboardLayout
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        userRole={userRole}
        unreadMessages={3}
        notifications={5}
      >
        {renderPage()}
      </DashboardLayout>
      <Toaster />
    </>
  );
}
