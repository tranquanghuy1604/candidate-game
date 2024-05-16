import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "antd";

interface InputFieldProps {
  name: string;
  control: any;
  placeholder?: string;
  errors: any;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  control,
  placeholder,
  errors,
}) => {
  return (
    <div className="mb-4">
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            {...field}
            placeholder={placeholder}
            className="w-full py-[10px]"
          />
        )}
      />
      {errors[name] && (
        <span className="text-red-500">{errors[name].message}</span>
      )}
    </div>
  );
};

export default InputField;
