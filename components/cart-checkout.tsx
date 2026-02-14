"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ArrowLeft, Loader2, RefreshCw, Copy, Check } from "lucide-react"
import Image from "next/image"
import { CountryFlag } from "@/components/country-flag"

interface CartItem {
  planName: string
  countryName: string
  countryCode: string
  quantity: number
  price: number
}

interface CartCheckoutProps {
  items: CartItem[]
  onBack: () => void
  onRemoveItem: (index: number) => void
  onGoHome: () => void
}

type PaymentMethod = "card" | "crypto"
type CheckoutPhase = "form" | "loading" | "details" | "waiting"

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
}

export function CartCheckout({ items, onBack, onRemoveItem, onGoHome }: CartCheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  const [agreedToTerms, setAgreedToTerms] = useState(true)
  const [promoCode, setPromoCode] = useState("")
  const [phase, setPhase] = useState<CheckoutPhase>("form")
  const [timeLeft, setTimeLeft] = useState(15 * 60)
  const [timerExpired, setTimerExpired] = useState(false)
  const [copied, setCopied] = useState(false)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Timer countdown
  useEffect(() => {
    if (phase !== "details" || timerExpired) return
    if (timeLeft <= 0) {
      setTimerExpired(true)
      return
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimerExpired(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [phase, timeLeft, timerExpired])

  const handlePay = useCallback(() => {
    setPhase("loading")
    setTimeout(() => {
      setPhase("details")
      setTimeLeft(15 * 60)
      setTimerExpired(false)
    }, 3000)
  }, [])

  const handleRefreshDetails = useCallback(() => {
    setPhase("loading")
    setTimeout(() => {
      setPhase("details")
      setTimeLeft(15 * 60)
      setTimerExpired(false)
    }, 3000)
  }, [])

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  const handleConfirm = useCallback(() => {
    setPhase("waiting")
  }, [])

  const timerProgress = timeLeft / (15 * 60)

  // Phase: Loading
  if (phase === "loading") {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 sm:px-8">
        <div className="relative mb-6">
          <div className="h-16 w-16 rounded-full border-4 border-border" />
          <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground">
          {"Ожидание подтверждения"}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {"Ожидание подтверждения от API системы..."}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="text-xs text-muted-foreground">{"Пожалуйста, подождите"}</span>
        </div>
      </div>
    )
  }

  // Phase: Waiting
  if (phase === "waiting") {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 sm:px-8">
        <div className="relative mb-6">
          <div className="h-16 w-16 rounded-full border-4 border-border" />
          <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground">
          {"Ожидание пополнения..."}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {"Как только средства поступят, заказ будет выполнен автоматически"}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="text-xs text-muted-foreground">{"Проверяем оплату"}</span>
        </div>
        <button
          onClick={onGoHome}
          className="mt-8 flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-8 py-3 text-sm font-bold text-foreground transition-all hover:bg-secondary active:scale-[0.98]"
        >
          {"Вернуться на главную"}
        </button>
      </div>
    )
  }

  // Phase: Payment details with timer
  if (phase === "details") {
    const requisites = paymentMethod === "card"
      ? { label: "Номер карты", value: "2200 1234 5678 9012" }
      : { label: "Номер кошелька", value: "0393133" }

    return (
      <div className="flex flex-col px-6 py-6 sm:px-8">
        <h2 className="text-center text-xl font-extrabold text-foreground sm:text-2xl">
          {"Оплатите по следующим реквизитам:"}
        </h2>

        <div className="mt-6 rounded-2xl border border-border bg-secondary/30 p-5">
          {/* Timer */}
          <div className="mb-5 flex flex-col items-center gap-3">
            {!timerExpired ? (
              <>
                <div className="relative h-24 w-24">
                  <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50" cy="50" r="42"
                      stroke="hsl(var(--border))"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="50" cy="50" r="42"
                      stroke="hsl(var(--primary))"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      strokeDashoffset={`${2 * Math.PI * 42 * (1 - timerProgress)}`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-lg font-bold tabular-nums text-foreground">
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {"Время на оплату"}
                </p>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-destructive/30 bg-destructive/10">
                  <X className="h-8 w-8 text-destructive" />
                </div>
                <p className="text-center text-sm font-bold text-foreground">
                  {"Ожидание завершено."}
                </p>
                <button
                  onClick={handleRefreshDetails}
                  className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <RefreshCw className="h-4 w-4" />
                  {"Обновить реквизиты"}
                </button>
              </div>
            )}
          </div>

          {/* Requisites */}
          {!timerExpired && (
            <div className="flex flex-col gap-3">
              <div className="rounded-xl border border-border bg-card p-4">
                <span className="text-xs text-muted-foreground">{requisites.label}</span>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="font-mono text-sm font-bold text-foreground">{requisites.value}</span>
                  <button
                    onClick={() => handleCopy(requisites.value)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary transition-colors hover:bg-secondary/80"
                    aria-label="Копировать"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-accent" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <span className="text-xs text-muted-foreground">{"Сумма к оплате"}</span>
                <div className="mt-1">
                  <span className="text-lg font-extrabold tabular-nums text-primary">
                    {paymentMethod === "card"
                      ? `${total.toLocaleString("ru-RU")} \u20BD`
                      : `$${(total / 90).toFixed(2)} (USDT)`}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        {!timerExpired && (
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={onGoHome}
              className="flex items-center justify-center rounded-2xl border border-border bg-card px-8 py-3 text-sm font-bold text-foreground transition-all hover:bg-secondary active:scale-[0.98]"
            >
              {"Отмена"}
            </button>
            <button
              onClick={handleConfirm}
              className="group relative flex items-center justify-center overflow-hidden rounded-2xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
            >
              <span className="relative z-10">{"Подтвердить"}</span>
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </div>
        )}
      </div>
    )
  }

  // Phase: Form - checkout form
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-border/50 px-6 py-6 text-center sm:px-8">
        <h2 className="text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          {"Корзина"}
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {"Проверьте ваш заказ"}
        </p>
        <div className="mx-auto mt-5 flex items-center justify-center gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-1.5 rounded-full transition-all ${
                step <= 3 ? "w-10 bg-primary" : "w-6 bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6 sm:p-8">
        {/* Cart items */}
        {items.map((item, index) => {
          const itemTotal = item.price * item.quantity
          return (
            <div key={`${item.countryCode}-${item.planName}-${index}`} className="flex items-center justify-between rounded-2xl border border-border bg-secondary/40 px-5 py-4">
              <div className="flex items-center gap-3">
                <CountryFlag code={item.countryCode} size={28} />
                <div>
                  <h3 className="text-sm font-bold text-foreground">{item.planName}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.countryName} {"\u00B7"} {item.quantity} {"шт."}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-extrabold tabular-nums text-primary">
                  {itemTotal.toLocaleString("ru-RU")} {"\u20BD"}
                </span>
                <button
                  onClick={() => onRemoveItem(index)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-destructive transition-colors hover:bg-destructive/10"
                  aria-label="Удалить"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )
        })}

        {/* Payment method */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setPaymentMethod("card")}
            className={`flex flex-col items-center gap-3 rounded-2xl border-2 px-4 py-5 transition-all ${
              paymentMethod === "card"
                ? "border-primary bg-card shadow-lg shadow-primary/10"
                : "border-border bg-card hover:border-primary/40"
            }`}
          >
            <Image
              src="/images/mir.png"
              alt="МИР"
              width={80}
              height={28}
              className="h-7 w-auto object-contain"
            />
            <span className={`text-xs font-bold ${paymentMethod === "card" ? "text-foreground" : "text-muted-foreground"}`}>
              {"Банковская карта"}
            </span>
          </button>

          <button
            onClick={() => setPaymentMethod("crypto")}
            className={`flex flex-col items-center gap-3 rounded-2xl border-2 px-4 py-5 transition-all ${
              paymentMethod === "crypto"
                ? "border-primary bg-card shadow-lg shadow-primary/10"
                : "border-border bg-card hover:border-primary/40"
            }`}
          >
            <Image
              src="/images/btc.png"
              alt="Bitcoin"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className={`text-xs font-bold ${paymentMethod === "crypto" ? "text-foreground" : "text-muted-foreground"}`}>
              {"Криптовалюта"}
            </span>
          </button>
        </div>

        {/* Terms */}
        <label className="flex cursor-pointer items-center gap-3">
          <button
            onClick={() => setAgreedToTerms(!agreedToTerms)}
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
              agreedToTerms
                ? "border-primary bg-primary"
                : "border-muted-foreground/30"
            }`}
          >
            {agreedToTerms && <Check className="h-3 w-3 text-primary-foreground" />}
          </button>
          <span className="text-sm text-muted-foreground">
            {"Я согласен с "}
            <a href="#" className="font-medium text-foreground underline underline-offset-4">{"Условиями"}</a>
            {" и "}
            <a href="#" className="font-medium text-foreground underline underline-offset-4">{"Политикой"}</a>
            {"."}
          </span>
        </label>

        {/* Promo code */}
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2">
          <input
            type="text"
            placeholder="Промокод"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button className="rounded-xl border border-border bg-secondary px-4 py-1.5 text-xs font-bold text-foreground transition-colors hover:bg-secondary/80">
            {"Применить"}
          </button>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between rounded-2xl border border-border bg-secondary/30 px-5 py-4">
          <span className="text-sm font-bold text-muted-foreground">{"Итого:"}</span>
          <span className="text-2xl font-extrabold tabular-nums text-primary">
            {total.toLocaleString("ru-RU")} {"\u20BD"}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="border-t border-border/50 bg-secondary/30 px-6 py-4 sm:px-8">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-8 py-3 text-sm font-bold text-foreground transition-all hover:bg-secondary active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            {"Назад"}
          </button>
          <button
            onClick={handlePay}
            disabled={!agreedToTerms}
            className="group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
          >
            <span className="relative z-10">{"Оплатить"}</span>
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        </div>
      </div>
    </div>
  )
}
