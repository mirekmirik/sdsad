"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ArrowLeft, Loader2, RefreshCw, Copy, Check } from "lucide-react"

interface CartItem {
  planName: string
  countryName: string
  countryFlag: string
  quantity: number
  price: number
}

interface CartCheckoutProps {
  item: CartItem
  onBack: () => void
  onRemoveItem: () => void
  onGoHome: () => void
}

type PaymentMethod = "card" | "crypto"
type CheckoutPhase = "form" | "loading" | "details" | "waiting"

function MirLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.5 4C9.2 4 8.1 4.8 7.6 6L5 13H5L2.4 6C1.9 4.8 0.8 4 -0.5 4H-3V20H1V11L3.2 17H6.8L9 11V20H13V4H10.5Z"
        fill="currentColor"
        transform="translate(4, 0)"
      />
      <path
        d="M20 4V20H24V4H20Z"
        fill="currentColor"
        transform="translate(4, 0)"
      />
      <path
        d="M30 4V20H34V13L38.5 20H43L38 12.5L42.5 4H38.5L34 11V4H30Z"
        fill="currentColor"
        transform="translate(4, 0)"
      />
      <rect x="0" y="0" width="80" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function BitcoinLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 8V10H11V22H12V24H14V22H16V24H18V22.1C20.8 21.6 23 19.5 23 17C23 15.5 22.2 14.2 21 13.4C21.6 12.6 22 11.6 22 10.5C22 8.3 20.2 6.4 17.8 6.1V8H16V6H14V8H12ZM14 12H17.5C18.9 12 20 13.1 20 14.5C20 15.9 18.9 17 17.5 17H14V12ZM14 19H18C19.4 19 20.5 18.1 20.5 17C20.5 17 20.5 17 20.5 17C21 17.5 21 18 21 18.5C21 19.9 19.9 21 18.5 21H14V19Z"
        fill="currentColor"
      />
    </svg>
  )
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
}

export function CartCheckout({ item, onBack, onRemoveItem, onGoHome }: CartCheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  const [agreedToTerms, setAgreedToTerms] = useState(true)
  const [promoCode, setPromoCode] = useState("")
  const [phase, setPhase] = useState<CheckoutPhase>("form")
  const [timeLeft, setTimeLeft] = useState(15 * 60)
  const [timerExpired, setTimerExpired] = useState(false)
  const [copied, setCopied] = useState(false)

  const total = item.price * item.quantity

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
    // Simulate API confirmation delay
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

  // Phase: Loading - waiting for API confirmation
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

  // Phase: Waiting for payment confirmation
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
      : { label: "BTC Адрес", value: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" }

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
        {/* Cart item */}
        <div className="flex items-center justify-between rounded-2xl border border-border bg-secondary/40 px-5 py-4">
          <div>
            <h3 className="text-sm font-bold text-foreground">{item.planName}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {item.countryFlag} {item.countryName} {"\u00B7"} {item.quantity} {"шт."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg font-extrabold tabular-nums text-primary">
              {total.toLocaleString("ru-RU")} {"\u20BD"}
            </span>
            <button
              onClick={onRemoveItem}
              className="flex h-7 w-7 items-center justify-center rounded-full text-destructive transition-colors hover:bg-destructive/10"
              aria-label="Удалить"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Payment method */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setPaymentMethod("card")}
            className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-4 py-5 transition-all ${
              paymentMethod === "card"
                ? "border-primary bg-card shadow-lg shadow-primary/10"
                : "border-border bg-card hover:border-primary/40"
            }`}
          >
            <svg viewBox="0 0 60 20" className="h-6 w-auto" fill="none">
              <path d="M5 0L10 10L15 0H20V20H16V8L11 18H9L4 8V20H0V0H5Z" fill={paymentMethod === "card" ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"} />
              <path d="M24 0V20H28V12L34 20H39L32.5 11.5L38 0H33.5L28 10V0H24Z" fill={paymentMethod === "card" ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"} />
              <path d="M42 0V20H46V12L52 20H57L50.5 11.5L56 0H51.5L46 10V0H42Z" fill={paymentMethod === "card" ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"} />
            </svg>
            <span className={`text-xs font-bold ${paymentMethod === "card" ? "text-foreground" : "text-muted-foreground"}`}>
              {"Банковская карта"}
            </span>
          </button>

          <button
            onClick={() => setPaymentMethod("crypto")}
            className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-4 py-5 transition-all ${
              paymentMethod === "crypto"
                ? "border-primary bg-card shadow-lg shadow-primary/10"
                : "border-border bg-card hover:border-primary/40"
            }`}
          >
            <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
              <circle cx="16" cy="16" r="14.5" stroke={paymentMethod === "crypto" ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"} strokeWidth="1.5" />
              <path
                d="M13 7h2v2h2V7h2v2.2c2 .5 3.5 2.2 3.5 4.3 0 1-.3 1.9-.9 2.7.9.8 1.4 1.9 1.4 3.3 0 2.3-1.7 4.2-4 4.7V26h-2v-2h-2v2h-2v-2h-2v-2h2V10h-2V8h2V7zm3 3v4h3c1.1 0 2-.9 2-2s-.9-2-2-2h-3zm0 6v5h3.5c1.4 0 2.5-1.1 2.5-2.5S20.9 16 19.5 16H16z"
                fill={paymentMethod === "crypto" ? "#F7931A" : "hsl(var(--muted-foreground))"}
              />
            </svg>
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
