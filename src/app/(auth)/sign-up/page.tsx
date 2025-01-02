"use client"

import { useState } from "react"
import Link from "next/link"
import { UserPlus } from "lucide-react"
import Image from "next/image"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // ここに認証ロジックを実装予定
    console.log("Sign up attempt", { email, password, confirmPassword })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-2">Create your account</h1>
          <p className="text-sm text-muted-foreground">Start managing your housework today!</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition-shadow"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition-shadow"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="mt-1 text-sm text-muted-foreground">
                At least 8 characters
              </p>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">
                Confirm password
              </label>
              <input
                id="confirm-password"
                type="password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition-shadow"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#357ABD] transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Sign up
          </button>

          <button
            type="button"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Image src="/google.svg" alt="Google" width={16} height={16} />
            Sign up with Google
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-[#4A90E2] hover:underline">
            Sign in
          </Link>
        </p>

        <div className="text-center">
          <Link 
            href="/" 
            className="text-sm text-gray-400 hover:text-gray-500 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
} 