import { Controller } from "react-hook-form";

interface NumberInputProps {
  name: string;
  control: any;
  label: string;
  error?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({ name, control, label }) => {
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
              type="number"
              value={field.value || ""}
              onChange={(e) => field.onChange(Number(e.target.value) || "")}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500 appearance-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
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

export default NumberInput;
