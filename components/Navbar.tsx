import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-white font-semibold text-lg">
          My Navbar App
        </Link>
        <div className="md:hidden">
          {/* Mobile menu button */}
          <button className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex space-x-4">
          {/* Nav items */}
          <Link href="/" className="text-white">
            Home
          </Link>
          <Link href="/about" className="text-white">
            About
          </Link>
          <Link href="/contact" className="text-white">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
