import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "TODO App",
  description: "The TODO created for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
