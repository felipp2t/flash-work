"use client";

import * as React from "react";

import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getUserByToken } from "@/http/user/get-user-by-token";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user } = useQuery({
    queryKey: ["get-user-by-token"],
    queryFn: async () => await getUserByToken(),
  });

  if (!user?.user.name) {
    toast("Faça login para ter acesso completo ao sistema", {
      duration: 1000 * 60 * 5,
    });
  }

  const data = {
    user: {
      name: user?.user.name,
      email: user?.user.email,
      avatar: user?.user.profilePicture,
    },
    navMain: [
      {
        title: "Serviços",
        url: "#",
        items: [
          {
            title: "Por Categoria",
            url: "/services",
          },
          {
            title: "Por Região",
            url: "/services/region",
          },
          {
            title: "Por Remotos",
            url: "/services/remotes",
          },
          {
            title: "Por Presenciais",
            url: "/services/on-site",
          },
        ],
      },
      {
        title: "Meus/Minhas",
        items: [
          {
            title: "Serviços",
            url: "/me/services",
          },
          {
            title: "Propostas",
            url: "/me/proposals",
          },
          {
            title: "Conversas",
            url: "/me/chats",
          },
        ],
      },
      {
        title: "Administrar",
        url: "#",
        items: [
          {
            title: "Categorias",
            url: "/admin/categories",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => {
              return (
                <SidebarMenuItem
                  key={item.title}
                  className={cn(
                    "block",
                    item.title === "Administrar" &&
                      user?.user.role === "CUSTOMER" &&
                      "hidden",
                  )}
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="font-medium">
                      {item.title}
                    </a>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub>
                      {item.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={item.url}>{item.title}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
