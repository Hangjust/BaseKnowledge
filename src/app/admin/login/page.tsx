import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/AdminLoginForm";
import { authOptions } from "@/lib/auth";

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/admin");
  }

  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">Administrator</p>
        <h1>Sign in to manage learning content.</h1>
        <p className="lead">Student learning pages stay public. Only content management is protected.</p>
      </section>
      <AdminLoginForm />
    </main>
  );
}
