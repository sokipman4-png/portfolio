import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle({ dark, onToggle }) {
  return (
    <Button
      size="icon"
      variant="outline"
      aria-label="Ganti tema"
      onClick={onToggle}
      className="h-9 w-9"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
