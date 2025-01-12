"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const userData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const { data, error } = await supabase.auth.signInWithPassword(userData);
    if (error) {
      throw new Error(error.message);
    }
    return { success: true };
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, error: error.message };
  }
}

export const signOut = async () => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    return { success: true };
  } catch (error: any) {
    console.error("Sign out error:", error);
    return { success: false, error: error.message };
  }
};

const creatUser = async (email: string, password: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .insert({ email: email, password: password })
    .select();
  return;
};

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    redirect("/signup");
  } else {
    await creatUser(
      formData.get("email") as string,
      formData.get("password") as string
    );
    revalidatePath("/", "layout");
    redirect("/");
  }
}

export const getUserRole = async () => {
  const supabase = await createClient();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  const userEmail = sessionData?.session?.user?.email;

  const { data, error } = await supabase
    .from("users")
    .select("id, role")
    .eq("email", userEmail)
    .single();

  if (error) {
    console.error("Error fetching user role:", error);
    return null;
  }

  return { id: data?.id, role: data?.role };
};

export const insertPayment = async (title: string, amount: number) => {
  const supabase = await createClient();
  try {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    if (sessionError) {
      console.error("Error fetching session:", sessionError);
      throw new Error("Failed to fetch session.");
    }

    const userEmail = sessionData?.session?.user?.email;
    let { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", userEmail)
      .single();
    if (!userEmail) {
      throw new Error("User not authenticated.");
    }

    const response = await supabase.from("payment").insert({
      title: title,
      amount: amount,
      user_id: users?.id,
    });

    if (error) {
      console.error("Error inserting payment:", error);
      throw new Error("Failed to insert payment.");
    }

    console.log("Payment data:", response);
    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error;
  }
};

// export const getPayments = async () => {
//   const supabase = await createClient();
//   let { data: payment, error } = await supabase.from("payment").select("*");
//   return payment;
// };

export const getPayments = async (
  status: string,
  startDate: string,
  page: number,
  itemsPerPage: number
) => {
  const supabase = await createClient();
  const user: any = await getUserRole();

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage - 1;

  let query = supabase.from("payment").select("*").range(start, end);

  if (status !== "All") {
    query = query.eq("status", status.toLowerCase());
  }

  if (startDate) {
    query = query.gte("created_at", startDate);
  }
  if (user?.role === "user") {
    query = query.eq("user_id", user.id);
  }

  let { data: payment, error } = await query;

  if (error) {
    console.error("Error fetching payments:", error);
    return [];
  }

  return payment;
};

export const updatePaymentStatus = async (
  newState: string,
  paymentId: string
) => {
  const supabase = await createClient();
  let { data: payment, error } = await supabase
    .from("payment")
    .update({ status: newState })
    .eq("id", paymentId)
    .select();
  return payment;
};

export const getDocuments = async (
  status: string,
  page: number,
  itemsPerPage: number
) => {
  const supabase = await createClient();
  const user: any = await getUserRole();

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage - 1;

  let query = supabase.from("documents").select("*").range(start, end);

  if (status !== "All") {
    query = query.eq("status", status.toLowerCase());
  }
  if (user?.role === "user") {
    query = query.eq("user_id", user.id);
  }
  let { data: document, error } = await query;

  if (error) {
    console.error("Error fetching documents:", error);
    return [];
  }

  return document;
};

export const updateDocumentStatus = async (newState: string, docId: string) => {
  const supabase = await createClient();
  let { data: document, error } = await supabase
    .from("documents")
    .update({ status: newState })
    .eq("id", docId)
    .select();
  return document;
};

// export const filterDocuments = async (status: string) => {
//   if (status === "All") {
//     console.log("first");
//     return await getDocuments();
//   }
//   const supabase = await createClient();
//   let { data: document, error } = await supabase
//     .from("documents")
//     .select("*")
//     .eq("status", status.toLowerCase());

//   if (error) {
//     console.error("Error fetching documents:", error);
//     return [];
//   }

//   return document;
// };

export const uploadFileToDocumentsBucket = async (file: File) => {
  const supabase = await createClient();
  try {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    console.log(sessionData);
    const userEmail = sessionData?.session?.user?.email;
    let { data: users } = await supabase
      .from("users")
      .select("*")
      .eq("email", userEmail)
      .single();
    const date = new Date();
    const milliseconds = date.getTime();

    const filePath = `${milliseconds}-${file.name}`;
    if (sessionError) {
      console.error("Error fetching session:", sessionError);
    }
    const { data, error } = await supabase.storage
      .from("documents")
      .upload(filePath, file);

    const response = await supabase
      .from("documents")
      .insert([{ file_url: data?.fullPath, user_id: users?.id }])
      .select();

    if (error) {
      console.error("Error uploading file:", error);
      throw new Error("Failed to upload file.");
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error;
  }
};

// payment statistics

export async function getDailyPaymentStatistics() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("payment")
    .select("amount, created_at");

  if (error) {
    console.error("Error fetching payments:", error);
    return [];
  }

  const statistics = data.reduce((acc: any, payment: any) => {
    const date = format(new Date(payment.created_at), "dd");
    if (!acc[date]) {
      acc[date] = { totalAmount: 0, count: 0, day: date };
    }
    acc[date].totalAmount += payment.amount;
    acc[date].count += 1;
    return acc;
  }, {});

  return Object.values(statistics);
}
