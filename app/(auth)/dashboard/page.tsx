import SignOutButton from "@/components/auth/AuthButton";
import Link from "next/link";
import React from "react";

import { headers } from "next/headers";
import { withSSRContext } from "aws-amplify";
import { redirect } from "next/navigation";

async function Dashboard() {
  const req = {
    headers: {
      cookie: headers().get("cookie"),
    },
  };

  const { Auth } = withSSRContext({ req });

  try {
    const user = await Auth.currentAuthenticatedUser();
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <p>This is your dashboard, {user.attributes.name}.</p>
        <Link
          href="/"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Go to Landing Page
        </Link>
        <SignOutButton isLoggedIn={user !== undefined} />
      </main>
    );
  } catch (error) {
    console.log(error);
    redirect("/");
  }
}

export default Dashboard;
