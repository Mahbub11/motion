"use server";

import { z } from "zod";
import { FormSchema } from "../types";
import { cookies } from "next/headers";
import { createClient } from "../supabase/server-connection";
const supabase = await createClient();
export async function actionLoginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const email1 = email as string;
  const password1 = password as string;

  const { error } = await supabase.auth.signInWithPassword({
    email: email1,
    password: password1,
  });
  return error?.message;
}
export async function actionSignUpUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email);

  if (data?.length) return { error: { message: "User already exists", data } };
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
    },
  });
  return response;
}
