"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetPassword, logoutUser } from "@/services/api";
import { useThemeStore } from "@/store/useThemeStore";
import toast from "react-hot-toast";
import css from "./resetPassword.module.css";
import { useAuthStore } from "@/store/useAuthStore";

function EyeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const theme = useThemeStore((state) => state.theme);
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore(
    (state: any) => state.clearAuth || state.logout,
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formError, setFormError] = useState("");

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: async (data) => {
      try {
        await logoutUser();

        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        if (typeof clearAuth === "function") {
          clearAuth();
        }

        queryClient.clear();

        toast.success(
          data?.message ||
            "Password updated. Please log in with your new password.",
        );

        router.push("/login");
        router.refresh();
      } catch (err) {
        console.error("Error during auto-logout:", err);
        router.push("/login");
      }
    },
    onError: (error: any) => {
      const msg =
        error.response?.data?.message || "Token is invalid or expired";
      setFormError(msg);
      toast.error(msg);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!token) {
      setFormError("Reset token is missing or invalid.");
      return;
    }

    if (password.length < 6) {
      setFormError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match. Please re-check.");
      return;
    }

    mutation.mutate({ token, password });
  };

  if (!token) {
    return (
      <main className={`${css.container} ${css[theme]}`}>
        <div className={css.card}>
          <h1 className={css.title}>Invalid Link</h1>
          <p className={css.subtitle}>
            The reset token is missing or has expired. Please request a new
            link.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className={`${css.container} ${css[theme]}`}>
      <div className={css.card}>
        <h1 className={css.title}>Set New Password</h1>
        <p className={css.subtitle}>
          Enter and confirm your new password below.
        </p>

        <form onSubmit={handleSubmit} className={css.form} noValidate>
          <div className={css.field}>
            <label className={css.label} htmlFor="new-password">
              New Password
            </label>
            <div className={css.inputWrapper}>
              <input
                id="new-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (formError) setFormError("");
                }}
                placeholder="••••••••"
                required
                className={`${css.input} ${formError ? css.inputError : ""}`}
              />
              <button
                type="button"
                className={css.toggleBtn}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>
          <div className={css.field}>
            <label className={css.label} htmlFor="confirm-password">
              Confirm Password
            </label>
            <div className={css.inputWrapper}>
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (formError) setFormError("");
                }}
                placeholder="••••••••"
                required
                className={`${css.input} ${formError ? css.inputError : ""}`}
              />
              <button
                type="button"
                className={css.toggleBtn}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {formError && <div className={css.errorMessage}>{formError}</div>}

          <button
            type="submit"
            disabled={mutation.isPending}
            className={css.submitBtn}
          >
            {mutation.isPending ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
