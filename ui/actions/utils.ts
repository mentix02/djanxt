export const createInitialFormState = <T>(initialValues: T): FormState<T> => ({
  errors: {},
  non_field_errors: [],
  values: initialValues,
});
