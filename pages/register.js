import AuthCard from "../components/auth/AuthCard";
import Button from "../components/base/Button";
import TextField from "../components/base/TextField";

export default function register() {
  return (
    <AuthCard title="Create an account">
      <form class="mt-8 space-y-6" action="#" method="POST">
        <div className="space-y-5">
          <div>
            <TextField type="text" placeholder="Enter Channel name" />
          </div>
          <div>
            <TextField type="email" placeholder="Enter Email address" />
          </div>
          <div>
            <TextField type="password" placeholder="Enter Password" />
          </div>
          <div>
            <TextField type="password" placeholder="Confirm Password" />
          </div>
        </div>
        <div>
          <Button className="btn-red w-full">Register</Button>
        </div>
      </form>
    </AuthCard>
  );
}
