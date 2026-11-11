
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.rebamovies.com"),

  title: {
    default: "AFRISCENE | African Movies & Cinema",
    template: "%s | AFRISCENE",
  },

  description:
    "Discover African movies, films, stories and entertainment on AFRISCENE. Explore African cinema and connect with filmmakers.",

  applicationName: "AFRISCENE",

  keywords: [
    "AFRISCENE",
    "African movies",
    "African cinema",
    "Rwandan movies",
    "African films",
    "African entertainment",
    "Watch African movies",
  ],

  openGraph: {
    title: "AFRISCENE | African Stories, Global Experiences",
    description:
      "Discover and experience African cinema on AFRISCENE.",
    url: "https://www.rebamovies.com",
    siteName: "AFRISCENE",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "AFRISCENE",
    description:
      "Discover African cinema and unforgettable stories.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090909",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
