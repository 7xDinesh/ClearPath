/**
 * Reusable button component with primary and secondary variants.
 */
export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  const variants = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline-primary-600',
    secondary:
      'border border-primary-200 bg-white text-primary-700 hover:bg-primary-50 focus-visible:outline-primary-600',
    ghost:
      'text-primary-700 hover:bg-primary-50 focus-visible:outline-primary-600',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
