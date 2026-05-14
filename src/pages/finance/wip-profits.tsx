"use client";

import { useState } from "react";
import { Database, Download, Eye, PencilLine, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TitleSubtitle from "@/components/TitleSubtitle";
import SuccessDialog from "@/components/success-dialog";
import AddPaymentEntryDialog from "@/components/add-payment-entry-dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type SummaryCardProps = {
  title: string;
  value: string;
  iconTone: string;
  valueTone?: string;
};

const summaryCards = [
  {
    title: "Total Order Value",
    value: "$12,30,000",
    iconTone: "bg-[#edf4ff] text-[#2f6ee4]",
  },
  {
    title: "Total Received",
    value: "$8,45,000",
    iconTone: "bg-[#eafaf0] text-[#3fb45a]",
  },
  {
    title: "Outstanding",
    value: "$3,85,000",
    iconTone: "bg-[#ffe9e8] text-[#f97373]",
    valueTone: "text-[#f24848]",
  },
  {
    title: "Total WIP Profit",
    value: "$2,33,000",
    iconTone: "bg-[#f3eaff] text-[#a46ff0]",
  },
] satisfies SummaryCardProps[];

const orderRows = [
  { name: "John Doe", status: "In progress" },
  { name: "XYZ", status: "Completed" },
  { name: "ABC", status: "Started" },
  { name: "PQR", status: "In progress" },
];

function SummaryCard({
  title,
  value,
  iconTone,
  valueTone = "text-slate-950",
}: SummaryCardProps) {
  return (
    <div className="rounded-md border border-white/80 bg-white px-4 py-4 shadow-[0_4px_16px_rgba(148,163,184,0.12)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-500">{title}</p>
          <p
            className={`mt-1 text-[17px] font-semibold tracking-[-0.02em] ${valueTone}`}
          >
            {value}
          </p>
        </div>

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconTone}`}
        >
          <Database className="h-4.5 w-4.5" strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const statusStyles: Record<string, string> = {
    "In progress": "bg-[#e3edff] text-[#4a78d6]",
    Completed: "bg-[#e6f9ea] text-[#46b865]",
    Started: "bg-[#fff1df] text-[#f0a23a]",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium ${
        statusStyles[status] ?? "bg-slate-100 text-slate-500"
      }`}
    >
      {status}
    </span>
  );
}

export default function WipProfitsPage() {
  const [client, setClient] = useState("all-clients");
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [successDialogTitle, setSuccessDialogTitle] = useState(
    "Data exported successfully",
  );
  const [paymentEntryDialogOpen, setPaymentEntryDialogOpen] = useState(false);

  return (
    <div className="p-5">
      <div className="mx-auto flex w-full max-w-360 flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <TitleSubtitle
            title="WIP Profits"
            subtitle="Financial performance tracking and management"
            titleClassName="text-[28px] tracking-[-0.03em] text-slate-900"
            subtitleClassName="text-sm text-slate-500"
          />

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-10 rounded-lg border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              onClick={() => {
                setSuccessDialogTitle("Data exported successfully");
                setSuccessDialogOpen(true);
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Export Reports
            </Button>

            <Button
              className="h-10 rounded-lg bg-[#2f6ee4] px-4 text-sm font-medium text-white shadow-sm hover:bg-[#285fd0]"
              onClick={() => setPaymentEntryDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Entry
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <SummaryCard {...card} />
          ))}
        </div>

        <Card className="gap-0 pb-0 rounded-md">
          <CardHeader className="flex flex-col gap-3 border-b  sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-slate-900">
              Orders &amp; Payment Summary
            </h2>

            <Select value={client} onValueChange={setClient}>
              <SelectTrigger className="h-9 w-29.5 rounded-lg border-slate-200 bg-white text-xs text-slate-600 shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-clients">All Clients</SelectItem>
                <SelectItem value="john-doe">John Doe</SelectItem>
                <SelectItem value="xyz-client">XYZ Client</SelectItem>
                <SelectItem value="pqr-client">PQR Client</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/80 text-[10px] font-medium uppercase tracking-[0.08em] text-slate-400">
                    <th className="px-4 py-4 text-left">Order Details</th>
                    <th className="px-4 py-4 text-left">Order Value</th>
                    <th className="px-4 py-4 text-left">Payment Breakdown</th>
                    <th className="px-4 py-4 text-left">Outstanding</th>
                    <th className="px-4 py-4 text-left">WIP Profit</th>
                    <th className="px-4 py-4 text-left">Status</th>
                    <th className="px-4 py-4 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {orderRows.map((row) => (
                    <tr
                      key={row.name}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <td className="px-4 py-5 align-top">
                        <div className="space-y-1.5">
                          <p className="text-[13px] font-medium text-slate-900">
                            {row.name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Q-2025-1047
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Workshop . Texas
                          </p>
                        </div>
                      </td>

                      <td className="px-4 py-5 align-top">
                        <div className="space-y-1.5">
                          <p className="text-[13px] font-semibold text-slate-900">
                            $4,50,000
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Current Cost{" "}
                            <span className="text-slate-700">$3,61,000</span>
                          </p>
                        </div>
                      </td>

                      <td className="px-4 py-5 align-top">
                        <div className="space-y-1 text-[11px] text-slate-500">
                          <div className="flex items-center justify-between gap-4">
                            <span>Deposit:</span>
                            <span className="font-semibold text-slate-900">
                              $1,35,000
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span>Progress</span>
                            <span className="font-semibold text-slate-900">
                              $1,35,000
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span>Final</span>
                            <span className="font-semibold text-slate-900">
                              $0
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-5 align-top text-[12px] font-medium text-[#ff5b5b]">
                        $1,35,000
                      </td>

                      <td className="px-4 py-5 align-top">
                        <div className="space-y-1">
                          <p className="text-[12px] font-medium text-[#38b66f]">
                            $89,000
                          </p>
                          <p className="text-[11px] text-slate-400">
                            19.8% margin
                          </p>
                        </div>
                      </td>

                      <td className="px-4 py-5 align-top">
                        <StatusPill status={row.status} />
                      </td>

                      <td className="px-4 py-5 align-top">
                        <div className="flex items-center gap-3 text-slate-500">
                          <button type="button" aria-label="View order details">
                            <Eye className="h-4 w-4 text-[#3845d7]" />
                          </button>
                          <button type="button" aria-label="Edit order details">
                            <PencilLine className="h-4 w-4 text-[#48b05f]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <SuccessDialog
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
        title={successDialogTitle}
      />

      <AddPaymentEntryDialog
        open={paymentEntryDialogOpen}
        onClose={() => setPaymentEntryDialogOpen(false)}
        onSuccess={() => {
          setPaymentEntryDialogOpen(false);
          setSuccessDialogTitle("Entry Added Successfully");
          setSuccessDialogOpen(true);
        }}
      />
    </div>
  );
}
