import { createBrowserRouter } from "react-router-dom"
import { ConfirmEmailToRecoverPassword } from "./pages/confirm-email-to-recover-password"
import { ConfirmOTP } from "./pages/confirm-otp"
import { Home } from "./pages/home"
import { Login } from "./pages/login-user"
import { Register } from "./pages/register-user"
import { UpdatePassword } from "./pages/update-password"

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/recovery-password/confirm-email",
    element: <ConfirmEmailToRecoverPassword />,
  },
  {
    path: "/confirm-otp",
    element: <ConfirmOTP />,
  },
  {
    path: "/update-password",
    element: <UpdatePassword />,
  },
  {
    path: "/home",
    element: <Home />,
  },
])
