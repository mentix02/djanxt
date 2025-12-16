export {};

type FailedFetchResponse = { error: string; status: "err" };
type SuccessfulFetchResponse<T> = { data: T; status: "ok" };

declare global {
  type Nullable<T> = T | null;
  type Nullish<T> = Nullable<T> | undefined;

  type FormState<T> = {
    values: T;
    submitted?: boolean;
    non_field_errors: string[];
    errors: Partial<Record<keyof T, string>>;
  };

  // I love discriminated unions
  type FetchResponse<T> = FailedFetchResponse | SuccessfulFetchResponse<T>;
}
