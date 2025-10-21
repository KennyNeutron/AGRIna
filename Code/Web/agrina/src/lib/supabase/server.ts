// src/lib/supabase/server.ts
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

/**
 * Read-only Supabase client for Server Components (RSC).
 * Next.js 15 does not allow cookie mutations here.
 */
export async function createSupabaseRSC() {
  const cookieStore = await cookies(); // Next 15 requires awaiting cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value ?? null;
        },
        // No set/remove in RSC — must not mutate cookies here
      } as {
        get(name: string): string | null;
        set?: (name: string, value: string, options: CookieOptions) => void;
        remove?: (name: string, options: CookieOptions) => void;
      },
    }
  );
}

/**
 * Read–write Supabase client for Server Actions / Route Handlers.
 * Here we ARE allowed to set/remove cookies.
 */
export async function createSupabaseAction() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value ?? null;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          // Safe removal pattern in Actions
          cookieStore.set({
            name,
            value: "",
            ...options,
            expires: new Date(0),
          });
        },
      },
    }
  );
}
