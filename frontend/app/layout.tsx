import "@styles/tailwind.css";
import "@styles/app.scss";
import { AuthContextProvider } from "context/Auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
