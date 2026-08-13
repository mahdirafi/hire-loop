import {Bell, Envelope, Gear, House, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import { FiSidebar } from "react-icons/fi";

export function DashboardSlidber() {
  const navItems = [
    {icon: House, label: "Home"},
    {icon: Magnifier, label: "Search"},
    {icon: Bell, label: "Notifications"},
    {icon: Envelope, label: "Messages"},
    {icon: Person, label: "Profile"},
    {icon: Gear, label: "Settings"},
  ];

  const navContent = 
            <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </button>
                ))}
              </nav>
  

  return (
    <>
    <aside className="hidden lg:flex lg:w-60 lg:flex-col lg:gap-2 lg:border-r lg:border-default/50 lg:px-3 lg:py-4">
        {navContent}
    </aside>

    <Drawer>
      <Button className="lg:hidden" variant="secondary">
        <FiSidebar />
        Menu
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Dashboard</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
             {/*  */}
             {navContent}

            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
    </>
  );
}