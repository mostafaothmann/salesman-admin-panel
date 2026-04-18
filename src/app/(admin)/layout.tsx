"use client";

import React, { useEffect } from "react";
import "antd/dist/reset.css";
import { useSidebar } from "../../context/SidebarContext";
import AppSidebar from "../../layout/AppSidebar";
import Backdrop from "../../layout/Backdrop";
import AppHeader from "../../layout/AppHeader";
import { socket } from "../../socket/socket";
import NotificationProvider from "../../provider/NotificationProvider";
import RoleGuard from "../../hooks/useRoleGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "mr-0"
    : isExpanded || isHovered
      ? "sm:mr-[190px]"
      : "sm:mr-[90px]";

  return (
    <RoleGuard allowedRoles={["ADMIN", "ASSISTANT"]}>
      <div>
        <AppSidebar />
        <div className="min-h-screen xl:flex ">
          {/* Sidebar and Backdrop */}
          {/* Main Content Area */}
          <div
            className={`flex-1 flex-row-reverse transition-all duration-300 ease-in-out ${mainContentMargin}`}
          >
            {/* Header */}
            <AppHeader />
            <NotificationProvider>
              {/* Page Content */}
              <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                {children}</div>
            </NotificationProvider>
          </div>

        </div>
      </div>
    </RoleGuard>

  );
}
