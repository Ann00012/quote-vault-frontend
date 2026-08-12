"use client";

import React from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { useThemeStore } from "@/store/useThemeStore";
import styles from "./ShaderBackground.module.css";

interface ShaderBackgroundProps {
  children: React.ReactNode;
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const theme = useThemeStore((state) => state.theme);

  const isDark = theme === "dark";

  const colors = isDark
    ? ["#10131a", "#242033", "#172b35", "#30243b"]
    : ["#e8dfd3", "#c8d8d5", "#ddd2e8", "#f0e3cf"];

  return (
    <div className={`${styles.wrapper} ${isDark ? styles.dark : styles.light}`}>
      <MeshGradient
        colors={colors}
        distortion={1.2}
        swirl={0.6}
        speed={0.15}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      <div className={styles.overlay} />

      <div className={styles.content}>{children}</div>
    </div>
  );
}
