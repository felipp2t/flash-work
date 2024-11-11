"use client";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
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
      url: "/",
      icon: SquareTerminal,
      isActive: true,
      items: [
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
        {
          title: "Categorias",
          url: "#",
        },
      ],
    },
    {
      title: "Meus Serviços",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Meus Serviços",
          url: "#",
        },
        {
          title: "Minhas Propostas",
          url: "#",
        },
      ],
    },
    {
      title: "Endereços",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Temas",
          url: "#",
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
