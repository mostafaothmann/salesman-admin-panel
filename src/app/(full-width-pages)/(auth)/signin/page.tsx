import { Metadata } from "next";
import SignInForm from "../../../../components/auth/SignInForm";

export const metadata: Metadata = {
  title: "روح الأرض لوحة القيادة",
  description: "روح الأرض",
};

export default function SignIn() {
  return <SignInForm />;
}
