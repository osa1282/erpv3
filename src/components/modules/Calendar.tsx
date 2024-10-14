import { useState, useEffect } from 'react';
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data for events
const mockEvents = [
  { id: 1, title: "Client Meeting", type: "meeting", client: "ABC Corp", date: new Date(2024, 9, 5), color: "#ff4d4f" },
  { id: 2, title: "Product Delivery", type: "delivery", client: "XYZ Inc", date: new Date(2024, 9, 10), color: "#40a9ff", car: "Van 1", items: "5x Widget A, 3x Gadget B" },
  { id: 3, title: "Installation", type: "installation", client: "123 Industries", date: new Date(2024, 9, 15), color: "#73d13d", car: "Truck 2", deckColor: "Mahogany", contractNumber: "CNT-2024-001", contractDate: "2024-09-01", deckArea: 50, price: 5000 },
];

const cars = ["Van 1", "Van 2", "Truck 1", "Truck 2"];

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [events, setEvents] = useState(mockEvents);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'meeting',
    client: '',
    date: new Date(),
    color: '#ff4d4f',
    car: '',
    deckColor: '',
    contractNumber: '',
    contractDate: '',
    deckArea: 0,
    price: 0,
    items: '',
  });

  useEffect(() => {
    // Set the initial selected date to the current date
    setSelectedDate(new Date());
  }, []);

  const getDayEvents = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const getWeekDates = (date: Date) => {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(date);
      day.setDate(date.getDate() - date.getDay() + i);
      week.push(day);
    }
    return week;
  };

  const renderWeekView = () => {
    const weekDates = getWeekDates(selectedDate || new Date());
    return (
      <div className="grid grid-cols-7 gap-2 h-full">
        {weekDates.map((date, index) => (
          <div key={index} className="border rounded p-2 h-full overflow-y-auto">
            <div className="font-bold mb-2">{date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
            {getDayEvents(date).map(event => (
              <Popover key={event.id}>
                <PopoverTrigger asChild>
                  <div 
                    className="w-full p-1 text-xs rounded cursor-pointer text-white truncate mb-1"
                    style={{ backgroundColor: event.color }}
                  >
                    {event.title}
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="space-y-2">
                    <h3 className="font-bold">{event.title}</h3>
                    <p>Type: {event.type}</p>
                    <p>Client: {event.client}</p>
                    <p>Car: {event.car}</p>
                    {event.type === 'installation' && (
                      <>
                        <p>Deck Color: {event.deckColor}</p>
                        <p>Contract: {event.contractNumber}</p>
                        <p>Contract Date: {event.contractDate}</p>
                        <p>Deck Area: {event.deckArea} m²</p>
                        <p>Price: ${event.price}</p>
                      </>
                    )}
                    {event.type === 'delivery' && (
                      <p>Items: {event.items}</p>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const handleAddEvent = () => {
    setEvents([...events, { ...newEvent, id: Date.now() }]);
    setIsAddingEvent(false);
    setNewEvent({
      title: '',
      type: 'meeting',
      client: '',
      date: new Date(),
      color: '#ff4d4f',
      car: '',
      deckColor: '',
      contractNumber: '',
      contractDate: '',
      deckArea: 0,
      price: 0,
      items: '',
    });
  };

  return (
    <div className="space-y-4 h-[calc(100vh-130px)]">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Calendar</h2>
        <div className="space-x-2">
          <Button onClick={() => setViewMode('month')}>Month View</Button>
          <Button onClick={() => setViewMode('week')}>Week View</Button>
          <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={newEvent.type} onValueChange={(value) => setNewEvent({...newEvent, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="delivery">Delivery</SelectItem>
                      <SelectItem value="installation">Installation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="client">Client</Label>
                  <Input id="client" value={newEvent.client} onChange={(e) => setNewEvent({...newEvent, client: e.target.value})} />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" value={newEvent.date.toISOString().split('T')[0]} onChange={(e) => setNewEvent({...newEvent, date: new Date(e.target.value)})} />
                </div>
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" type="color" value={newEvent.color} onChange={(e) => setNewEvent({...newEvent, color: e.target.value})} />
                </div>
                {newEvent.type !== 'meeting' && (
                  <div>
                    <Label htmlFor="car">Car</Label>
                    <Select value={newEvent.car} onValueChange={(value) => setNewEvent({...newEvent, car: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select car" />
                      </SelectTrigger>
                      <SelectContent>
                        {cars.map((car) => (
                          <SelectItem key={car} value={car}>{car}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {newEvent.type === 'installation' && (
                  <>
                    <div>
                      <Label htmlFor="deckColor">Deck Color</Label>
                      <Input id="deckColor" value={newEvent.deckColor} onChange={(e) => setNewEvent({...newEvent, deckColor: e.target.value})} />
                    </div>
                    <div>
                      <Label htmlFor="contractNumber">Contract Number</Label>
                      <Input id="contractNumber" value={newEvent.contractNumber} onChange={(e) => setNewEvent({...newEvent, contractNumber: e.target.value})} />
                    </div>
                    <div>
                      <Label htmlFor="contractDate">Contract Date</Label>
                      <Input id="contractDate" type="date" value={newEvent.contractDate} onChange={(e) => setNewEvent({...newEvent, contractDate: e.target.value})} />
                    </div>
                    <div>
                      <Label htmlFor="deckArea">Deck Area (m²)</Label>
                      <Input id="deckArea" type="number" value={newEvent.deckArea} onChange={(e) => setNewEvent({...newEvent, deckArea: parseFloat(e.target.value)})} />
                    </div>
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input id="price" type="number" value={newEvent.price} onChange={(e) => setNewEvent({...newEvent, price: parseFloat(e.target.value)})} />
                    </div>
                  </>
                )}
                {newEvent.type === 'delivery' && (
                  <div>
                    <Label htmlFor="items">Items</Label>
                    <Input id="items" value={newEvent.items} onChange={(e) => setNewEvent({...newEvent, items: e.target.value})} />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingEvent(false)}>Cancel</Button>
                <Button onClick={handleAddEvent}>Add Event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Card className="w-full h-full">
        <CardContent className="p-0 h-full">
          {viewMode === 'month' ? (
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border h-full"
              components={{
                DayContent: ({ date }) => {
                  const dayEvents = getDayEvents(date);
                  return (
                    <div className="w-full h-full flex flex-col items-start justify-start p-1">
                      <span className="text-sm font-semibold">{date.getDate()}</span>
                      <div className="flex flex-col w-full mt-1 space-y-1 overflow-y-auto max-h-[80%]">
                        {dayEvents.map(event => (
                          <Popover key={event.id}>
                            <PopoverTrigger asChild>
                              <div 
                                className="w-full p-1 text-xs rounded cursor-pointer text-white truncate"
                                style={{ backgroundColor: event.color }}
                              >
                                {event.title}
                              </div>
                            </PopoverTrigger>
                            <PopoverContent>
                              <div className="space-y-2">
                                <h3 className="font-bold">{event.title}</h3>
                                <p>Type: {event.type}</p>
                                <p>Client: {event.client}</p>
                                <p>Car: {event.car}</p>
                                {event.type === 'installation' && (
                                  <>
                                    <p>Deck Color: {event.deckColor}</p>
                                    <p>Contract: {event.contractNumber}</p>
                                    <p>Contract Date: {event.contractDate}</p>
                                    <p>Deck Area: {event.deckArea} m²</p>
                                    <p>Price: ${event.price}</p>
                                  </>
                                )}
                                {event.type === 'delivery' && (
                                  <p>Items: {event.items}</p>
                                )}
                              </div>
                            </PopoverContent>
                          </Popover>
                        ))}
                      </div>
                    </div>
                  );
                },
              }}
            />
          ) : (
            renderWeekView()
          )}
        </CardContent>
      </Card>
    </div>
  );
}