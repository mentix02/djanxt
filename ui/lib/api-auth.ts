import { auth } from "@/lib/auth";
import { headers as NextHeaders } from "next/headers";

export default async function getBearerToken() {
  return (await auth.api.getToken({ headers: await NextHeaders() })).token;
}
