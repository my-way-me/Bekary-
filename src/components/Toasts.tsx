interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

export default function Toasts({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed bottom-5 right-5 z-[80] flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg text-white text-xs font-medium animate-fade-in-up ${
            t.type === "success"
              ? "bg-gray-900 border-l-4 border-rose-500"
              : "bg-rose-600"
          }`}
        >
          <span className="text-base">{t.type === "success" ? "🧁" : "⚠️"}</span>
          <p className="flex-1">{t.message}</p>
        </div>
      ))}
    </div>
  );
}
