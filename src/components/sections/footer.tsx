import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    name: "TikTok",
    href: "#",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3bc2f1b9-308d-4290-bf86-eedd256ada67-tailoredtutors-co-uk/assets/svgs/tiktok-footer-5.svg?",
  },
  {
    name: "Instagram",
    href: "#",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3bc2f1b9-308d-4290-bf86-eedd256ada67-tailoredtutors-co-uk/assets/svgs/insta-footer-6.svg?",
  },
  {
    name: "Facebook",
    href: "#",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3bc2f1b9-308d-4290-bf86-eedd256ada67-tailoredtutors-co-uk/assets/svgs/facebook-footer-7.svg?",
  },
  {
    name: "YouTube",
    href: "#",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3bc2f1b9-308d-4290-bf86-eedd256ada67-tailoredtutors-co-uk/assets/svgs/youtube-footer-8.svg?",
  },
  {
    name: "X",
    href: "#",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3bc2f1b9-308d-4290-bf86-eedd256ada67-tailoredtutors-co-uk/assets/svgs/x-twitter-footer-9.svg?",
  },
];

const websiteLinks = [
  { label: "A Level Biology", href: "/a-level-biology" },
  { label: "A Level Chemistry", href: "/a-level-chemistry" },
  { label: "A Level Maths", href: "/a-level-maths" },
  { label: "Pricing", href: "/pricing" },
];

const Footer = () => {
  return (
    <footer className="bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-y-12 gap-x-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-block">
              <span className="sr-only">Tutor Lab</span>
              {/* Text logo fallback to avoid broken external images */}
              <span className="text-2xl font-semibold tracking-tight text-primary">Tutor Lab</span>
            </Link>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              Get the grade. Start now.
            </p>
            <p className="mt-8 text-sm text-muted-foreground">
              © Tutor Lab {new Date().getFullYear()}
            </p>
            <div className="mt-6 flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="sr-only">{social.name}</span>
                  <Image
                    src={social.icon}
                    alt={`${social.name} icon`}
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </a>
              ))}
            </div>
            <div className="mt-8 flex items-center space-x-3 text-sm text-muted-foreground">
              <Link
                href="/terms-and-conditions"
                className="transition-colors hover:text-primary"
              >
                Terms of Service
              </Link>
              <span>•</span>
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Website</h3>
            <ul role="list" className="mt-6 space-y-3">
              {websiteLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Contact</h3>
            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Text</p>
                <p className="mt-1 text-base text-muted-foreground">
                  07427 815 973
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a
                  href="mailto:hello@tutorlab.com"
                  className="mt-1 block text-base text-primary transition-colors hover:text-primary"
                >
                  hello@tutorlab.com
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Hours</h3>
            <div className="mt-6">
              <div>
                <p className="text-sm text-gray-500">Office hours</p>
                <p className="mt-1 text-base text-muted-foreground">
                  Monday — Friday
                </p>
                <p className="mt-1 text-base text-muted-foreground">
                  9:00 AM — 5:00PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;