import React from "react";

export default function Landing() {
  return (
    <section
      className="relative flex px-10 md:px-24 py-20 text-amber-50 items-center justify-between min-h-screen w-full
      bg-[url('/antekante-giraffe-2233366_1920.jpg')] bg-cover bg-center bg-no-repeat"
    >
      {/* Dark overlay so text is always readable over any image */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Everything sits above the overlay */}
      <div className="relative z-10 flex items-center justify-between w-full gap-10 flex-col md:flex-row">
        {/* Left — hero text */}
        <div className="flex-1">
          <p className="uppercase text-amber-400 tracking-widest text-sm font-semibold mb-3">
            Official · Durban.Gov
          </p>
          <h1 className="uppercase font-extrabold text-5xl md:text-6xl leading-tight mb-6">
            Take Care <br /> Of Your City
          </h1>
          <p className="text-white/70 text-lg max-w-sm">
            Report municipal issues directly to the city. We respond within 48
            hours.
          </p>
        </div>

        {/* Right — report form */}
        <form className="relative z-10 shadow-xl shadow-black/40 py-6 px-5 rounded-xl flex w-full md:w-[420px] bg-white flex-col gap-3">
          <div className="border-b-2 border-amber-400 pb-3 mb-1">
            <p className="font-bold text-2xl text-gray-900">Report an Issue</p>
            <p className="text-gray-400 text-sm mt-1">
              Let us know what needs fixing
            </p>
          </div>

          {/* Name + Email row */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Your Name"
              className="bg-gray-100 text-gray-800 text-sm rounded-md px-3 py-2 flex-1 outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-gray-100 text-gray-800 text-sm rounded-md px-3 py-2 flex-1 outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
          </div>

          {/* Area */}
          <input
            type="text"
            placeholder="Your area / suburb"
            className="bg-gray-100 text-gray-800 text-sm rounded-md px-3 py-2 w-full outline-none focus:ring-2 focus:ring-amber-400 transition"
          />

          {/* Service type — dropdown is better UX than a text input */}
          <select className="bg-gray-100 text-gray-500 text-sm rounded-md px-3 py-2 w-full outline-none focus:ring-2 focus:ring-amber-400 transition">
            <option value="">Select a service</option>
            <option value="water">Water & Sanitation</option>
            <option value="roads">Roads & Potholes</option>
            <option value="electricity">Electricity</option>
            <option value="waste">Waste Collection</option>
            <option value="other">Other</option>
          </select>

          {/* Description */}
          <textarea
            placeholder="Describe the issue..."
            rows={4}
            className="bg-gray-100 text-gray-800 text-sm rounded-md px-3 py-2 w-full outline-none focus:ring-2 focus:ring-amber-400 transition resize-none"
          />

          <button
            type="submit"
            className="w-full font-semibold bg-amber-500 hover:bg-amber-400 active:scale-95 text-white py-2.5 rounded-md transition-all duration-300"
          >
            Submit Report
          </button>
        </form>
      </div>
    </section>
  );
}
