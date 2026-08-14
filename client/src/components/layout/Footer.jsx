const footerLinks = {
  Product: [
    "Features",
    "How It Works",
    "Analytics",
  ],
  Platform: [
    "AI Planning",
    "Adaptive Learning",
    "Exam Readiness",
  ],
  Company: [
    "About",
    "Contact",
    "Privacy",
  ],
};

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/20">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Main Footer */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">

            <a
              href="/"
              className="text-2xl font-extrabold tracking-tight text-white"
            >
              Prep<span className="text-purple-400">Wise</span>
            </a>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
              Your AI-powered study companion for personalized planning,
              adaptive learning, and exam readiness.
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-6">

              <a
                href="#"
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-sm text-gray-500 hover:text-white hover:border-purple-500/30 transition"
              >
                GH
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-sm text-gray-500 hover:text-white hover:border-purple-500/30 transition"
              >
                in
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-sm text-gray-500 hover:text-white hover:border-purple-500/30 transition"
              >
                X
              </a>

            </div>

          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>

              <h3 className="text-sm font-semibold text-white">
                {title}
              </h3>

              <ul className="mt-5 space-y-3">

                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={
                        link === "Features"
                          ? "#features"
                          : link === "How It Works"
                          ? "#how-it-works"
                          : link === "Analytics"
                          ? "#analytics"
                          : "#"
                      }
                      className="text-sm text-gray-500 hover:text-gray-300 transition"
                    >
                      {link}
                    </a>
                  </li>
                ))}

              </ul>

            </div>
          ))}

        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-xs text-gray-600">
            © 2026 PrepWise. All rights reserved.
          </p>

          <p className="text-xs text-gray-600">
            Built with <span className="text-purple-400">✦</span> for smarter learning.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;