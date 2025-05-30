"use client";
import Footer from "./footer";
import MainMenu from "./menu";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <MainMenu />
            <main className="flex-grow mt-28">{children}</main>
            <Footer />
        </div >
    );
}
