"use client";
import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";

type Props = {
  isLoggedIn: boolean;
};

function AuthButton({ isLoggedIn }: Props) {
  const router = useRouter();

  async function handleSignOut() {
    if (isLoggedIn) {
      try {
        //await Auth.signOut();

        //router.push("/");
        console.log("signedout");
      } catch (error) {
        console.log("error signing out: ", error);
      }
    }
  }

  async function handleSignIn() {
    if (!isLoggedIn) {
      try {
        // await Auth.signOut();
        // router.push("/");
        console.log("signedin");
      } catch (error) {
        console.log("error signing out: ", error);
      }
    }
  }

  return (
    <button
      type="button"
      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        isLoggedIn ? handleSignOut() : handleSignIn();
      }}
    >
      {isLoggedIn ? "Sign out" : "Sign in"}
    </button>
  );
}
export default AuthButton;
