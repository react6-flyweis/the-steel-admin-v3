import { useMemo, useState } from "react";
import { CheckCircle, Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import Pagination from "@/components/Pagination";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router";

type TerminatedProject = {
  id: string;
  name: string;
  projectId: string;
  terminatedDate: string;
  stage: string;
  progress: string;
  status: string;
};

const initialProjects: TerminatedProject[] = [
  {
    id: "1",
    name: "ABC Warehouse",
    projectId: "PRO-9876",
    terminatedDate: "22 Feb 2025",
    stage: "Shipment",
    progress: "75%",
    status: "Terminated",
  },
  {
    id: "2",
    name: "Tech Park Dev",
    projectId: "PRO-9876",
    terminatedDate: "07 Feb 2025",
    stage: "Engineering",
    progress: "30%",
    status: "Terminated",
  },
  {
    id: "3",
    name: "Downtown Plaza",
    projectId: "PRO-9876",
    terminatedDate: "30 Jan 2025",
    stage: "Completed",
    progress: "100%",
    status: "Terminated",
  },
  {
    id: "4",
    name: "Riverside Complex",
    projectId: "PRO-9876",
    terminatedDate: "17 Jan 2025",
    stage: "Canceled",
    progress: "0%",
    status: "Terminated",
  },
];

export default function TerminatedProjectsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredProjects = useMemo(
    () =>
      initialProjects.filter((project) =>
        `${project.name} ${project.projectId} ${project.stage}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );

  const totalItems = filteredProjects.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const page = Math.min(currentPage, totalPages);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Terminated Projects - {initialProjects.length}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Projects Terminated by Admin
        </p>
      </div>

      <div className="w-full max-w-xs bg-white rounded-lg">
        <label className="sr-only" htmlFor="search-terminated-projects">
          Search terminated projects
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            id="search-terminated-projects"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search"
            className="pl-10"
          />
        </div>
      </div>

      <Card className="p-3">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="px-4 py-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                />
              </TableHead>
              <TableHead className="px-4 py-3 text-sm font-medium text-slate-600">
                Project Name
              </TableHead>
              <TableHead className="px-4 py-3 text-sm font-medium text-slate-600">
                Project ID
              </TableHead>
              <TableHead className="px-4 py-3 text-sm font-medium text-slate-600">
                Terminated Date
              </TableHead>
              <TableHead className="px-4 py-3 text-sm font-medium text-slate-600">
                Stage
              </TableHead>
              <TableHead className="px-4 py-3 text-sm font-medium text-slate-600">
                Progress
              </TableHead>
              <TableHead className="px-4 py-3 text-sm font-medium text-slate-600">
                Status
              </TableHead>
              <TableHead className="px-4 py-3 text-sm font-medium text-slate-600">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProjects.map((project) => (
              <TableRow key={project.id} className="hover:bg-slate-50">
                <TableCell className="px-4 py-4">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                  />
                </TableCell>
                <TableCell className="px-4 py-4 text-sm font-medium text-slate-900">
                  {project.name}
                </TableCell>
                <TableCell className="px-4 py-4 text-sm text-slate-600">
                  {project.projectId}
                </TableCell>
                <TableCell className="px-4 py-4 text-sm text-slate-600">
                  {project.terminatedDate}
                </TableCell>
                <TableCell className="px-4 py-4 text-sm text-slate-600">
                  {project.stage}
                </TableCell>
                <TableCell className="px-4 py-4 text-sm text-slate-600">
                  {project.progress}
                </TableCell>
                <TableCell className="px-4 py-4">
                  <span className="inline-flex items-center rounded-md bg-orange-100 px-2 py-0.5 text-xs  text-orange-600 border border-orange-600">
                    {project.status}
                    <CheckCircle className="ml-1 size-3 text-orange-600" />
                  </span>
                </TableCell>
                <TableCell className="px-4 py-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      navigate(`/customers/${project.id}/project-details`)
                    }
                    aria-label={`View ${project.name}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="bg-white rounded-b-lg">
        <Pagination
          totalItems={totalItems}
          currentPage={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
          onRowsPerPageChange={(rows) => {
            setRowsPerPage(rows);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
}
