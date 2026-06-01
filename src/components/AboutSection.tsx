export default function AboutSection() {
  const feats = [
    "১০০% খাঁটি ও তাজা উপাদান",
    "স্বাস্থ্যসম্মত ও হালাল পরিবেশ",
    "দক্ষ হোম বেকার",
    "দ্রুত ডোরস্টেপ ডেলিভারি",
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="flex flex-col gap-4 mt-8">
              <div className="rounded-2xl overflow-hidden shadow-md aspect-square">
                <img
                  src="https://images.pexels.com/photos/3983571/pexels-photo-3983571.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Baking"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
                <img
                  src="https://images.pexels.com/photos/19498995/pexels-photo-19498995.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Cake"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
                <img
                  src="https://images.pexels.com/photos/3983580/pexels-photo-3983580.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Cake"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md aspect-square">
                <img
                  src="https://images.pexels.com/photos/8478055/pexels-photo-8478055.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Cake"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur p-5 rounded-full shadow-xl text-center w-32 h-32 flex flex-col items-center justify-center border-2 border-rose-100">
              <span className="text-xl font-bold text-rose-600">২৪/৭</span>
              <span className="text-[10px] font-bold text-gray-800">সেবায় নিবেদিত</span>
            </div>
          </div>
          <div>
            <span className="text-rose-500 font-script text-xl font-bold">Our Story</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1 mb-5">
              আমাদের গল্প ও অঙ্গীকার
            </h2>
            <p className="text-gray-600 leading-relaxed mb-7">
              কুমিল্লার হাট বলি বাড়িতে অবস্থিত &quot;বেক আর্ট স্টাইল&quot; — তাজা উপাদান ও
              পরিচ্ছন্ন পরিবেশে তৈরি প্রতিটি কেক। ডেলিভারি সার্ভিসে পৌঁছে দিই স্বাদ আপনার
              দরজায়।
            </p>
            <div className="flex flex-col gap-4">
              {feats.map((f, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs flex-shrink-0">
                    ✓
                  </span>
                  <span className="font-bold text-sm text-gray-900">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
