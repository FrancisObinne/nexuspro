import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Label } from "../label";
import { Input } from "../input";

type ControlledInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
};

export const ControlledInput = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  type = "text",
  placeholder,
}: ControlledInputProps<T>) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Input id={name} type={type} placeholder={placeholder} {...field} />
            {fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};
