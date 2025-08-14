import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Label } from "../label";
import { Textarea } from "../textarea";

type ControlledTextareaProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
};

export const ControlledTextarea = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  placeholder,
  rows,
}: ControlledTextareaProps<T>) => {
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
            <Textarea
              id={name}
              placeholder={placeholder}
              rows={rows}
              {...field}
            />
            {fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};
