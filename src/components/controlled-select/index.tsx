import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Label } from "../label";
import { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "../input";

type Option = {
  label: ReactNode;
  value: string;
};

type ControlledSelectProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  options: Option[];
  isFilterable?: boolean;
  onSearch?: (searchTerm: string) => void;
  isLoading?: boolean;
  searchTerm?: string;
};

export const ControlledSelect = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Select an option",
  required = false,
  options,
  isFilterable = false,
  onSearch,
  isLoading = false,
}: ControlledSelectProps<T>) => {
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    if (onSearch && isFilterable) {
      const delayDebounce = setTimeout(() => {
        onSearch(search);
      }, 300);
      return () => clearTimeout(delayDebounce);
    }
  }, [search, onSearch, isFilterable]);

  const filteredOptions = React.useMemo(() => {
    if (onSearch || !isFilterable) return options;
    return options.filter((option) =>
      option.label?.toString().toLowerCase().includes(search.toLowerCase())
    );
  }, [search, options, onSearch, isFilterable]);

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
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id={name}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {isFilterable && (
                  <div className="p-2">
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                )}

                {isLoading ? (
                  <div className="flex items-center justify-center px-3 py-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Loading...
                  </div>
                ) : filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    No results found.
                  </div>
                )}
              </SelectContent>
            </Select>

            {fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};
