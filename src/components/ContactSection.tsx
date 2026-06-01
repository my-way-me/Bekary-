import { useState } from "react";
import { waLink } from "@/lib/utils";

export default function ContactSection({
  showToast,
}: {
  showToast: (msg: string, type?: "success" | "error") => void;
}) {
  const [f, setF] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!f.name || !f.phone) {
      showToast("নাম ও ফোন নম্বর দিন!", "error");
      return;
    }
    const waMsg = `নতুন বার্তা — ${f.name} (${f.phone}): ${f.message || "কোনো বার্তা নেই"}`;
    window.open(waLink(waMsg), "_blank");
    setSent(true);
    showToast("WhatsApp এ বার্তা পাঠানো হচ্ছে!");
    setTimeout(() => {
      setSent(false);
      setF({ name: "", phone: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <span className="text-rose-500 font-script text-xl font-bold">Get in Touch</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1 mb-5">
              আমাদের সাথে যোগাযোগ
            </h2>
            <div className="flex flex-col gap-5">
              <div className="flex gap-3 items-start">
                <span className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center">
                  📍
                </span>
                <div>
                  <h4 className="font-bold text-sm">ঠিকানা</h4>
                  <p className="text-xs text-gray-500">হাট বলি বাড়ি, কুমিল্লা, বাংলাদেশ</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center">
                  📞
                </span>
                <div>
                  <h4 className="font-bold text-sm">হটলাইন</h4>
                  <a
                    href="tel:+8801764411168"
                    className="text-xs text-gray-500 font-mono hover:text-rose-600"
                  >
                    +880 1764-411168
                  </a>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center">
                  💬
                </span>
                <div>
                  <h4 className="font-bold text-sm">WhatsApp</h4>
                  <a
                    href="https://wa.me/8801764411168"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-gray-500 font-mono hover:text-rose-600"
                  >
                    +880 1764-411168
                  </a>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center">
                  ⏰
                </span>
                <div>
                  <h4 className="font-bold text-sm">সেবার সময়</h4>
                  <p className="text-xs text-gray-500">Always Open — ২৪/৭ অর্ডার গ্রহণ</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 bg-rose-50/40 p-7 rounded-3xl border border-rose-100">
            {sent ? (
              <div className="text-center py-10">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-lg font-bold">ধন্যবাদ!</h3>
                <p className="text-xs text-gray-500 mt-1">
                  আপনার বার্তা WhatsApp এ পাঠানো হচ্ছে।
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-4">
                <h3 className="text-base font-bold">
                  💬 সরাসরি WhatsApp এ বার্তা পাঠান
                </h3>
                <input
                  type="text"
                  required
                  placeholder="আপনার নাম *"
                  value={f.name}
                  onChange={(ev) => setF({ ...f, name: ev.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:border-rose-500 outline-none text-sm bg-white"
                />
                <input
                  type="tel"
                  required
                  placeholder="ফোন নম্বর *"
                  value={f.phone}
                  onChange={(ev) => setF({ ...f, phone: ev.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:border-rose-500 outline-none text-sm bg-white"
                />
                <textarea
                  rows={3}
                  placeholder="আপনার বার্তা বা জিজ্ঞাসা..."
                  value={f.message}
                  onChange={(ev) => setF({ ...f, message: ev.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:border-rose-500 outline-none text-sm bg-white resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  💬 WhatsApp এ পাঠান
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
