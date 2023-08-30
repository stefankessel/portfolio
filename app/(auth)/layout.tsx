"use client";
import { ReactNode } from "react";
import { Amplify } from "aws-amplify";

import awsExports from "@/aws-exports";

// ssr:true === to store the user access token (JWT) in the cookie instead of the localStorage
Amplify.configure({ ...awsExports, ssr: true });

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {children}
    </div>
  );
}
