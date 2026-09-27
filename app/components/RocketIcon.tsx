type RocketIconProps = {
  size?: number;
  className?: string;
  /* In grid units (24px box). Drawn large, 2 turns into a very heavy line. */
  strokeWidth?: number;
};

/*
  Line rocket pointing straight up, drawn in currentColor on a 24px grid so it
  sits with the other line icons (process steps, socials). Shared by the
  PROCESS "Spustíme" step, the scroll-to-top button and the 404 page.
*/
export default function RocketIcon({
  size = 24,
  className,
  strokeWidth = 2,
}: RocketIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* body */}
      <path d="M12 2.5c2.9 2.3 4.4 5.6 4.4 9.6V17H7.6v-4.9c0-4 1.5-7.3 4.4-9.6z" />
      {/* porthole */}
      <circle cx="12" cy="9.6" r="1.7" />
      {/* fins */}
      <path d="M7.6 12.6 5 15.4V19l2.6-2" />
      <path d="M16.4 12.6 19 15.4V19l-2.6-2" />
      {/* exhaust */}
      <path d="M10.3 19.6c.3 1 .9 1.6 1.7 1.9.8-.3 1.4-.9 1.7-1.9" />
    </svg>
  );
}
