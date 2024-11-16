"use client";

import {
  AudioWaveform,
  BriefcaseBusiness,
  Command,
  GalleryVerticalEnd,
  Map,
  MessageCircleMore,
  Search,
  Settings2,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/_components/sidebar/nav-main";
import { NavUser } from "@/_components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/_components/ui/sidebar";

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
      url: "#",
      icon: Map,
      items: [
        {
          title: "Meus Endereços",
          url: "/me/addresses",
        },
      ],
    },
    {
      title: "Conversas",
      url: "#",
      icon: MessageCircleMore,
      items: [
        {
          title: "Minhas Conversas",
          url: "/me/chats",
        },
      ],
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Temas",
          url: "/me/settings/themes",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
