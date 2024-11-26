import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";
import { queryClient } from "./lib/query";
import { router } from "./router";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        richColors={true}
        duration={5000}
        closeButton
        className="select-none"
      />
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
