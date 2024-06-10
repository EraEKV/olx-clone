import Image from "next/image";
import Header from "./components/layout/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-[90%] max-w-[1200px] mx-auto">
      <Header />
    </main>
  );
}
