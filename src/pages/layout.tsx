import { AppSidebar } from "@/_components/sidebar/app-sidebar";
import { Button } from "@/_components/ui/button";
import { Separator } from "@/_components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/_components/ui/sidebar";
import { Wallet, Webhook } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Link to="/services">
              <div className="flex items-center gap-3">
                <Webhook className="text-primary" />
                <h2>FlashWork</h2>
              </div>
            </Link>
          </div>

          <div className="mr-12">
            <Button asChild variant="outline" className="aspect-square p-0">
              <Link to="/me/deposit">
                <Wallet className="size-4" />
              </Link>
            </Button>
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
