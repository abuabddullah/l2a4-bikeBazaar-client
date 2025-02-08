import { useState } from "react";
import { Controller } from "react-hook-form";
import { Upload } from "lucide-react";

interface FileInputProps {
  name: string;
  control: any;
  label: string;
  error?: string;
  setValue?: any;
}

const FileInput: React.FC<FileInputProps> = ({ name, control, label }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const MAX_SIZE = 2 * 1024 * 1024; // 2MB maximum pic size

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            <div
              className="relative flex flex-col items-center justify-center w-full h-32 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-gray-600 hover:border-orange-500 hover:bg-gray-100 transition"
              onClick={() => document.getElementById(name)?.click()}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <Upload className="h-6 w-6 text-gray-500" />
                  <p className="text-sm">Click to upload</p>
                  <p className="text-xs text-gray-500">Max file size: 2MB</p>
                </div>
              )}
            </div>

            <input
              id={name}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (file.size > MAX_SIZE) {
                    alert("File size exceeds 2MB limit.");
                    return;
                  }
                  onChange(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />

            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};

export default FileInput;
