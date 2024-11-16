import { createBrowserRouter } from "react-router-dom";
import { SignInPage } from "./pages/(auth)/sign-in/page";
import { SignUpPage } from "./pages/(auth)/sign-up/page";
import { ServicesPage } from "./pages/(home)/page";
import { OnSiteServicesPage } from "./pages/(home)/services/on-site/page";
import { RegionsServicePage } from "./pages/(home)/services/regions/page";
import { RemotesServicePage } from "./pages/(home)/services/remotes/page";
import { ServiceDetails } from "./pages/(home)/services/service-details/page";
import { RootLayout } from "./pages/layout";
import { ChatsPage } from "./pages/me/chats/page";
import { DepositMethodPage } from "./pages/me/deposit/method/page";
import { DepositPage } from "./pages/me/deposit/page";
import { MyProposalsPage } from "./pages/me/proposals/page";
import { MyServicesPage } from "./pages/me/services/page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/services", element: <ServicesPage /> },
      { path: "/services/:id", element: <ServiceDetails /> },
      { path: "/services/region", element: <RegionsServicePage /> },
      { path: "/services/remotes", element: <RemotesServicePage /> },
      { path: "/services/on-site", element: <OnSiteServicesPage /> },
      { path: "/me/chats", element: <ChatsPage /> },
      { path: "/me/services", element: <MyServicesPage /> },
      { path: "/me/proposals", element: <MyProposalsPage /> },
      { path: "/me/deposit", element: <DepositPage /> },
      { path: "/me/deposit/:method", element: <DepositMethodPage /> },
    ],
  },
  { path: "/sign-in", element: <SignInPage /> },
  { path: "/sign-up", element: <SignUpPage /> },
]);
