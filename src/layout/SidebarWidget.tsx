import React from "react";

export default function SidebarWidget() {
  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]`}
    >
      <h3 className="mb-2 font-semibold  dark:text-white text-[#01B9B0] ">
        منتج آمن من الطبيعة
      </h3>

      {/*    <a
        href="https://EmaarAdmin.com/pricing"
        target="_blank"
        rel="nofollow"
        className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-brand-500 text-theme-sm hover:bg-brand-600"
      >
       See Website 
      </a> */}
    </div>
  );
}
