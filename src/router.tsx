import { createBrowserRouter } from "react-router-dom";
import { SignInPage } from "./pages/(auth)/sign-in/page";

export const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
]);
