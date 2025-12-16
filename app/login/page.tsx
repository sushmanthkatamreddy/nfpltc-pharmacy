import type { Metadata } from "next"
import LoginPageClient from "./LoginPageClient"

export const metadata: Metadata = {
  title: "Resident Portal - Login",
}

export default function Page() {
  return <LoginPageClient />
}
