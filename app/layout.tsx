import type React from "react";
import type { Metadata } from "next";
import { Provider } from "react-redux";
import { Inter } from "next/font/google";
import Header from "./_components/header/Header";
import { store } from "./_store";
import ReduxProvider from "./_components/reduxProvider/reduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Test",
  description: "Test project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <>
          <ReduxProvider>
            <Header />
            <main>{children}</main>
          </ReduxProvider>
        </>
      </body>
    </html>
  );
}
