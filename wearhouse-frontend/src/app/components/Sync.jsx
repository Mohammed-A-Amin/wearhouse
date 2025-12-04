import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Sync() {
  const { userId, getToken } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const token = await getToken();

  const res = await fetch("http://127.0.0.1:8080/api/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok){
    return <div>Error loading profile</div>;
  }

  const userData = await res.json();
  console.log(userData)
  return(<></>)
}