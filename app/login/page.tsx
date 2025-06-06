import { LoginForm } from "../../components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Plataforma DISC</h1>
        <LoginForm />
      </div>
    </div>
  )
}
