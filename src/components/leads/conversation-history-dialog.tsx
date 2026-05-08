import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Lead = {
  id: string;
  name: string;
};

type CallHistoryItem = {
  id: string;
  date: string;
  time: string;
  callsCount: number;
};

type Props = {
  lead: Lead;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const mockCallHistory: CallHistoryItem[] = [
  {
    id: "call-1",
    date: "May 1, 2026",
    time: "9.00 PM",
    callsCount: 2,
  },
  {
    id: "call-2",
    date: "May 1, 2026",
    time: "9.00 PM",
    callsCount: 2,
  },
];

export default function ConversationHistoryDialog({
  lead,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const totalCalls = mockCallHistory.reduce(
    (sum, item) => sum + item.callsCount,
    0,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}

      <DialogContent className="sm:max-w-xl p-0 overflow-hidden">
        <div className="flex max-h-[90vh] flex-col bg-white">
          <DialogHeader className="border-b border-gray-200 px-4 py-3 sm:px-5 sm:py-4">
            <DialogTitle className="text-lg font-semibold tracking-tight text-gray-900">
              Call History
            </DialogTitle>
            <DialogDescription className="text-xs text-gray-500">
              {lead.name} • {lead.id} • {totalCalls} total calls
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 px-4 py-3 sm:px-5 sm:py-4">
            <div className="space-y-4">
              {mockCallHistory.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm sm:px-5"
                >
                  <div className="grid grid-cols-1 gap-2 text-gray-700 sm:grid-cols-[1.1fr_0.9fr_0.7fr] sm:items-center sm:gap-3">
                    <div className="text-base font-normal text-gray-700">
                      {item.date}
                    </div>
                    <div className="text-base font-normal text-gray-700">
                      {item.time}
                    </div>
                    <div className="text-base font-normal text-gray-500 sm:text-center">
                      {item.callsCount} Calls
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="px-4 pb-4 sm:px-5 sm:pb-5">
            <DialogClose asChild>
              <Button
                type="button"
                className="h-10 w-full rounded-lg bg-gray-500 px-5 text-sm font-normal text-white hover:bg-gray-600 sm:ml-auto sm:w-32"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
