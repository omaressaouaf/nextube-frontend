export default function TextField({ className, ...otherProps }) {
  return <input class={`w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm ${className}`} {...otherProps} />;
}
