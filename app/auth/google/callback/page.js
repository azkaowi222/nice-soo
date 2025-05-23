"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      // Bisa juga set isLoggedIn = true jika pakai context
      router.push("/"); // Redirect ke dashboard atau homepage
    }
  }, [token]);
}
