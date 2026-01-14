import useDarkMode from 'use-dark-mode';
import { useIsClient } from '@/lib/use-is-client';
import Link from 'next/link';
import { HiOutlineSun } from 'react-icons/hi';
import { HiMoon } from 'react-icons/hi';

export default function Header() {
  return (
    <header className="nav">
      <div className="flex justify-between items-center w-full p-8 my-0 md:my-8 mx-auto max-w-4xl">
        <DarkModeToggle />

        <nav className="flex items-center">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/cv">CV</NavItem>
          <NavItem href="/posts">Posts</NavItem>
          <NavItem href="/graphics">Graphics</NavItem>
        </nav>
      </div>
    </header>
  );
}

function DarkModeToggle() {
  const darkMode = useDarkMode();
  const isClient = useIsClient();

  const iconClasses = 'w-5 h-5 inline-block';

  if (isClient) {
    return (
      <button
        className="inline-flex p-2 ml-2 md:ml-4 hover:bg-gray-200 dark-hover:bg-gray-700"
        onClick={darkMode.toggle}
        aria-label="Toggle light and dark mode"
      >
        {darkMode.value ? <HiOutlineSun className={iconClasses} /> : <HiMoon className={iconClasses} />}
      </button>
    );
  }

  return <span className="p-2 ml-2">...</span>;
}

function NavItem({ href, children }) {
  return (
    <Link href={href}>
      <a className="p-2 hover:bg-gray-200 dark-hover:bg-gray-700 ml-2 md:ml-4">{children}</a>
    </Link>
  );
}
