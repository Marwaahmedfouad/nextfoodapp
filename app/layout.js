import MainHeader from "../components/main-header/mainHeader";
import "./globals.css";
export const metadata = {
  title: "CulinaryConnect",
  description:
    "Where passionate food enthusiasts share their culinary masterpieces",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
