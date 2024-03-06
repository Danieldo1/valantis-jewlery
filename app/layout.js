import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Valantis Jewelery",
  description:
    "Company ValantisJewelery presents the best quality of jewellery",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-stone-50 w-full h-full" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="mb-24">
          <Nav />
        </div>
        <main className="flex-1">{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
