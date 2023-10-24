import Link from "next/link";
import Logo from "./Logo";
import ManageAccountButton from "./ManageAccountButton";

function Footer() {
  return (
    <footer className="relative bottom-0 z-[100] bg-transparent">
      <nav className="flex flex-col sm:flex-row items-center p-5 pl-2  max-w-7xl mx-auto">
        <div className="text-center">
          <Logo />
          <p className="font-extralight text-sm opacity-40">
            © Ryan Bakker 2023
          </p>
        </div>

        <div className="flex-1 flex items-center justify-end space-x-4">
          <ul className="flex gap-12">
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <Link href="/chat">Messages</Link>
            <li>
              <ManageAccountButton />
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
