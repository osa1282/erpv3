import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Eye, Edit } from 'lucide-react';

const invoices = [
  { id: "INV-001", client: "ABC Corp", amount: 1500.00, date: "2023-06-01", status: "Paid" },
  { id: "INV-002", client: "XYZ Inc", amount: 2000.00, date: "2023-06-05", status: "Pending" },
  { id: "INV-003", client: "123 Industries", amount: 1000.00, date: "2023-06-10", status: "Overdue" },
  { id: "INV-004", client: "Tech Solutions", amount: 3000.00, date: "2023-06-15", status: "Paid" },
  { id: "INV-005", client: "Global Enterprises", amount: 2500.00, date: "2023-06-20", status: "Pending" },
]

export default function Invoices() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Invoices</h2>
      <div className="flex justify-between items-center">
        <Input placeholder="Search invoices..." className="max-w-sm" />
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Invoice
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.id}</TableCell>
              <TableCell>{invoice.client}</TableCell>
              <TableCell>${invoice.amount.toFixed(2)}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}