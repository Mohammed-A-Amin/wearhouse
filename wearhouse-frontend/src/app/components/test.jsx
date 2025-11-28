import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function TestLogin() {
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
    const errorData = await res.json(); // Try to get the error details from Flask
    console.log("SERVER ERROR:", res.status, errorData);
    return <div>Error loading profile</div>;
  }

  const userData = await res.json();
  console.log(userData)

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Welcome, {userData.first_name}!</h1>
      <p>Email: {userData.email}</p>
      <p>Name: {userData.first_name}</p>
    </div>
  );
}