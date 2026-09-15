import clsx from "clsx";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) => {
  const baseStyles =
    "font-sans font-bold rounded-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-pink-400 transform hover:-translate-y-0.5";

  const variants = {
    primary:
      "bg-black text-pink-400 border border-pink-400/40 shadow-[0_0_0_1px_rgba(236,72,153,0.5),0_0_20px_rgba(236,72,153,0.3),inset_0_0_12px_rgba(236,72,153,0.15)] hover:bg-purple-950 hover:text-pink-300 hover:border-pink-300 hover:shadow-[0_0_0_1px_rgba(236,72,153,0.6),0_0_24px_rgba(236,72,153,0.4),inset_0_0_16px_rgba(236,72,153,0.2)] active:translate-y-0",
    secondary:
      "bg-black/80 text-pink-400 border border-pink-400/40 hover:bg-purple-950/30 hover:border-pink-300 shadow-[inset_0_0_12px_rgba(236,72,153,0.08),0_0_12px_rgba(236,72,153,0.12)]",
    ghost:
      "text-pink-400 hover:text-pink-300 hover:bg-purple-950/20 border-none",
    danger:
      "bg-black text-red-500 border border-red-500/40 shadow-[0_0_0_1px_rgba(255,0,0,0.4),0_0_16px_rgba(255,0,0,0.2)] hover:text-red-400 hover:border-red-400 active:translate-y-0",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export const Input = ({ className, ...props }) => {
  return (
    <input
      className={clsx(
        "w-full px-4 py-2.5 bg-black/95 border border-pink-400/25 rounded-none text-pink-400 placeholder-purple-700 transition-all focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-400/30 font-sans shadow-[inset_0_0_8px_rgba(236,72,153,0.05),0_0_12px_rgba(236,72,153,0.08)]",
        className,
      )}
      {...props}
    />
  );
};

export const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={clsx(
        "rounded-none border border-pink-400/25 bg-black/75 p-4 shadow-soft backdrop-blur-0 transition-all hover:border-pink-300/40 hover:shadow-[inset_0_0_16px_rgba(236,72,153,0.1),0_0_24px_rgba(236,72,153,0.12),0_0_40px_rgba(236,72,153,0.08)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const Badge = ({ children, variant = "default", className }) => {
  const variants = {
    default: "bg-slate-800 text-slate-200",
    success: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20",
    warning: "bg-amber-500/15 text-amber-300 border border-amber-500/20",
    error: "bg-red-500/15 text-red-300 border border-red-500/20",
    blue: "bg-sky-500/15 text-sky-300 border border-sky-500/20",
  };

  return (
    <span
      className={clsx(
        "px-2 py-1 text-xs rounded-full font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
};

export const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className={clsx(
          "bg-slate-900 border border-slate-700/80 rounded-2xl p-6 w-full mx-4 shadow-glow",
          sizes[size],
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
