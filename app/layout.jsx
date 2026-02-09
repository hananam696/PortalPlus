import "./globals.css";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
