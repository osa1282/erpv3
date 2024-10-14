import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const installations = [
  { id: 1, client: "ABC Corp", type: "Solar Panels", status: "Scheduled", date: "2023-06-15" },
  { id: 2, client: "XYZ Inc", type: "HVAC System", status: "In Progress", date: "2023-06-10" },
  { id: 3, client: "123 Industries", type: "Security System", status: "Completed", date: "2023-06-05" },
]

export default function Installations() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Installations</h2>
      <Button>Schedule New Installation</Button>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {installations.map((installation) => (
          <Card key={installation.id}>
            <CardHeader>
              <CardTitle>{installation.client}</CardTitle>
              <CardDescription>{installation.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Status: {installation.status}</p>
              <p>Date: {installation.date}</p>
              <Button className="mt-2 w-full">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}