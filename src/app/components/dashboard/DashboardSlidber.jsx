import {Bell, Envelope, Gear, House, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import { FiSidebar } from "react-icons/fi";
import Link from "next/link";

export function DashboardSlidber() {

const navItems = [
  { icon: House, href: "/dashboard/recruiter", label: "Home" },
  { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
  { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Create a New Jobs" },
  { icon: Person, href: "/dashboard/recruiter/jobs/profile", label: "Profile" },
  { icon: Envelope, href:"/dashboard/recruiter/company", label: "Company" }, // no href
  { icon: Gear, label: "Settings" },    // no href
];

const navContent = (
  <nav className="flex flex-col gap-1">
    {navItems.map((item) => {
      const Icon = item.icon;

      // If no href, render a <div> (or a <button>) instead of Link
      if (!item.href) {
        return (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default cursor-not-allowed"
          >
            <Icon className="size-5 text-muted" />
            {item.label}
          </div>
        );
      }

      return (
        <Link
          key={item.href}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          href={item.href}
        >
          <Icon className="size-5 text-muted" />
          {item.label}
        </Link>
      );
    })}
  </nav>
);
  

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