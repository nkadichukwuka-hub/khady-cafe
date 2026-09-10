import type { SVGProps } from "react";

/**
 * Line icon set. Draw on a 24×24 grid, 1.5px stroke, round caps and joins,
 * no fills. Color is inherited from `currentColor`. Keep the set small and
 * add new glyphs in the same style rather than importing an icon library.
 */
function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function BeanIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <ellipse cx="12" cy="12" rx="8" ry="9" transform="rotate(30 12 12)" />
      <path d="M8.5 6.5C11 9 11 15 8.5 17.5M15.5 6.5C13 9 13 15 15.5 17.5" />
    </Icon>
  );
}

export function LeafIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M20 4C10 4 4 10 4 20c10 0 16-6 16-16Z" />
      <path d="M4 20 14 10" />
    </Icon>
  );
}

export function CupIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M5 8h11v7a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8Z" />
      <path d="M16 10h2.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8 3c-.6 1 .6 2 0 3M12 3c-.6 1 .6 2 0 3" />
    </Icon>
  );
}

export function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M12 20s-7-4.35-9.33-8.5C1 8 3 4.5 6.5 4.5 9 4.5 12 7 12 7s3-2.5 5.5-2.5C21 4.5 23 8 21.33 11.5 19 15.65 12 20 12 20Z" />
    </Icon>
  );
}

export function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.5l3.5 2" />
    </Icon>
  );
}

export function PinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M12 21s6.5-6 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5 6.5 11 6.5 11Z" />
      <circle cx="12" cy="10" r="2.25" />
    </Icon>
  );
}

export function MicIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="9" y="2.5" width="6" height="11" rx="3" />
      <path d="M6 11a6 6 0 0 0 12 0" />
      <path d="M12 17v4M9 21h6" />
    </Icon>
  );
}

export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </Icon>
  );
}

export function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icon>
  );
}
