export default function Footer() {
  return (
    <footer className="mt-auto py-8 text-center text-gray-600 dark:text-gray-400">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          Built with ❤️ using Next.js, Tailwind CSS & Supabase
        </p>
        <p className="text-xs mt-2">
          © {new Date().getFullYear()} Before & After. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

