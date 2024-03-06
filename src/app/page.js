import CustomButton from "@/components/CustomButton";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24 bg-slate-950">
      <Link href='/signin'>
        <CustomButton className="mr-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 hover:text-white">Sign in</CustomButton>
      </Link>
      <Link href='/signup'>
        <CustomButton className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-indigo-500 hover:to-yellow-300 hover:text-white">Sign up</CustomButton>
      </Link>
    </main>
  );
}
