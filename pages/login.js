import AuthCard from "../components/auth/AuthCard";
import Button from "../components/base/Button";
import TextField from "../components/base/TextField";

export default function login() {
  return (
    <AuthCard title="Login to your account">
      <form class="mt-8 space-y-6" action="#" method="POST">
        <div className="space-y-5">
          <div>
            <TextField type="email" placeholder="Enter Email address" />
          </div>
          <div>
            <TextField type="password" placeholder="Enter Password" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <label for="remember_me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <Button className="btn-red w-full">Login</Button>
        </div>
      </form>
    </AuthCard>
  );
}
