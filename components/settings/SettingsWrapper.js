import PasswordForm from "./PasswordForm";
import ProfileForm from "./ProfileForm";

const SettingsForm = () => {
  return (
    <div className="space-y-10 mb-5">
      <div>
        <div className="mb-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
            Profile Information
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            The Channel Name will be displayed publicly so be careful what you save
          </p>
        </div>
        <ProfileForm />
      </div>
      <div>
        <div className="mb-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
            Password
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Make sure you put a strong password for security reasons
          </p>
        </div>
        <PasswordForm />
      </div>
    </div>
  );
};

export default SettingsForm;
