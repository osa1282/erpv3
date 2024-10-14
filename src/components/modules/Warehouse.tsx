import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const inventory = [
  { id: 1, name: "Widget A",category: "Electronics", quantity: 100, price: 19.99 },
  { id: 2, name: "Gadget B", category: "Tools", quantity: 50, price: 29.99 },
  { id: 3, name: "Component C", category: "Parts", quantity: 200, price: 9.99 },
  { id: 4, name: "Device D", category: "Electronics", quantity: 75, price: 39.99 },
  { id: 5, name: "Tool E", category: "Tools", quantity: 30, price: 49.99 },
]

export default function Warehouse() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Warehouse</h2>
      <div className="flex justify-between items-center">
        <Input placeholder="Search inventory..." className="max-w-sm" />
        <Button>Add New Item</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                <Button variant="destructive" size="sm">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}