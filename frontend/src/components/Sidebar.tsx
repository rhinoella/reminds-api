import { useState } from "react";
import {
  ChevronLeft,
  FileText,
  Settings,
  LayoutDashboard,
  Building2,
  Tablet,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Link as RouterLink, useParams } from "react-router-dom";

const menuItems = [
  {
    name: "Home",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, path: "/", useParams: true },
      { name: "Survey", icon: FileText, path: "survey", useParams: true },
      { name: "Devices", icon: Tablet, path: "devices", useParams: true },
      {
        name: "Configuration",
        icon: Settings,
        path: "config",
        useParams: true,
      },
    ],
  },
];

const settingsItems = [
  {
    name: "Logout",
    icon: LogOut,
    path: "/logout",
    isAuthButton: true, // Special flag for auth button
  },
];

// Add defaultCollapsed to props
interface SidebarProps {
  defaultCollapsed?: boolean;
}

export default function Sidebar({ defaultCollapsed = true }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [disableCollapse, setDisableCollapse] = useState(false);

  return (
    <div
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => {
        if (!disableCollapse) {
          setCollapsed(true);
        }
      }}
      onClick={() => setCollapsed(false)}
      className={cn(
        "h-screen border-r bg-background flex flex-col transition-all duration-200 text-nowrap top-0 sticky",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground flex-shrink-0">
            <Building2 className="h-4 w-4" />
          </div>
        </div>
      </div>

      <nav
        className={cn(
          "flex-1 overflow-y-auto p-2 space-y-6 ml-2 overflow-x-hidden",
          collapsed && "overflow-hidden"
        )}
      >
        {menuItems.map((section) => (
          <div key={section.name} className="space-y-1">
            <div className="px-2 mb-2">
              <div
                className={cn(
                  "text-sm text-muted-foreground font-medium transition-all duration-300",
                  collapsed && "opacity-0"
                )}
              >
                {section.name}
              </div>
            </div>
            <div className="space-y-1">
              {section.items.map((item) => (
                <RouterLink
                  key={item.path}
                  to={item.useParams ? `${item.path}` : item.path}
                  className="flex items-center px-2 py-1.5 text-sm hover:bg-accent rounded-lg transition-all duration-200"
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span
                    className={cn(
                      "ml-2 transition-all duration-300",
                      collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                    )}
                  >
                    {item.name}
                  </span>
                </RouterLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t p-4">
        <div className="space-y-2">
          <div className="space-y-1 transition-all duration-200">
            {settingsItems.map((item) => (
              <div key={item.name}>
                <RouterLink
                  to={item.path!}
                  className="flex items-center space-x-2 p-2 hover:bg-accent rounded-lg transition-all duration-200 text-sm"
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span className={cn(collapsed && "invisible")}>
                    {item.name}
                  </span>
                </RouterLink>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className={cn("hover:bg-accent", collapsed && "invisible w-0")}
              onClick={() => setCollapsed(!collapsed)}
            >
              <ChevronLeft
                className={cn(
                  "h-4 w-4 transition-all duration-300",
                  collapsed && "rotate-180"
                )}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
