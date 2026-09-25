import Link from "next/link";
import { LottieAnimation } from "@/components/LottieAnimation";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center pt-32 pb-24">
        <div className="w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
            {/* 
                TODO: PASTE THE FULL LINK FROM YOUR LOTTIEFILES HERE 
                Replace the URL below with the one from your screenshot/dashboard 
            */}
            <LottieAnimation src="https://lottie.host/793c5a82-43ab-43ff-88e1-b1c1f1cdfc73/cOHKnOnPw4.lottie" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-outfit)]">
            Page Not Found
        </h1>
        <p className="text-dim-gray dark:text-silver max-w-md mb-8">
            Oops! It seems like the page you are looking for has been moved or doesn't exist.
        </p>

        <Link 
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-rich-black text-white-smoke dark:bg-white-smoke dark:text-rich-black font-semibold hover:opacity-90 transition-opacity"
        >
            <ArrowLeft size={20} />
            Back Home
        </Link>
    </div>
  );
}
