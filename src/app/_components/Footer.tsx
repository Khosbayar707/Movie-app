import { Mail, Phone } from "lucide-react";

const socials = ["Facebook", "Instagram", "Twitter", "Youtube"];

export function Footer() {
  return (
    <footer className="mt-auto bg-footer text-footer-foreground">
      <div className="page-container grid gap-10 py-12 text-sm md:grid-cols-[1fr_auto_auto] md:gap-16 lg:py-14">
        <div className="space-y-4">
          <img src="/assets/Logo (1).svg" alt="Movie Z" width={93} height={20} className="h-5 w-auto" />
          <p className="text-footer-muted">© 2024 Movie Z. All Rights Reserved.</p>
          <p className="max-w-xs text-xs leading-relaxed text-footer-muted">
            Movie data and images from TMDB. This product uses the TMDB API but is not
            endorsed or certified by TMDB.
          </p>
        </div>

        <div>
          <h2 className="mb-4 font-semibold">Contact Information</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              <div>
                <p className="text-footer-muted">Email</p>
                <a href="mailto:support@movieZ.com" className="font-medium underline-offset-4 hover:underline">
                  support@movieZ.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              <div>
                <p className="text-footer-muted">Phone</p>
                <a href="tel:+976111234567" className="font-medium tabular-nums underline-offset-4 hover:underline">
                  +976 (11) 123-4567
                </a>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-semibold">Follow us</h2>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 md:flex-col">
            {socials.map((name) => (
              <li key={name} className="text-footer-muted">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
