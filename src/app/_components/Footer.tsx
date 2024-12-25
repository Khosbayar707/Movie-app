import { Mail } from "lucide-react";
import { Phone } from "lucide-react";

export function Footer() {
  return (
    <footer>
      <div className="w-full h-[280px] bg-indigo-700 box-border pt-4 text-white text-[14px]">
        <div className="w-[70%] mb-2 mx-auto">
          <img src="/assets/Logo (1).svg" alt="logo" className="m-4" />
          <p>© 2024 Movie Z. All Rights Reserved.</p>
        </div>
        <div className="flex justify-around">
          <div>
            <p className="box-border pt-4">Contact Information</p>
            <div className="box-border pt-2">
              <div className="flex gap-2">
                <Mail />
                <p>Email:</p>
              </div>
              <p>support@movieZ.com</p>
            </div>
            <div className="box-border pt-2">
              <div className="flex gap-2">
                <Phone />
                <p>Phone:</p>
              </div>
              <p>+976 (11) 123-4567</p>
            </div>
          </div>
          <div>
            <p className="p-4">Follow us</p>
            <div className="pl-4">
              <p className="mb-1">Facebook</p>
              <p className="mb-1">Instagram</p>
              <p className="mb-1">Twitter</p>
              <p className="mb-1">Youtube</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
