function GoogleButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] text-sm font-medium text-gray-200 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200"
    >
      {/* Google Icon */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.805 12.23C21.805 11.52 21.745 10.82 21.615 10.15H12V14.09H17.425C17.19 15.36 16.45 16.45 15.32 17.18V19.77H18.62C20.55 17.99 21.805 15.36 21.805 12.23Z"
          fill="#4285F4"
        />

        <path
          d="M12 22C14.76 22 17.075 21.09 18.62 19.77L15.32 17.18C14.41 17.79 13.255 18.16 12 18.16C9.335 18.16 7.075 16.36 6.27 13.94H2.86V16.61C4.4 19.82 7.735 22 12 22Z"
          fill="#34A853"
        />

        <path
          d="M6.27 13.94C6.065 13.33 5.95 12.68 5.95 12C5.95 11.32 6.065 10.67 6.27 10.06V7.39H2.86C2.29 8.52 2 9.79 2 12C2 14.21 2.29 15.48 2.86 16.61L6.27 13.94Z"
          fill="#FBBC05"
        />

        <path
          d="M12 5.84C13.5 5.84 14.84 6.35 15.9 7.35L18.695 4.555C17.07 3.04 14.75 2 12 2C7.735 2 4.4 4.18 2.86 7.39L6.27 10.06C7.075 7.64 9.335 5.84 12 5.84Z"
          fill="#EA4335"
        />
      </svg>

      Continue with Google
    </button>
  );
}

export default GoogleButton;