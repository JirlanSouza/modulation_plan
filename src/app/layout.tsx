import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "./components/Header";
import { SideBar } from "./components/SideBar";
import "./globals.css";

export const metadata: Metadata = {
    title: "Modulation",
    description: "Modulation monitore application",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-br">
            <body className={inter.className}>
                <Header />
                <div className="flex pt-14 bg-slate-50">
                    <SideBar />
                    <main className="flex flex-1 flex-col py-6 px-8 overflow-hidden">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
