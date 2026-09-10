import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  /** `content` = 1240px page width, `prose` = ~66ch reading measure. */
  width?: "content" | "prose";
  as?: ElementType;
  className?: string;
};

/**
 * Horizontal frame for page content. Owns the side gutter (min 24px) so nothing
 * else needs to. Never nest a Container in a Container.
 */
export function Container({
  children,
  width = "content",
  as: Tag = "div",
  className,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-gutter",
        width === "content" ? "max-w-content" : "max-w-prose",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
