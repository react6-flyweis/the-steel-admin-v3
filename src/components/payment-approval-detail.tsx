import {
  Sheet,
  SheetContent,
  //   SheetHeader,
  //   SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";

type ApprovalStatus = "Pending" | "Approved" | "Rejected";

interface PaymentApprovalDetailProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  paymentData?: {
    paymentId: string;
    payee: string;
    category: string;
    requestedBy: string;
    requestDate: string;
    reference: string;
    dueDate: string;
    amount: string;
    status: ApprovalStatus;
  };
}

interface Comment {
  id: string;
  author: string;
  initials: string;
  message: string;
  timestamp: string;
  isLatest?: boolean;
}

const categoryColors: Record<string, string> = {
  "Vendor Payment": "bg-emerald-500",
  "Shipper Payment": "bg-blue-500",
  "Other Expenses": "bg-violet-600",
};

const statusColors: Record<ApprovalStatus, string> = {
  Pending: "bg-amber-500",
  Approved: "bg-emerald-500",
  Rejected: "bg-rose-500",
};

export default function PaymentApprovalDetail({
  isOpen,
  onOpenChange,
  paymentData,
}: PaymentApprovalDetailProps) {
  const comments: Comment[] = [
    {
      id: "1",
      author: "Accounts Team",
      initials: "AC",
      message:
        "Invoice and supporting documents verified.\nPlease conform budget allocation",
      timestamp: "May 19,2025 11:45 AM",
      isLatest: true,
    },
    {
      id: "2",
      author: "Riverside Plant (John Smith)",
      initials: "RP",
      message:
        "Invoice and supporting documents verified.\nPlease conform budget allocation",
      timestamp: "May 19,2025 11:45 AM",
    },
    {
      id: "3",
      author: "Accounts Team",
      initials: "AC",
      message:
        "Invoice and supporting documents verified.\nPlease conform budget allocation",
      timestamp: "May 19,2025 11:45 AM",
    },
  ];

  if (!paymentData) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto p-0">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-slate-900">
              {paymentData.paymentId}
            </h2>
            <Badge
              className={`${statusColors[paymentData.status]} hover:${statusColors[paymentData.status]} text-white rounded px-3 py-0.5 h-auto text-sm font-normal`}
            >
              {paymentData.status} Approval
            </Badge>
          </div>
          <SheetClose asChild>
            <button className="text-slate-400 hover:text-slate-600">
              <X className="h-5 w-5" />
            </button>
          </SheetClose>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Details Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-600 mb-1">Payee/Vendor</p>
                <p className="text-slate-900 font-medium">
                  {paymentData.payee}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Category</p>
                <Badge
                  className={`${categoryColors[paymentData.category] ?? "bg-slate-500"} hover:${categoryColors[paymentData.category] ?? "bg-slate-500"} text-white rounded-md px-3 font-normal w-fit`}
                >
                  {paymentData.category}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Requested by</p>
                <p className="text-slate-900">{paymentData.requestedBy}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Requested Date</p>
                <p className="text-slate-900">{paymentData.requestDate}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Reference/Invoice</p>
                <p className="text-slate-900">{paymentData.reference}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Due Date</p>
                <p className="text-slate-900">{paymentData.dueDate}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-slate-600 mb-1">Amount</p>
                <p className="text-2xl font-bold text-slate-900">
                  {paymentData.amount}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="reviews" className="w-full">
            <TabsList
              variant="line"
              className="grid w-full grid-cols-4 border-y border-slate-200 bg-transparent p-0 h-auto"
            >
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="attachments">Attachments</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6 space-y-4">
              <p className="text-slate-600">No additional details</p>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6 space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-6">
                  Remarks & Comments
                </h3>

                {/* Timeline */}
                <div className="space-y-6">
                  {comments.map((comment, index) => (
                    <div key={comment.id} className="flex gap-4">
                      {/* Timeline line and avatar */}
                      <div className="h-full flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
                          {comment.initials}
                        </div>
                        {index < comments.length - 1 && (
                          <div className="w-0.5 min-h-6  bg-blue-300 mt-2"></div>
                        )}
                      </div>

                      {/* Comment content */}
                      <div className="flex-1 pt-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-semibold text-slate-900">
                            {comment.author}
                          </p>
                          {comment.isLatest && (
                            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-2 py-0.5">
                              Latest
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mb-3">
                          {comment.timestamp}
                        </p>
                        <p className="text-slate-600 text-sm whitespace-pre-line bg-slate-50 p-3 rounded-md">
                          {comment.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Remark */}
                <div className="mt-8 space-y-3">
                  <textarea
                    placeholder="Add a Remark"
                    className="w-full p-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={4}
                  />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Add Remark
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="attachments" className="mt-6">
              <p className="text-slate-600">No attachments</p>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <p className="text-slate-600">No history</p>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-slate-200">
            <Button
              variant="outline"
              className="flex-1 h-11 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 font-medium"
            >
              Reject
            </Button>
            <Button className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium">
              Approve
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
