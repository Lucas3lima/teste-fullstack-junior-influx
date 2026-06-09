import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme() || {}

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      richColors
      icons={{
        success: (
          <CircleCheckIcon className="size-4 text-emerald-600" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4 text-red-600" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)"
        }
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast border",
          success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
          error: "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300",
        },
      }}
      {...props} />
  );
}

export { Toaster }
