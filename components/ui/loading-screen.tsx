import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type LoadingScreenProps = {
  title?: string;
  subtitle?: string;
  size?: "sm" | "md";
  className?: string;
  containerClassName?: string;
};

export function LoadingScreen({
  title = "Loading",
  subtitle = "Please wait a moment.",
  size = "md",
  className,
  containerClassName,
}: LoadingScreenProps) {
  const titleSize = size === "sm" ? "text-sm" : "text-base";
  const subtitleSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div
      className={cn(
        "flex min-h-[40vh] flex-col items-center justify-center gap-2 text-center text-muted-foreground",
        containerClassName,
      )}
    >
      <Spinner className={size === "sm" ? "size-4" : "size-6"} />
      <p className={cn("font-medium", titleSize, className)}>{title}</p>
      <p className={subtitleSize}>{subtitle}</p>
    </div>
  );
}
