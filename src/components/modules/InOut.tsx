import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function InOut() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">In/Out</h2>
        <Button>View History</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Clock In</CardTitle>
            <CardDescription>Record your arrival time</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Current time: {new Date().toLocaleTimeString()}</p>
          </CardContent>
          <CardFooter>
            <Button>Clock In</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Clock Out</CardTitle>
            <CardDescription>Record your departure time</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Current time: {new Date().toLocaleTimeString()}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Clock Out</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}