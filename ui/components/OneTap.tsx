"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import authClient, { useSession } from "@/lib/auth-client";

export default function OneTap() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session && "oneTap" in authClient) {
      (authClient as any).oneTap({
        fetchOptions: {
          onSuccess: () => router.push("/dashboard"),
        },
      });
    }
  }, [session]);

  return null;
}
