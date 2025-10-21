// src/app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // Always land on /login first
  redirect("/login");
}
