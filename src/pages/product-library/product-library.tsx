import { useState } from "react";
import { Upload, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddProductDialog } from "@/components/add-product-dialog";

const categoryOptions = ["Structure", "Panels", "Hardware", "Trims", "Opening"];

const subcategoryOptions = [
  "Primary frame",
  "Secondary frame",
  "Roof panels",
  "Wall Panels",
  "Doors",
];

const pricingTypeOptions = ["Per lb", "Per sq ft", "Per linear ft"];

const vendorOptions = ["Vendor A", "Vendor B", "Vendor C"];

const statusOptions = ["Active", "Inactive"];

export default function ProductLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "Main Frame (steel)",
      category: "Structure",
      subcategory: "Primary Frame",
      sku: "ST-MF-001",
      pricingType: "Per lb",
      unit: "lb",
      baseCost: "$2.40",
      markup: "30%",
      catColor: "bg-gray-100 text-gray-800",
    },
    {
      id: 2,
      name: "Purlin (Galvanized)",
      category: "Panels",
      subcategory: "Secondary Frame",
      sku: "ST-MF-001",
      pricingType: "Per lb",
      unit: "lb",
      baseCost: "$165.90",
      markup: "28%",
      catColor: "bg-blue-50 text-blue-600",
    },
    {
      id: 3,
      name: "Ridge Cap",
      category: "Hardware",
      subcategory: "Roof Panels",
      sku: "ST-MF-001",
      pricingType: "Per sq ft",
      unit: "sq ft",
      baseCost: "$2.40",
      markup: "25%",
      catColor: "bg-gray-100 text-gray-800",
    },
    {
      id: 4,
      name: "Self Drilling Screw",
      category: "Panels",
      subcategory: "Wall Panels",
      sku: "ST-MF-001",
      pricingType: "Per linear ft",
      unit: "ft",
      baseCost: "$165.90",
      markup: "25%",
      catColor: "bg-blue-50 text-blue-600",
    },
    {
      id: 5,
      name: "Self Drilling Screw",
      category: "Trims",
      subcategory: "Wall Panels",
      sku: "ST-MF-001",
      pricingType: "Per qty",
      unit: "pcs",
      baseCost: "$60.76",
      markup: "30%",
      catColor: "bg-orange-50 text-orange-500",
    },
    {
      id: 6,
      name: "Roof Panel (26 Gauge)",
      category: "Structure",
      subcategory: "Wall Panels",
      sku: "ST-MF-001",
      pricingType: "Per sq ft",
      unit: "sq ft",
      baseCost: "$2.40",
      markup: "25%",
      catColor: "bg-gray-100 text-gray-800",
    },
    {
      id: 7,
      name: "Roll Up Door",
      category: "Trims",
      subcategory: "Roof Trims",
      sku: "ST-MF-001",
      pricingType: "Per qty",
      unit: "pcs",
      baseCost: "$60.76",
      markup: "35%",
      catColor: "bg-orange-50 text-orange-500",
    },
    {
      id: 8,
      name: "Self Drilling Screw",
      category: "Opening",
      subcategory: "Doors",
      sku: "ST-MF-001",
      pricingType: "Per qty",
      unit: "pcs",
      baseCost: "$60.76",
      markup: "35%",
      catColor: "bg-purple-50 text-purple-600",
    },
    {
      id: 9,
      name: "Wall Panel (26 Gauge)",
      category: "Hardware",
      subcategory: "Fasteners",
      sku: "ST-MF-001",
      pricingType: "Per qty",
      unit: "pcs",
      baseCost: "$60.76",
      markup: "35%",
      catColor: "bg-gray-100 text-gray-800",
    },
    {
      id: 10,
      name: "Self Drilling Screw",
      category: "Accessories",
      subcategory: "Fasteners",
      sku: "ST-MF-001",
      pricingType: "Per qty",
      unit: "pcs",
      baseCost: "$60.76",
      markup: "35%",
      catColor: "bg-pink-50 text-pink-600",
    },
    {
      id: 11,
      name: "Self Drilling Screw",
      category: "Accessories",
      subcategory: "Fasteners",
      sku: "ST-MF-001",
      pricingType: "Per qty",
      unit: "pcs",
      baseCost: "$60.76",
      markup: "35%",
      catColor: "bg-pink-50 text-pink-600",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Library</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all products ,Pricing and configurations used in quotations
            and projects
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white border-gray-200">
            <Upload className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            className="bg-[#2563EB] hover:bg-blue-700 text-white"
            onClick={() => setIsAddProductOpen(true)}
          >
            Add New Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <Select defaultValue="all">
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categoryOptions.map((option) => (
              <SelectItem
                key={option}
                value={option.toLowerCase().replace(/\s+/g, "-")}
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="All Subcategories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subcategories</SelectItem>
            {subcategoryOptions.map((option) => (
              <SelectItem
                key={option}
                value={option.toLowerCase().replace(/\s+/g, "-")}
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="All Pricing Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Pricing Types</SelectItem>
            {pricingTypeOptions.map((option) => (
              <SelectItem
                key={option}
                value={option.toLowerCase().replace(/\s+/g, "-")}
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="All Vendors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Vendors</SelectItem>
            {vendorOptions.map((option) => (
              <SelectItem
                key={option}
                value={option.toLowerCase().replace(/\s+/g, "-")}
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statusOptions.map((option) => (
              <SelectItem key={option} value={option.toLowerCase()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white border border-gray-100 overflow-hidden">
        <div className="p-4 flex justify-end border-b border-gray-100">
          <div className="w-full max-w-md">
            <Input
              type="text"
              placeholder="Search by Product name or SKU"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="font-semibold text-gray-900 border-b border-gray-200">
                  Product Name
                </TableHead>
                <TableHead className="font-semibold text-gray-900 border-b border-gray-200">
                  Category
                </TableHead>
                <TableHead className="font-semibold text-gray-900 border-b border-gray-200">
                  Subcategory
                </TableHead>
                <TableHead className="font-semibold text-gray-900 border-b border-gray-200">
                  SKU / Part Code
                </TableHead>
                <TableHead className="font-semibold text-gray-900 border-b border-gray-200">
                  Pricing Type
                </TableHead>
                <TableHead className="font-semibold text-gray-900 border-b border-gray-200">
                  Unit
                </TableHead>
                <TableHead className="font-semibold text-gray-900 border-b border-gray-200">
                  Base Cost (USD)
                </TableHead>
                <TableHead className="font-semibold text-gray-900 border-b border-gray-200">
                  Default Markup
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium text-gray-900 py-4">
                    {product.name}
                  </TableCell>
                  <TableCell className="py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${product.catColor}`}
                    >
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600 py-4">
                    {product.subcategory}
                  </TableCell>
                  <TableCell className="text-gray-600 py-4">
                    {product.sku}
                  </TableCell>
                  <TableCell className="text-gray-600 py-4">
                    {product.pricingType}
                  </TableCell>
                  <TableCell className="text-gray-600 py-4">
                    {product.unit}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 py-4">
                    {product.baseCost}
                  </TableCell>
                  <TableCell className="text-gray-600 py-4">
                    {product.markup}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="p-4 bg-white flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          Showing
          <Select defaultValue="10">
            <SelectTrigger className="mx-2 w-16 h-8 bg-white">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          Results
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 text-gray-400 bg-white"
            disabled
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 bg-purple-50 text-purple-600 border-purple-200"
          >
            1
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 bg-white border-transparent text-gray-600 hover:bg-gray-100"
          >
            2
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 bg-white border-transparent text-gray-600 hover:bg-gray-100"
          >
            3
          </Button>
          <span className="text-gray-400 px-1">...</span>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 bg-white border-transparent text-gray-600 hover:bg-gray-100"
          >
            15
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 text-gray-400 bg-white"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <AddProductDialog
        open={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
      />
    </div>
  );
}
