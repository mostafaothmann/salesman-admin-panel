import { Metadata } from "next";
import AdminSignInForm from "../../../../components/auth/AdminSignInForm";

export const metadata: Metadata = {
  title: "روح الأرض لوحة القيادة",
  description: "روح الأرض",
};

export default function SignIn() {
  return <AdminSignInForm />;
}
