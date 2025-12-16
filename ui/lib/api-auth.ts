export const createAuthHeaders = (accessKey: string) => ({
  Authorization: `Token ${accessKey}` as const,
});
