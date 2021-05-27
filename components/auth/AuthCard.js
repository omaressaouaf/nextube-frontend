export default function AuthCard({ title, children }) {
  return (
    <div class="flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-lg w-full space-y-8">
        <div>
          <img class="mx-auto h-12 w-auto" src="/logo.png" alt="Logo" />
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}
