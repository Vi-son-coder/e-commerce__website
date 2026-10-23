export default function NotificationModule({ message }) {
  return (
    <div className="fixed top-0 left-159 h-full flex items-center justify-center pointer-events-none">
      <div className="flex p-3 rounded-2xl bg-[#03030381] text-white flex-col items-center justify-center">
        {message}
      </div>
    </div>
  );
}
