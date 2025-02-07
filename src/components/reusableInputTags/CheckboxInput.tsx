import { Controller } from "react-hook-form";

interface CheckboxInputProps {
  name: string;
  control: any;
  label: string;
  error?: string;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  name,
  control,
  label,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex items-center">
          <input
            {...field}
            type="checkbox"
            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label htmlFor={name} className="ml-2 block text-sm text-gray-900">
            {label}
          </label>
          {error && (
            <p className="text-red-500 text-sm mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default CheckboxInput;
