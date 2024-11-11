import { createBrowserRouter } from "react-router-dom";
import { SignInPage } from "./pages/(auth)/sign-in/page";
import { SignUpPage } from "./pages/(auth)/sign-up/page";
import { ServicesPage } from "./pages/(home)/page";
import { OnSiteServicesPage } from "./pages/(home)/services/on-site/page";
import { RegionsServicePage } from "./pages/(home)/services/regions/page";
import { RemotesServicePage } from "./pages/(home)/services/remotes/page";
import { RootLayout } from "./pages/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/services", element: <ServicesPage /> },
      { path: "/services/region", element: <RegionsServicePage /> },
      { path: "/services/remotes", element: <RemotesServicePage /> },
      { path: "/services/on-site", element: <OnSiteServicesPage /> },
    ],
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
]);
