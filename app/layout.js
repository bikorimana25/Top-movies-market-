
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.rebamovies.com"),

  title: {
    default: "REBA MOVIES | African Cinema, Your Way",
    template: "%s | REBA MOVIES",
  },

  description:
    "Discover African cinema on REBA MOVIES. Explore amazing African movies, discover new stories, and enjoy entertainment made for you.",

  applicationName: "REBA MOVIES",

  keywords: [
    "REBA MOVIES",
    "African movies",
    "African cinema",
    "Rwandan movies",
    "African entertainment",
    "watch African films",
    "African filmmakers",
  ],

  openGraph: {
    title: "REBA MOVIES — Stories Without Borders",
    description:
      "Discover African cinema, explore powerful stories, and celebrate African entertainment.",
    url: "https://www.rebamovies.com",
    siteName: "REBA MOVIES",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "REBA MOVIES | African Cinema",
    description:
      "Discover African movies, new stories, and unforgettable entertainment.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080812",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
