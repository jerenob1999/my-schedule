import Link from "next/link";

export default function Component() {
  return (
    <header className="inset-x-0 top-0 z-50  shadow-sm dark:bg-gray-950/90">
      <nav className="flex justify-between h-14 px-4 items-center">
        <Link
          href="/"
          className="text-primary hover:bg-secondary font-medium flex  text-decoration-line: none; items-center text-lg transition-colors rounded-lg px-8 py-2"
          prefetch={false}
        >
          My Schedule 📅
        </Link>
      </nav>
    </header>
  );
}
