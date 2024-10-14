import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTheme } from '@/components/theme-provider';
import { Calendar, Clock, LogOut, Moon, Search, Sun, User, LayoutDashboard, LogIn, Shield, Car, Wrench, Users, Package, CheckSquare, ShoppingCart, FileText, ChevronLeft, ChevronRight, Bell, Settings } from 'lucide-react';

const modules = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Calendar', icon: Calendar },
  { name: 'In/Out', icon: LogIn },
  { name: 'Administrator', icon: Shield },
  { name: 'Cars', icon: Car },
  { name: 'Installations', icon: Wrench },
  { name: 'Clients', icon: Users },
  { name: 'Warehouse', icon: Package },
  { name: 'ToDo', icon: CheckSquare },
  { name: 'Sell', icon: ShoppingCart },
  { name: 'Invoices', icon: FileText },
];

interface LayoutProps {
  children: React.ReactNode;
  activeModule: string;
  setActiveModule: (module: string) => void;
}

export default function Layout({ children, activeModule, setActiveModule }: LayoutProps) {
  const { theme, setTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className={`bg-card border-r ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out relative flex flex-col`}>
        <div className="p-4 flex items-center justify-between border-b">
          <h1 className={`text-xl font-bold ${isSidebarOpen ? '' : 'hidden'}`}>ERP System</h1>
        </div>
        <ScrollArea className="flex-grow">
          <nav className="space-y-2 p-2">
            {modules.map((module) => (
              <Button
                key={module.name}
                variant={activeModule === module.name.toLowerCase() ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${isSidebarOpen ? '' : 'justify-center'} ${
                  activeModule !== module.name.toLowerCase()
                    ? 'text-muted-foreground hover:text-primary'
                    : ''
                }`}
                onClick={() => setActiveModule(module.name.toLowerCase())}
              >
                <module.icon className={`h-5 w-5 ${isSidebarOpen ? 'mr-2' : ''}`} />
                {isSidebarOpen && <span>{module.name}</span>}
              </Button>
            ))}
          </nav>
        </ScrollArea>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute bottom-4 right-4 p-2 bg-background border border-input hover:bg-accent hover:text-accent-foreground"
        >
          {isSidebarOpen ? 
            <ChevronLeft className="h-4 w-4" /> : 
            <ChevronRight className="h-4 w-4" />
          }
        </Button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-card border-b shadow-sm w-full">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center flex-1">
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 w-full"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>
                <Button variant="outline" size="icon">
                  <Clock className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="rounded-full"
                >
                  {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}