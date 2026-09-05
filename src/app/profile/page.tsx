"use client";

import { useRef, ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateAvatar, requestResetEmail } from "@/services/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import toast from "react-hot-toast";
import css from "./page.module.css";

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const theme = useThemeStore((state) => state.theme);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: updateAvatar,
    onSuccess: (updatedData) => {
      updateUser({ avatar: updatedData.url });
    },
    onError: () => {
      toast.error("Failed to upload avatar");
    },
  });

  const resetEmailMutation = useMutation({
    mutationFn: requestResetEmail,
    onSuccess: (data) => {
      toast.success(data.message || "Reset link has been sent to your email!");
    },
    onError: () => {
      toast.error("Failed to send reset link");
    },
  });

  const handleRequestReset = () => {
    if (user?.email) {
      resetEmailMutation.mutate(user.email);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Max file size is 5MB");
      return;
    }

    mutation.mutate(file);
  };

  if (!user) {
    return (
      <main className={`${css.container} ${css[theme]}`}>
        <p>Please log in to view your profile.</p>
      </main>
    );
  }

  return (
    <main className={`${css.container} ${css[theme]}`}>
      <div className={css.card}>
        <h1 className={css.title}>My Profile</h1>

        {/* 1. Блок аватарки */}
        <div className={css.avatarBlock}>
          <div
            className={css.avatarPreviewWrapper}
            onClick={() => fileInputRef.current?.click()}
          >
            {user.avatar ? (
              <img src={user.avatar} alt="Avatar" className={css.avatarLarge} />
            ) : (
              <div className={css.avatarFallbackLarge}>
                {user.email?.[0].toUpperCase()}
              </div>
            )}
            <div className={css.avatarOverlay}>
              <span>Change</span>
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp"
            className={css.hiddenInput}
          />

          <button
            type="button"
            className={css.uploadBtn}
            onClick={() => fileInputRef.current?.click()}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Uploading..." : "Upload New Photo"}
          </button>
        </div>

        {/* 2. Блок даних користувача */}
        <div className={css.infoBlock}>
          <div className={css.infoRow}>
            <span className={css.infoLabel}>Email</span>
            <span className={css.infoValue}>{user.email}</span>
          </div>
          <div className={css.infoRow}>
            <span className={css.infoLabel}>Username</span>
            <span className={css.infoValue}>{user.username || "—"}</span>
          </div>
        </div>

        {/* 3. Блок безпеки (скидання пароля) — на своєму повноцінному місці */}
        <div className={css.securityBlock}>
          <h2 className={css.securityTitle}>Security</h2>
          <p className={css.securityDesc}>
            Need to change your password? We will send a secure link to your
            email.
          </p>
          <button
            type="button"
            onClick={handleRequestReset}
            className={css.resetBtn}
            disabled={resetEmailMutation.isPending}
          >
            {resetEmailMutation.isPending
              ? "Sending link..."
              : "Send Password Reset Link"}
          </button>
        </div>
      </div>
    </main>
  )
}