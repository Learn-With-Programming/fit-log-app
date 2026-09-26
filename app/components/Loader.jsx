export default function Loader({ text = "Loading workouts..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-24 gap-3 sm:gap-4">
      <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#2a2a2a] border-t-[#ccff00] rounded-full animate-spin" />
      <p className="text-gray-400 text-xs sm:text-sm">{text}</p>
    </div>
  );
}
