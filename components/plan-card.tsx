"use client"

import { Check, Zap } from "lucide-react"

interface PlanCardProps {
  name: string
  description: string
  price: number
  originalPrice?: number
  isSoldOut?: boolean
  isSelected?: boolean
  isBestValue?: boolean
  onSelect: () => void
}

export function PlanCard({
  name,
  description,
  price,
  originalPrice,
  isSoldOut = false,
  isSelected = false,
  isBestValue = false,
  onSelect,
}: PlanCardProps) {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <button
      onClick={() => !isSoldOut && onSelect()}
      disabled={isSoldOut}
      className={`group relative w-full rounded-2xl border-2 p-5 text-left transition-all duration-200 ${
        isSoldOut
          ? "cursor-not-allowed border-border/50 bg-card/30 opacity-40"
          : isSelected
            ? "animate-pulse-glow border-primary bg-card shadow-lg shadow-primary/10"
            : "border-border bg-card hover:border-primary/40 hover:shadow-md"
      }`}
    >
      {isBestValue && !isSoldOut && (
        <div className="absolute -top-3 left-5 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/30">
          <Zap className="h-3 w-3" />
          {"Лучший выбор"}
        </div>
      )}
      {originalPrice && !isSoldOut && discount > 0 && (
        <div className="absolute -top-3 right-5 rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-accent-foreground shadow-lg shadow-accent/30">
          {`-${discount}%`}
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-4">
          {/* Radio */}
          <div
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
              isSelected
                ? "border-primary bg-primary"
                : isSoldOut
                  ? "border-border/50"
                  : "border-muted-foreground/30 group-hover:border-primary/50"
            }`}
          >
            {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
          </div>

          <div>
            <h3 className="text-sm font-bold text-foreground sm:text-base">{name}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{description}</p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end">
          {originalPrice && !isSoldOut && (
            <span className="text-xs text-muted-foreground line-through">
              {`${originalPrice.toFixed(0)} \u20BD`}
            </span>
          )}
          <span
            className={`text-xl font-extrabold tabular-nums sm:text-2xl ${
              isSoldOut
                ? "text-muted-foreground"
                : isSelected
                  ? "text-primary"
                  : "text-foreground"
            }`}
          >
            {`${price.toFixed(0)} \u20BD`}
          </span>
          {isSoldOut && (
            <span className="mt-1 rounded-md bg-destructive/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive">
              {"Нет в наличии"}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
