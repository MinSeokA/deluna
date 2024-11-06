'use client'

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"
import Image from "next/image";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ReactNode  // Update type to ReactNode
    plan: string,
    url: string,
  }[]
}) {
  const { data: session } = useSession()
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0] || null)  // Initialize with null or fallback team
  const [updatedTeams, setUpdatedTeams] = React.useState(teams)

  // 길드 추가: session에 길드가 있을 경우, 길드를 updatedTeams에 추가합니다.
  React.useEffect(() => {
    if (session?.user?.guilds) {
      const newTeams = session.user.guilds
        .filter((guild: { deluna: boolean }) => guild.deluna) // Only keep guilds with deluna: true
        .map((guild: { name: string; icon: string | null; id: string }) => ({
          name: guild.name,
          url: `/dashboard/${guild.id}`, // 길드 페이지 URL
          logo: guild.icon ? (
            <Image
              src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` || guild.name[0]} // Discord 서버 아이콘 URL
              alt={guild.name}
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center text-white">
              {guild.name[0]} {/* 첫 글자로 기본 아이콘 */}
            </div>
          ),
          plan: 'Standard', // 기본 plan을 설정. 필요에 따라 수정
          deluna: true, // Ensure deluna is true for filtered teams
        }))
      setUpdatedTeams(newTeams)
      if (newTeams.length > 0) {
        setActiveTeam(newTeams[0])  // Set the first team as active if available
      }
    }
  }, [session]) // session이 변경될 때마다 실행

  // Safeguard to check if activeTeam is properly set before rendering
  if (!activeTeam) {
    return null;  // Or display a loading state, like a spinner
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <div className="size-10">{activeTeam.logo}</div>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              길드 목록
            </DropdownMenuLabel>
            {updatedTeams.map((team, index) => (
              <a key={team.name} href={team.url}>
                <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <div className="size-10">{activeTeam.logo}</div>
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
              </a>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">초대하기</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
