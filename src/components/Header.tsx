
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NotificationDropdown } from "./NotificationDropdown";
import { UserDropdown } from "./UserDropdown";
import { ThemeToggle } from "@/components/ThemeToggle";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        {/* Aquí está el texto "Business Manager" que puedes cambiar por el nombre de tu empresa */}
        <h1 className="text-xl font-semibold">Business Manager</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <NotificationDropdown />
        <UserDropdown />
      </div>
    </header>
  );
};
