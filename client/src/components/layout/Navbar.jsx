import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#070711]/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="relative text-2xl font-extrabold tracking-tight text-white"
                >
                    <span className="absolute -inset-2 bg-purple-500/10 blur-xl rounded-full" />

                    <span className="relative">
                        Prep<span className="text-purple-400">Wise</span>
                    </span>
                </Link>

                {/* Navigation */}
                <div className="hidden md:flex items-center gap-8">

                    <a
                        href="#features"
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Features
                    </a>

                    <a
                        href="#how-it-works"
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        How It Works
                    </a>

                    <a
                        href="#analytics"
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Analytics
                    </a>

                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">

                    {/* Login */}
                    <Link
                        to="/login"
                        className="hidden sm:block text-sm text-gray-300 hover:text-white transition-colors"
                    >
                        Login
                    </Link>

                    {/* Get Started */}
                    <Link
                        to="/register"
                        className="px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors"
                    >
                        Get Started
                    </Link>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;