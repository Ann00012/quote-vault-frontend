import css from "./loader.module.css";
import { useThemeStore } from "@/store/useThemeStore";

export default function Loader() {
  const theme = useThemeStore((state) => state.theme);

  return <span className={`${css.loader} ${css[theme]}`} />;
}
