import { Controller } from "react-hook-form";

interface SelectInputProps {
  name: string;
  control: any;
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  control,
  label,
  options,
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
            <select
              {...field}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              <option value="" disabled>
                Select {label}
              </option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {error && (
              <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default SelectInput;
