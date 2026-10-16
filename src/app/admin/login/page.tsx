import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="grid min-h-[80svh] place-items-center">
      <div className="card w-full max-w-sm p-8">
        <p className="eyebrow">CMS</p>
        <h1 className="section-title mt-3 !text-3xl">Masuk</h1>
        <LoginForm />
      </div>
    </div>
  );
}
