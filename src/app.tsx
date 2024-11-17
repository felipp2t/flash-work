import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./_components/theme-provider";
import { queryClient } from "./_lib/query";
import { router } from "./router";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors={true} closeButton className="select-none" />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
