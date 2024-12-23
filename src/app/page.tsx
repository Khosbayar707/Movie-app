"use client";
import Image from "next/image";
import { Roboto } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return <div className={`${roboto.className}`}>hi, page</div>;
}
