import Link from "next/link";

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-extrabold transition active:scale-[0.98]";

  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-soft",
    secondary: "bg-white border text-slate-900 hover:bg-slate-50 shadow-soft",
    ghost: "text-slate-700 hover:text-slate-900 hover:bg-slate-100",
  };

  if (href) {
    return (
      <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}