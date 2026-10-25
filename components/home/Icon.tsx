export default function Icon({
  kind = "arrow",
  className,
}: {
  kind?: string;
  className?: string;
}) {
  const paths: Record<string, React.ReactNode> = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    code: (
      <>
        <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18" />
      </>
    ),
    design: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M4 10h16M10 10v10" />
      </>
    ),
    search: (
      <>
        <circle cx="10" cy="10" r="6" />
        <path d="m15 15 5 5M7 10h6m-3-3v6" />
      </>
    ),
    connect: (
      <>
        <rect x="3" y="3" width="6" height="6" rx="1" />
        <rect x="15" y="15" width="6" height="6" rx="1" />
        <path d="M6 9v9h9m-3-12h6v6" />
      </>
    ),
    speed: (
      <>
        <path d="M4 18a9 9 0 1 1 16 0M12 13l5-5" />
        <circle cx="12" cy="13" r="1" />
      </>
    ),
    support: (
      <>
        <path d="M4 13v-1a8 8 0 0 1 16 0v5a3 3 0 0 1-3 3h-3" />
        <rect x="3" y="11" width="4" height="7" rx="2" />
        <rect x="17" y="11" width="4" height="7" rx="2" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
  };
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[kind] || paths.arrow}
    </svg>
  );
}
