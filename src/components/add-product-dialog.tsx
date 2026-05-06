import { Upload } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProductDialog({
  open,
  onOpenChange,
}: AddProductDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Add New Product
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-8 bg-white">
          {/* BASIC INFORMATION */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              BASIC INFORMATION
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input placeholder="" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="structure">Structure</SelectItem>
                    <SelectItem value="panels">Panels</SelectItem>
                    <SelectItem value="trims">Trims</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Sub Category</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary Frame</SelectItem>
                    <SelectItem value="secondary">Secondary Frame</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>SKU/Part Code</Label>
                <Input placeholder="" />
              </div>
              <div className="space-y-2">
                <Label>Vendor/ Shipper</Label>
                <Input placeholder="" />
              </div>

              <div className="col-span-2 space-y-2">
                <Label>Product image</Label>
                <div className="border border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
                  <Upload className="w-6 h-6 mb-2 text-blue-600" />
                  <span className="text-sm">
                    Click to upload or drag and drop
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* PRICING INFORMATION */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              PRICING INFORMATION
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Pricing Type</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="per-lb">Per lb</SelectItem>
                    <SelectItem value="per-sq-ft">Per sq ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Unit</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lb">lb</SelectItem>
                    <SelectItem value="sq-ft">sq ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Base Cost</Label>
                <Input placeholder="" />
              </div>
              <div className="space-y-2">
                <Label>Default Margin (%)</Label>
                <Input placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Selling Price</Label>
                <Input placeholder="" />
              </div>
              <div className="space-y-2">
                <Label>Minimum Margin Allowed</Label>
                <Input placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Maximum Margin Allowed</Label>
                <Input placeholder="" />
              </div>
            </div>
          </div>

          {/* PRICING INFORMATION 2 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider flex items-center justify-between">
              PRICING INFORMATION
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Input Type Required</Label>
                <Input placeholder="" />
              </div>
              <div className="space-y-2">
                <Label>Default Quantity</Label>
                <Input placeholder="1" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Allow Quantity Override in rates
                </span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* PROCUREMENT INVENTORY */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              PROCUREMENT INVENTORY
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Lead Time</Label>
                <Input placeholder="" />
              </div>
              <div className="space-y-2">
                <Label>Min Order Quantity</Label>
                <Input placeholder="" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Stock Tracking</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* COST STRUCTURE */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              COST STRUCTURE
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Material Cost (USD)</Label>
                <Input placeholder="" />
              </div>
              <div className="space-y-2">
                <Label>Labor Cost (USD)</Label>
                <Input placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Overhead Cost (USD)</Label>
                <Input placeholder="" />
              </div>
              <div className="space-y-2">
                <Label>Total Cost (USD)</Label>
                <Input placeholder="" />
              </div>
            </div>
          </div>

          {/* TAX & ACCOUNTING */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              TAX & ACCOUNTING
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Tax Category</Label>
                <Input placeholder="" />
              </div>
              <div className="space-y-2">
                <Label>Account Code</Label>
                <Input placeholder="" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Taxable</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* USAGE MAPPING */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              USAGE MAPPING
            </h3>
            <div className="flex flex-wrap gap-8 items-center pt-2">
              <div className="flex items-center gap-2">
                <Checkbox id="quotation" defaultChecked />
                <Label
                  htmlFor="quotation"
                  className="font-normal cursor-pointer text-sm"
                >
                  Quotation
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="bom" defaultChecked />
                <Label
                  htmlFor="bom"
                  className="font-normal cursor-pointer text-sm"
                >
                  BOM/Takeoff
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="shipper" defaultChecked />
                <Label
                  htmlFor="shipper"
                  className="font-normal cursor-pointer text-sm"
                >
                  Shipper
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="freight" defaultChecked />
                <Label
                  htmlFor="freight"
                  className="font-normal cursor-pointer text-sm"
                >
                  Freight
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="other" defaultChecked />
                <Label
                  htmlFor="other"
                  className="font-normal cursor-pointer text-sm"
                >
                  Other
                </Label>
              </div>
            </div>
          </div>

          {/* SMDT INTERGRATION */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              SMDT INTERGRATION
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Linked SMDT Item/Code</Label>
                <Input placeholder="" />
              </div>
              <div className="space-y-2">
                <Label>Last Synced</Label>
                <Input placeholder="" />
              </div>
              <div className="space-y-2">
                <Label>Sync Source</Label>
                <Input placeholder="" />
              </div>
            </div>
          </div>

          {/* CONTROL & STATUS */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              CONTROL & STATUS
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Status</Label>
                <Input placeholder="" />
              </div>
              <div className="space-y-2">
                <Label>Effective from</Label>
                <Input placeholder="" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Price Lock</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3 bg-white sticky bottom-0 z-10">
          <Button
            variant="outline"
            className="border-gray-200"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            Save as Draft
          </Button>
          <Button className="bg-[#2563EB] hover:bg-blue-700 text-white">
            Save Product
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
