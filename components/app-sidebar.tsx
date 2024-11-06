"use client"

import * as React from "react"
import {
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { usePathname } from 'next/navigation';

// This is sample data.
const data = {
  user: {
    name: '',
    email: '',
    avatar: '',
  },
  guilds: [],
  navMain: [
    {
      title: "관리 (Moderation)",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "차단 관리",
          url: "/dashboard/[id]/ban",
        },
        {
          title: "추방 관리",
          url: "/dashboard/[id]/kick",
        },
        {
          title: "경고 관리",
          url: "/dashboard/[id]/warn",
        },
      ],
    },
    {
      title: "경제 (Economy)",
      url: "/dashboard/[id]/economy",
      icon: Bot,
      items: [
        {
          title: "상점 관리",
          url: "/dashboard/[id]/shops",
        }
      ],
    },
    {
      title: "로그 관리",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "전체 로그",
          url: "#",
        },
        {
          title: "음악 로그",
          url: "#",
        },
        {
          title: "경제 로그",
          url: "#",
        },
        {
          title: "관리 로그",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "관리",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  // Get guild ID from the pathname
  const guildId = pathname.replace('/dashboard/', '');

  data.navMain = data.navMain.map((item) => {
    item.url = item.url.replace("[id]", guildId)
    if (item.items) {
      item.items = item.items.map((subItem) => {
        subItem.url = subItem.url.replace("[id]", guildId)
        return subItem
      })
    }
    return item
  })
  

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.guilds} guildId={guildId} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
