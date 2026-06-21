/**
 * Site footer with responsible AI disclaimer.
 */
export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container-app py-8">
        <p className="text-center text-sm text-slate-600">
          &copy; {new Date().getFullYear()} ClearPath. Built for educational benefit discovery.
        </p>
        <p className="mt-2 text-center text-xs text-slate-500">
          Results are informational only and do not guarantee eligibility.
        </p>
      </div>
    </footer>
  );
}
