import { getSession } from "@/lib/auth/auth";
import dbConnect from "@/lib/db";
import { Board } from "@/lib/models";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  await dbConnect();

  const board = await Board.findOne({
    userId: session.user.id,
    name: "Job Hunt",
  });

  console.log(board);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}
