// src/app/login/actions.ts
"use server";

import { redirect } from "next/navigation";
import { createSupabaseAction } from "@/lib/supabase/server";

export type AuthActionState = { ok: boolean; message: string } | null;

export async function signInAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const supabase = await createSupabaseAction();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { ok: false, message: error.message };
  }

  // redirect() throws to stop execution, but we still return a value
  // to satisfy the function signature for useActionState.
  redirect("/dashboard");
  return null; // Unreachable, satisfies the type checker
}

export async function signUpAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const fullName = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const supabase = await createSupabaseAction();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/login`,
    },
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  return {
    ok: true,
    message: "Check your email to confirm your account, then sign in.",
  };
}

export async function signOutAction(): Promise<void> {
  const supabase = await createSupabaseAction();
  await supabase.auth.signOut();
  redirect("/login");
}
