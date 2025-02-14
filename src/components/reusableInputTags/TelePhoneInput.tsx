import { Controller } from "react-hook-form";

interface TelePhoneInputProps {
  name: string;
  control: any;
  label: string;
  placeholder?: string;
  error?: string;
}

const TelePhoneInput: React.FC<TelePhoneInputProps> = ({
  name,
  control,
  label,
  placeholder,
}) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              {...field}
              type="tel"
              placeholder={placeholder}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default TelePhoneInput;
