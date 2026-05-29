"use server";
import { revalidatePath } from "next/cache";

function revalidateDashboard() {
  revalidatePath("/dashboard");
}

revalidateDashboard();
