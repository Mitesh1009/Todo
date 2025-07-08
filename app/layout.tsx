import type React from "react";
import type { Metadata } from "next";
import { Provider } from "react-redux";
import { Inter } from "next/font/google";
import Header from "./_components/header/Header";
import { store } from "./_store";

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
          <Provider store={store}>
            <Header />
            <main>{children}</main>
          </Provider>
        </>
      </body>
    </html>
  );
}
