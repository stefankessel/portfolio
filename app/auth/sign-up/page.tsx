"use client";

import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";
import { useState } from "react";
function SignUp() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  async function signUp() {
    try {
      const auth = await Auth.signUp({
        username: user.email,
        password: user.password,
        attributes: {
          name: user.name,
        },
        autoSignIn: {
          enabled: true,
        },
      });
      console.log(auth);
      router.push(`/auth/confirm-email?email=${user.email}`);
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

  //return statement
  return (
    <>
      {/* //... */}
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(user);
          signUp();
        }}
      >
        <div>
          <label>Full Name</label>
          <div className="mt-2">
            <input
              onChange={(e) => {
                const val = e.target.value;
                if (val !== "") {
                  setUser({ ...user, name: val });
                }
              }}
            />
          </div>
        </div>
        <div>
          <label>Email address</label>
          <div className="mt-2">
            <input
              autoComplete="email"
              onChange={(e) => {
                const val = e.target.value;
                if (val !== "") {
                  setUser({ ...user, email: val });
                }
              }}
            />
          </div>
        </div>
        <div>
          <label>Password</label>
          <div className="mt-2">
            <input
              onChange={(e) => {
                const val = e.target.value;
                if (val !== "") {
                  setUser({ ...user, password: val });
                }
              }}
            />
          </div>
        </div>
        <div>
          <button type="submit">Sign up</button>
        </div>
      </form>
      <p>
        Already have an account? <a href="/auth/sign-in">Sign in</a>
      </p>
    </>
  );
}
export default SignUp;
