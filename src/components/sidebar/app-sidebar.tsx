"use client";

import {
  AudioWaveform,
  Book,
  BriefcaseBusiness,
  Command,
  GalleryVerticalEnd,
  Map,
  MessageCircleMore,
  Search,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getUserByToken } from "@/http/user/get-user-by-token";
import { useQuery } from "@tanstack/react-query";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Procurar Serviços",
      url: "#",
      icon: Search,
      items: [
        {
          title: "Gerais",
          url: "/services",
        },
        {
          title: "Região",
          url: "/services/region",
        },
        {
          title: "Remotos",
          url: "/services/remotes",
        },
        {
          title: "Presenciais",
          url: "/services/on-site",
        },
      ],
    },
    {
      title: "Meus Serviços",
      icon: BriefcaseBusiness,
      url: "#",
      items: [
        {
          title: "Meus Serviços",
          url: "/me/services",
        },
        {
          title: "Minhas Propostas",
          url: "/me/proposals",
        },
      ],
    },
    {
      title: "Endereços",
      url: "/me/addresses",
      icon: Map,
    },
    {
      title: "Conversas",
      url: "/me/chats",
      icon: MessageCircleMore,
    },
    {
      title: "Categorias",
      url: "/admin/categories",
      icon: Book,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user } = useQuery({
    queryKey: ["get-user-by-token"],
    queryFn: async () => await getUserByToken(),
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} userRole={user?.user.role} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
