import StatCard from "@/components/ui/stat-card";

import allEmployeesIcon from "@/assets/icons/employees/all-employees.svg";
import activeEmployeesIcon from "@/assets/icons/employees/active-employees.svg";
import teamsIcon from "@/assets/icons/employees/teams.svg";
import topPerformerIcon from "@/assets/icons/employees/top-performer.svg";

interface EmployeeStats {
  totalEmployees: number;
  inactiveEmployees: number;
  activeEmployees: number;
  totalTeams: number;
  topPerformer: {
    name: string;
    leadsCount: number;
  };
}

interface EmployeeStatsGridProps {
  stats: EmployeeStats;
  loading?: boolean;
}

const skeletonColors = [
  "bg-[#1e40af]",
  "bg-[#16a34a]",
  "bg-[#9333ea]",
  "bg-[#ea580c]",
];

export function EmployeeStatsGrid({
  stats,
  loading = false,
}: EmployeeStatsGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {skeletonColors.map((color, index) => (
          <StatCard key={index} title="" value="" color={color} loading />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Total Employees"
        value={
          <div>
            <div className="text-3xl font-bold">{stats.totalEmployees}</div>
            <div className="text-xs opacity-75">
              Inactive: {stats.inactiveEmployees}
            </div>
          </div>
        }
        icon={
          <img
            src={allEmployeesIcon}
            alt="Total Employees"
            className="h-6 w-6"
          />
        }
        color="bg-[#1e40af]"
      />

      <StatCard
        title="Active Employees"
        value={
          <div>
            <div className="text-3xl font-bold">{stats.activeEmployees}</div>
            <div className="text-xs opacity-75">
              {stats.activeEmployees} out of {stats.totalEmployees}
            </div>
          </div>
        }
        icon={
          <img
            src={activeEmployeesIcon}
            alt="Active Employees"
            className="h-6 w-6"
          />
        }
        color="bg-[#16a34a]"
      />

      <StatCard
        title="Teams"
        value={
          <div>
            <div className="text-3xl font-bold">{stats.totalTeams}</div>
            <div className="text-xs opacity-75">Active departments</div>
          </div>
        }
        icon={<img src={teamsIcon} alt="Teams" className="h-6 w-6" />}
        color="bg-[#9333ea]"
      />

      <StatCard
        title="Top Performer"
        value={
          <div>
            <div className="text-3xl font-bold">{stats.topPerformer.name}</div>
            <div className="text-xs opacity-75">
              Closed: {stats.topPerformer.leadsCount}
            </div>
          </div>
        }
        icon={
          <img src={topPerformerIcon} alt="Top Performer" className="h-6 w-6" />
        }
        color="bg-[#ea580c]"
      />
    </div>
  );
}
