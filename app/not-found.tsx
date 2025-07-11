"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
// import { AppSidebar } from "@/components/app-sidebar";
// import Header from "@/components/header";
// import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function NotFoundPage() {
  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 h-screen">
        <div className="flex flex-col items-center justify-center h-screen bg-white">
          <div className=" flex flex-col max-w-xl text-center gap-4">
            <Image
              src="/404.svg"
              alt="Erreur 404"
              width={2000}
              height={2000}
              priority
              className="2xl:h-[65vh] xl:h-[50vh] w-full object-fill"
            />
            <h1 className="mt-8 text-2xl font-bold text-gray-800">
              Oups, cette page n’existe pas
            </h1>
            <p className="mt-2 text-gray-600">
              Désolé, la page que vous cherchez n’existe pas ou a été déplacée.
            </p>
            <Button>
              <Link href="/" className="text-white">
                Retour à l’accueil
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
