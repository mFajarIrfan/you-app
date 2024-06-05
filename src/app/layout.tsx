import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/toast/context/toastContext";
import Toast from "@/components/toast/Toast";
import { AuthProvider } from "@/components/routes/provider/AuthProvider";

export const metadata: Metadata = {
  title: "YouApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen min-h-screen bg-theme px-4 py-6 overscroll-none">
        <AuthProvider>
          <ToastProvider>
            <Toast />
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
