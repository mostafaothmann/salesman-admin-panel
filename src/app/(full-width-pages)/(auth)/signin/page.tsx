import { Metadata } from "next";
import SignInForm from "../../../../components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Next.js SignIn Page | EmaarAdmin - Next.js Dashboard Template",
  description: "This is Next.js Signin Page EmaarAdmin Dashboard Template",
};

export default function SignIn() {
  return <SignInForm />;
}
