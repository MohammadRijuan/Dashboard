"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  House,
  DollarSign,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Mail,
  Users,
  Bell,
  Info,
} from "lucide-react";
import { usePathname } from "next/navigation";

const Icons = {
  House,
  DollarSign,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Mail,
  Users,
  Bell,
  Info,
};

type SidebarItem = {
  name: string;
  href: string;
  icon: keyof typeof Icons;
};

const Sidebar = () => {
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/data/data.json")
      .then((response) => response.json())
      .then((data) => setSidebarItems(data.sidebarItems))
      .catch((error) => console.error("Failed to load sidebar data:", error));
  }, []);

  return (
    <div className="w-64 relative z-10 transition-all duration-300 ease-in-out bg-gray-800 text-white h-screen p-4 flex flex-col flex-shrink-0">
      <div className="h-full bg-gray-700 backdrop-blur-md p-4 flex flex-col border-r border-black rounded-lg">
        <nav className="mt-8 flex-grow space-y-2">
          {sidebarItems.map((item) => {
            console.log(item);
            const IconComponent = Icons[item.icon];

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-gray-600 text-white"
                    : "text-gray-300 hover:bg-gray-600 hover:text-white"
                }`}
              >
                <IconComponent size={20} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;