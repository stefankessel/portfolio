"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { Authenticator, useAuthenticator, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

export function Login() {
  const { route } = useAuthenticator((context) => [context.route]);
  const router = useRouter();

  useEffect(() => {
    if (route === "authenticated") {
      //   navigate(from, { replace: true });
    }
  }, [route]);
  return (
    <View className="auth-wrapper">
      <Authenticator></Authenticator>
    </View>
  );
}
