import { useThemeStore } from "@/store/useThemeStore";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  text: string;
  onChange: (value: string) => void;
}
export default function SearchBar({ text, onChange }: SearchBarProps) {
  const theme = useThemeStore((state) => state.theme);
  return (
    <input
      className={`${css.input} ${css[theme]}`}
      type="text"
      placeholder="Search..."
      value={text}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        onChange(event.target.value)
      }
    />
  );
}
