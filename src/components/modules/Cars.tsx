import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from 'lucide-react';

const cars = [
  { id: 1, make: "Toyota", model: "Corolla", year: 2022, status: "Available" },
  { id: 2, make: "Honda", model: "Civic", year: 2021, status: "In Use" },
  { id: 3, make: "Ford", model: "Focus", year: 2023, status: "Maintenance" },
  { id: 4, make: "Chevrolet", model: "Malibu", year: 2022, status: "Available" },
  { id: 5, make: "Nissan", model: "Altima", year: 2021, status: "In Use" },
]

export default function Cars() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Cars</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Car
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Make</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.map((car) => (
            <TableRow key={car.id}>
              <TableCell>{car.id}</TableCell>
              <TableCell>{car.make}</TableCell>
              <TableCell>{car.model}</TableCell>
              <TableCell>{car.year}</TableCell>
              <TableCell>{car.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}