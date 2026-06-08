import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import SummaryStats from "../components/dashboard/SummaryStats";
import MembershipPlan from "../components/dashboard/MembershipPlan";
import AttendanceOverview from "../components/dashboard/AttendanceOverview";
import BMIStatus from "../components/dashboard/BMIStatus";
import RecentPayments from "../components/dashboard/RecentPayments";
import QuickActions from "../components/dashboard/QuickActions";

export default function MemberDashboard() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#0c0c0c", color: "#ffffff" }}
    >
      <DashboardHeader />

      <div className="flex min-h-[calc(100vh-64px)]">
        <DashboardSidebar />

        <main className="flex-1 p-8 bg-[#0c0c0c] overflow-y-auto">
          <WelcomeCard />
          <SummaryStats />

          <div className="grid grid-cols-12 gap-6">
            <MembershipPlan />
            <AttendanceOverview />
            <BMIStatus />
            <RecentPayments />
            <QuickActions />
          </div>
        </main>
      </div>
    </div>
  );
}
