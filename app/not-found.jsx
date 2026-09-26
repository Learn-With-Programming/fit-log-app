import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 sm:py-32 text-center">
      <h1 className="font-display font-bold text-6xl sm:text-7xl text-[#ccff00]">
        404
      </h1>
      <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase mt-4">
        Page Not Found
      </h2>
      <p className="text-gray-500 mt-3 text-sm sm:text-base px-4">
        The page your looking for do not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block bg-[#ccff00] text-black font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full mt-6 sm:mt-8 hover:bg-[#b8e600] transition text-sm sm:text-base"
      >
        Back to Home
      </Link>
    </div>
  );
}
