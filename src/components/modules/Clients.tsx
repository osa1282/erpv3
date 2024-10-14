import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Eye, Phone, Mail, DollarSign, FileText, MessageSquare, Clipboard, Package, Calendar } from 'lucide-react';

// Mock data for clients
const clients = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", totalOrders: 5000, address: "123 Main St, Anytown, USA", lastContact: "2023-06-01", nextAppointment: "2023-06-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "098-765-4321", totalOrders: 7500, address: "456 Elm St, Somewhere, USA", lastContact: "2023-05-28", nextAppointment: "2023-06-10" },
  // ... (other clients)
];

function ClientCard({ client, onView }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{client.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center">
            <Mail className="mr-2 h-4 w-4" />
            <span>{client.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="mr-2 h-4 w-4" />
            <span>{client.phone}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            <span>${client.totalOrders.toFixed(2)}</span>
          </div>
        </div>
        <Button className="w-full mt-4" onClick={() => onView(client)}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Clients() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [isAddingClient, setIsAddingClient] = useState(false);

  const handleViewClient = (client) => {
    setSelectedClient(client);
  };

  const handleBackToList = () => {
    setSelectedClient(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Clients</h2>
        <Button onClick={() => setIsAddingClient(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Client
        </Button>
      </div>
      
      {selectedClient ? (
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={handleBackToList}>
                Back to List
              </Button>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Client
              </Button>
            </div>
            <CardTitle className="text-2xl font-bold mt-4">{selectedClient.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="info">
              <TabsList>
                <TabsTrigger value="info">Info</TabsTrigger>
                <TabsTrigger value="communication">Communication</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="space-y-4">
                <div>
                  <Label>Email</Label>
                  <div className="flex items-center mt-1">
                    <Mail className="mr-2 h-4 w-4" />
                    <span>{selectedClient.email}</span>
                  </div>
                </div>
                <div>
                  <Label>Phone</Label>
                  <div className="flex items-center mt-1">
                    <Phone className="mr-2 h-4 w-4" />
                    <span>{selectedClient.phone}</span>
                  </div>
                </div>
                <div>
                  <Label>Address</Label>
                  <div className="flex items-center mt-1">
                    <Clipboard className="mr-2 h-4 w-4" />
                    <span>{selectedClient.address}</span>
                  </div>
                </div>
                <div>
                  <Label>Total Orders</Label>
                  <div className="flex items-center mt-1">
                    <DollarSign className="mr-2 h-4 w-4" />
                    <span>${selectedClient.totalOrders.toFixed(2)}</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="communication" className="space-y-4">
                <div>
                  <Label>Last Contact</Label>
                  <div className="flex items-center mt-1">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{selectedClient.lastContact}</span>
                  </div>
                </div>
                <div>
                  <Label>Next Appointment</Label>
                  <div className="flex items-center mt-1">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{selectedClient.nextAppointment}</span>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </TabsContent>
              <TabsContent value="orders" className="space-y-4">
                <Button className="w-full">
                  <Package className="mr-2 h-4 w-4" />
                  View Orders
                </Button>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Order
                </Button>
              </TabsContent>
              <TabsContent value="notes" className="space-y-4">
                <Textarea placeholder="Add a note about this client..." />
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Note
                </Button>
              </TabsContent>
            </Tabs>
            <div className="mt-6 space-y-2">
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Generate Quote
              </Button>
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Create Contract
              </Button>
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Send Warranty Documents
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((client) => (
              <ClientCard key={client.id} client={client} onView={handleViewClient} />
            ))}
          </div>
        </ScrollArea>
      )}

      <Dialog open={isAddingClient} onOpenChange={setIsAddingClient}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter client name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter client email" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="Enter client phone" />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="Enter client address" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingClient(false)}>Cancel</Button>
            <Button onClick={() => setIsAddingClient(false)}>Add Client</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}