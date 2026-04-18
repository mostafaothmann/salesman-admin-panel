"use client";

import { EyeCloseIcon, EyeIcon } from "../../icons";
import { Button, Input, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useUserAuthStore } from "../../stores/authStores/auth.user.store";

export default function AdminSignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const {
    loginAdmin,
    loading,
    error,
    isAuthenticated,
    user,
  } = useUserAuthStore();

  // =========================
  // HANDLE LOGIN
  // =========================
  const logIn = async () => {
    if (!email || !password) {
      message.error("يرجى إدخال جميع الحقول");
      return;
    }

    await loginAdmin(email, password);
  };

  // =========================
  // SUCCESS REDIRECT
  // =========================
  useEffect(() => {
    if (isAuthenticated && user) {
      message.success("تم تسجيل الدخول بنجاح");

      router.push("/");
    }
  }, [isAuthenticated, user, router]);

  // =========================
  // ERROR HANDLING
  // =========================
  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5"></div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              تسجيل الدخول
            </h1>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              logIn();
            }}
          >
            <div className="space-y-6">
              {/* Email */}
              <div>
                <label>
                  البريد الإلكتروني <span className="text-error-500">*</span>
                </label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                />
              </div>

              {/* Password */}
              <div>
                <label>
                  كلمة المرور <span className="text-error-500">*</span>
                </label>

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer left-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                </div>
              </div>

              {/* Button */}
              <div>
                <Button
                  className="w-full"
                  loading={loading}
                  onClick={logIn}
                >
                  تسجيل الدخول
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}