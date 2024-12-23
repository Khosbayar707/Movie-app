import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
import { Roboto } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export function Footer() {
  return (
    <footer className={`${roboto.className}`}>
      <div className="w-full h-[280px] bg-indigo-700 box-border p-[40px] text-white flex justify-around">
        <div>
          <img
            src="/assets/Logo.png"
            alt="logo"
            className="w-[92px] h-[20px]"
          />
          <p>© 2024 Movie Z. All Rights Reserved.</p>
        </div>
        <div className="flex gap-8">
          <div>
            <p>Contact Information</p>
            <div>
              <div className="flex gap-3">
                <Mail />
                <p>Email:</p>
              </div>

              <p>support@movieZ.com</p>
            </div>
            <div>
              <div className="flex gap-3">
                <Phone />
                <p>Phone:</p>
              </div>

              <p>+976 (11) 123-4567</p>
            </div>
          </div>
          <div className="flex gap-5">
            Follow us
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
            <p>Youtube</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
