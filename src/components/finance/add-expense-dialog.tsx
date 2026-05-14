import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const addExpenseSchema = z.object({
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "Sub category is required"),
  project: z.string().min(1, "Project is required"),
  building: z.string().min(1, "Building is required"),
  paymentType: z.string().min(1, "Payment type is required"),
  amount: z.string().min(1, "Amount is required"),
  paymentDate: z.string().min(1, "Payment date is required"),
  transactionId: z.string().min(1, "Transaction ID is required"),
});

export type AddExpenseFormValues = z.infer<typeof addExpenseSchema>;

type AddExpenseDialogProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: (data: AddExpenseFormValues) => void;
};

const categoryOptions = [
  "Vendor/Freight",
  "Manual (Operations)",
  "Miscellaneous",
  "Salaries",
  "Marketing",
];
const subCategoryOptions = [
  "Freight",
  "Vendor",
  "Operations",
  "Miscellaneous",
  "Salary",
  "Marketing",
];
const projectOptions = ["Project 1", "Project 2", "Project 3", "Project 4"];
const buildingOptions = ["Project 1", "Project 2", "Project 3", "Project 4"];
const paymentTypeOptions = ["Bank Transfer", "Cash", "Cheque", "Card"];

export function AddExpenseDialog({
  open,
  onClose,
  onSuccess,
}: AddExpenseDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddExpenseFormValues>({
    resolver: zodResolver(addExpenseSchema),
    defaultValues: {
      category: "Vendor/Freight",
      subCategory: "Freight",
      project: "Project 1",
      building: "Project 1",
      paymentType: "Bank Transfer",
      amount: "$5000",
      paymentDate: "2026-04-12",
      transactionId: "UP0987654321",
    },
  });

  const handleCancel = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: AddExpenseFormValues) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      onSuccess?.(data);
      reset();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !value && handleCancel()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto gap-0 p-0">
        <DialogHeader className="border-b p-4">
          <DialogTitle className="text-lg">Add Expense entry</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label className="">Select Category</Label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="">Select Sub Category</Label>
              <Controller
                control={control}
                name="subCategory"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select sub category" />
                    </SelectTrigger>
                    <SelectContent>
                      {subCategoryOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.subCategory && (
                <p className="text-sm text-red-500">
                  {errors.subCategory.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="">Project (If any)</Label>
              <Controller
                control={control}
                name="project"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.project && (
                <p className="text-sm text-red-500">{errors.project.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="">Building (If any)</Label>
              <Controller
                control={control}
                name="building"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select building" />
                    </SelectTrigger>
                    <SelectContent>
                      {buildingOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.building && (
                <p className="text-sm text-red-500">
                  {errors.building.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="">Payment Type</Label>
              <Controller
                control={control}
                name="paymentType"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select payment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentTypeOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.paymentType && (
                <p className="text-sm text-red-500">
                  {errors.paymentType.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="">
                Amount
              </Label>
              <Input
                id="amount"
                type="text"
                className=""
                {...register("amount")}
              />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentDate" className="">
                Payment Date
              </Label>
              <Input
                id="paymentDate"
                type="date"
                {...register("paymentDate")}
              />
              {errors.paymentDate && (
                <p className="text-sm text-red-500">
                  {errors.paymentDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="transactionId" className="">
                Transaction ID
              </Label>
              <Input
                id="transactionId"
                type="text"
                className=""
                {...register("transactionId")}
              />
              {errors.transactionId && (
                <p className="text-sm text-red-500">
                  {errors.transactionId.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-200 pt-5">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
