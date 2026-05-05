import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const leads = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "Tech Solutions Inc",
    score: 95,
    status: "hot",
    statusBgColor: "bg-red-50",
    statusTextColor: "text-red-600",
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "StartupXYZ",
    score: 78,
    status: "warm",
    statusBgColor: "bg-yellow-50",
    statusTextColor: "text-yellow-700",
  },
  {
    id: 3,
    name: "Emily Davis",
    company: "Enterprise Corp",
    score: 88,
    status: "hot",
    statusBgColor: "bg-red-50",
    statusTextColor: "text-red-600",
  },
  {
    id: 4,
    name: "Robert Wilson",
    company: "Global Industries",
    score: 45,
    status: "cold",
    statusBgColor: "bg-blue-50",
    statusTextColor: "text-blue-600",
  },
];

export default function LeadScoring() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between border-b">
        <div>
          <CardTitle>🎯 Lead Scoring</CardTitle>
          <CardDescription>Top performing leads</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-medium">
            {leads.length} total leads
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="flex items-center justify-between bg-gray-50 rounded-md p-4"
          >
            <div>
              <div className="flex items-center space-x-3">
                <span
                  className={`text-sm px-2 py-1 rounded ${lead.statusBgColor} ${lead.statusTextColor}`}
                >
                  {lead.status}
                </span>
                <div className="font-medium text-gray-900">{lead.name}</div>
              </div>
              <div className="text-sm text-gray-500">{lead.company}</div>
            </div>
            <div className="flex gap-1 items-center">
              <div className="text-sm font-semibold">{lead.score}</div>
              <div className="w-20 h-2 bg-gray-200 rounded mt-2">
                <div
                  className="h-2 bg-blue-600 rounded"
                  style={{ width: `${lead.score}%` }}
                />
              </div>
              <div className="text-sm text-blue-600 mt-1">Follow Up</div>
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter className="justify-center">
        <Link to="/leads/follow-up/scoring">
          <Button variant="link">
            View All Lead Scores
            <ArrowRight />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
