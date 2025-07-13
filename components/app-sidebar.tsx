"use client";

import type * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Calendar,
  FileText,
  Home,
  KanbanSquare,
  MessageSquare,
  Settings,
  Users,
  BarChart3,
  Clock,
  FolderOpen,
  Bell,
  Zap,
  ChevronDown,
  User,
  LogOut,
  Network,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
import Image from "next/image";

const navigation = [
  {
    title: "Main",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: Home },
      { title: "Projects", url: "/dashboard/projects", icon: FolderOpen },
      {
        title: "Gantt Chart",
        url: "/dashboard/projects/gantt",
        icon: BarChart3,
      },
      { title: "PERT Chart", url: "/dashboard/projects/pert", icon: Network },
      { title: "Tasks", url: "/dashboard/tasks", icon: KanbanSquare },
      { title: "Calendar", url: "/dashboard/calendar", icon: Calendar },
    ],
  },
  {
    title: "Collaboration",
    items: [
      { title: "Team", url: "/dashboard/team", icon: Users },
      // { title: "Messages", url: "/dashboard/messages", icon: MessageSquare },
      { title: "Files", url: "/dashboard/files", icon: FileText },
    ],
  },
  {
    title: "Tracking",
    items: [
      { title: "Time Tracking", url: "/dashboard/time-tracking", icon: Clock },
      { title: "Reports", url: "/dashboard/reports", icon: BarChart3 },
      { title: "Notifications", url: "/dashboard/notifications", icon: Bell },
    ],
  },
  {
    title: "System",
    items: [
      { title: "Automation", url: "/dashboard/automation", icon: Zap },
      { title: "Settings", url: "/dashboard/settings", icon: Settings },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, loading, signOut } = useUser();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Successfully signed out!");
      router.push("/login");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  const handleProfileClick = () => {
    router.push("/dashboard/settings");
  };

  const handleSettingsClick = () => {
    router.push("/dashboard/settings");
  };

  // Generate user initials from full name or email
  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(" ")
        .map((name) => name.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  // Get display name
  const getDisplayName = () => {
    if (profile?.full_name) {
      return profile.full_name;
    }
    if (user?.email) {
      return user.email.split("@")[0];
    }
    return "User";
  };

  return (
    <Sidebar {...props} className="bg-white">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <KanbanSquare className="h-4 w-4" />
          </div> */}

          <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
            <Image  
              src={"/logo.png"}
              alt="ScrumFlow Logo"
              width={1000000}
              height={1000000}
              className="h-full w-auto"
            />
          </div>
          <span className="font-semibold">ProjectFlow</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navigation.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {loading ? (
              <SidebarMenuButton disabled>
                <Avatar className="h-6 w-6">
                  <AvatarFallback>...</AvatarFallback>
                </Avatar>
                <span>Loading...</span>
              </SidebarMenuButton>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={
                          profile?.avatar_url ||
                          "/placeholder.svg?height=24&width=24"
                        }
                        alt={getDisplayName()}
                      />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <span className="truncate">{getDisplayName()}</span>
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  {/* <DropdownMenuItem onClick={handleProfileClick}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem> */}
                  <DropdownMenuItem onClick={handleSettingsClick}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
