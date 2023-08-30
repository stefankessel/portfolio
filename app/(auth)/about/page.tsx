"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

type Props = {};
export default function About({}: Props) {
  return (
    <Authenticator signUpAttributes={["name"]}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user!.attributes?.name}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
