export default function Button({ children, className, ...otherProps }) {
  return (
    <button className={`text-white text-sm uppercase px-5 py-2 rounded-sm shadow-md focus:outline-none focus:ring-2  focus:ring-offset-2 disabled:opacity-50  ${className}`} {...otherProps}>
      {children}
    </button>
  );
}
