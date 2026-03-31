import "./globals.css";
import Navbar from "../components/Navbar";
import ChatWrapper from "../components/ChatWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white-50">
        <ChatWrapper>
          {children}
        </ChatWrapper>
      </body>
    </html>
  );
}