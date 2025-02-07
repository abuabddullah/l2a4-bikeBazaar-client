import { Controller } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  name: string;
  control: any;
  label: string;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  control,
  label,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1 relative">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <div className="relative">
              <input
                {...field}
                type={showPassword ? "text" : "password"}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500 pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default PasswordInput;
