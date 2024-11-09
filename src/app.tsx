import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./_components/theme-provider";
import { router } from "./router";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster richColors closeButton />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
