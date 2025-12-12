export {};

declare global {
  type Nullable<T> = T | null;
  type Nullish<T> = Nullable<T> | undefined;

  type FormState<T> = {
    values: T;
    submitted?: boolean;
    non_field_errors: string[];
    errors: Partial<Record<keyof T, string>>;
  };
}
