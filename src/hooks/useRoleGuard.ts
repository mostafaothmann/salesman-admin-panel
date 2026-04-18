"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserAuthStore } from "../stores/authStores/auth.user.store";

export default function RoleGuard({ children, allowedRoles }) {
  const router = useRouter();
  const { user, isAuthenticated } = useUserAuthStore();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/signin");
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      router.push("/not-authorized");
      return;
    }

    setAllowed(true);
  }, [user, isAuthenticated]);

  if (!allowed) return null;

  return children;
}