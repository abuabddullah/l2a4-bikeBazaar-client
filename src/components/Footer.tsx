import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { SlSocialFacebook } from "react-icons/sl";
import { TfiInstagram, TfiLinkedin } from "react-icons/tfi";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">BikeBazaar</h3>
            <p className="text-sm">
              Your one-stop shop for premium bicycles and accessories.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="/#subscribe" className="hover:text-white">
                  Subscribe Info
                </a>
              </li>
              <li>
                <a href="/#partners" className="hover:text-white">
                  Partners
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/asifaowadud/"
                target="_blank"
                className="hover:text-white"
              >
                <SlSocialFacebook />
              </a>
              <a
                href="https://www.linkedin.com/in/asifaowadud"
                target="_blank"
                className="hover:text-white"
              >
                <TfiLinkedin />
              </a>
              <a
                href="https://github.com/abuabddullah"
                target="_blank"
                className="hover:text-white"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; 2024 BikeBazaar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
