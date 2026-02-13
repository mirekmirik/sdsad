"use client"

import React from "react"

import { useState } from "react"
import { X, Eye, EyeOff, LogIn, Loader2, UserPlus } from "lucide-react"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (username: string) => void
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [login, setLogin] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  if (!isOpen) return null

  const resetForm = () => {
    setLogin("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setError("")
    setShowPassword(false)
  }

  const switchMode = (newMode: "login" | "register") => {
    resetForm()
    setMode(newMode)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!login.trim()) {
      setError("Введите логин")
      return
    }

    if (login.length < 3) {
      setError("Логин должен быть не менее 3 символов")
      return
    }

    if (mode === "register") {
      if (!email.trim()) {
        setError("Введите email")
        return
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Введите корректный email")
        return
      }
    }

    if (!password.trim()) {
      setError("Введите пароль")
      return
    }

    if (password.length < 4) {
      setError("Пароль должен быть не менее 4 символов")
      return
    }

    if (mode === "register") {
      if (password !== confirmPassword) {
        setError("Пароли не совпадают")
        return
      }
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsLoading(false)
    onLogin(login)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
      />

      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Закрыть"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-8">
          {/* Mode tabs */}
          <div className="mb-6 flex overflow-hidden rounded-2xl border border-border bg-secondary/50">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`flex-1 px-4 py-2.5 text-sm font-bold transition-all ${
                mode === "login"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {"Вход"}
            </button>
            <button
              type="button"
              onClick={() => switchMode("register")}
              className={`flex-1 px-4 py-2.5 text-sm font-bold transition-all ${
                mode === "register"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {"Регистрация"}
            </button>
          </div>

          {/* Header */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              {mode === "login" ? (
                <LogIn className="h-7 w-7 text-primary" />
              ) : (
                <UserPlus className="h-7 w-7 text-primary" />
              )}
            </div>
            <h2 className="text-xl font-bold text-foreground">
              {mode === "login" ? "Вход в аккаунт" : "Создать аккаунт"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "login"
                ? "Войдите, чтобы оформить заказ"
                : "Зарегистрируйтесь для покупки"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {/* Login field */}
            <div>
              <label htmlFor="login-field" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                {"Логин"}
              </label>
              <input
                id="login-field"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Введите логин"
                className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-base text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                autoComplete="username"
              />
            </div>

            {/* Email field (register only) */}
            {mode === "register" && (
              <div>
                <label htmlFor="email-field" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  {"Email"}
                </label>
                <input
                  id="email-field"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Введите email"
                  className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  autoComplete="email"
                />
              </div>
            )}

            {/* Password field */}
            <div>
              <label htmlFor="password-field" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                {"Пароль"}
              </label>
              <div className="relative">
                <input
                  id="password-field"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 pr-11 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm password (register only) */}
            {mode === "register" && (
              <div>
                <label htmlFor="confirm-password-field" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  {"Подтвердите пароль"}
                </label>
                <input
                  id="confirm-password-field"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Повторите пароль"
                  className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  autoComplete="new-password"
                />
              </div>
            )}

            {/* Error */}
            {error && (
              <p className="rounded-xl bg-destructive/10 px-4 py-2 text-xs font-medium text-destructive">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {mode === "login" ? "Вход..." : "Регистрация..."}
                </>
              ) : mode === "login" ? (
                <>
                  <LogIn className="h-4 w-4" />
                  {"Войти"}
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  {"Зарегистрироваться"}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
