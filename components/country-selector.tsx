"use client"

import { useState } from "react"
import { Check, Minus, Plus, ShoppingCart, ArrowLeft, Zap } from "lucide-react"

interface Country {
  id: string
  name: string
  flag: string
  stock: number
  price: number
}

interface CountrySelectorProps {
  selectedPlanName: string
  selectedPlanPrice: number
  onBack: () => void
}

const countries: Country[] = [
  { id: "kz", name: "Казахстан", flag: "\uD83C\uDDF0\uD83C\uDDFF", stock: 5, price: 990 },
  { id: "de", name: "Германия", flag: "\uD83C\uDDE9\uD83C\uDDEA", stock: 13, price: 990 },
  { id: "ca", name: "Канада", flag: "\uD83C\uDDE8\uD83C\uDDE6", stock: 3, price: 990 },
  { id: "pl", name: "Польша", flag: "\uD83C\uDDF5\uD83C\uDDF1", stock: 1, price: 990 },
  { id: "ee", name: "Эстония", flag: "\uD83C\uDDEA\uD83C\uDDEA", stock: 10, price: 990 },
  { id: "tr", name: "Турция", flag: "\uD83C\uDDF9\uD83C\uDDF7", stock: 8, price: 990 },
  { id: "us", name: "США", flag: "\uD83C\uDDFA\uD83C\uDDF8", stock: 0, price: 990 },
]

export function CountrySelector({ selectedPlanName, selectedPlanPrice, onBack }: CountrySelectorProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("de")
  const [quantity, setQuantity] = useState(1)

  const selected = countries.find((c) => c.id === selectedCountry)
  const total = (selected?.price ?? selectedPlanPrice) * quantity
  const maxQty = selected?.stock ?? 0

  return (
    <div className="flex flex-col">
      {/* Selected plan badge */}
      <div className="mb-5 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          <Check className="h-3 w-3" />
          {"Выбрано: "}{selectedPlanName}
        </div>
      </div>

      {/* Country grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {countries.map((country) => {
          const isSoldOut = country.stock === 0
          const isSelected = selectedCountry === country.id

          return (
            <button
              key={country.id}
              onClick={() => {
                if (!isSoldOut) {
                  setSelectedCountry(country.id)
                  setQuantity(1)
                }
              }}
              disabled={isSoldOut}
              className={`relative flex flex-col items-start gap-2 rounded-2xl border-2 p-4 text-left transition-all ${
                isSoldOut
                  ? "cursor-not-allowed border-border/30 bg-card/20 opacity-40"
                  : isSelected
                    ? "border-primary bg-card shadow-lg shadow-primary/10"
                    : "border-border bg-card hover:border-primary/40 hover:shadow-md"
              }`}
            >
              {/* Flag + Stock */}
              <div className="flex w-full items-center justify-between">
                <span className="text-2xl">{country.flag}</span>
                <span className={`text-[10px] font-bold tabular-nums ${isSoldOut ? "text-muted-foreground" : "text-muted-foreground"}`}>
                  {country.stock} {"шт."}
                </span>
              </div>

              {/* Name */}
              <span className="text-sm font-bold text-foreground">{country.name}</span>

              {/* Status */}
              {isSoldOut ? (
                <span className="text-[11px] font-semibold text-destructive">{"Нет в наличии"}</span>
              ) : (
                <span className="text-[11px] font-semibold text-accent">{"В наличии"}</span>
              )}

              {/* Price */}
              <span className={`text-base font-extrabold tabular-nums ${isSelected ? "text-primary" : "text-foreground"}`}>
                {country.price} {"\u20BD"}
              </span>

              {/* Selected indicator */}
              {isSelected && !isSoldOut && (
                <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary shadow-md">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Total + Quantity bar */}
      <div className="mt-6 flex items-center justify-between rounded-2xl border border-border bg-secondary/30 px-5 py-4">
        <div>
          <span className="block text-xs text-muted-foreground">{"Итого"}</span>
          <span className="text-2xl font-extrabold tabular-nums text-foreground">
            {total.toLocaleString("ru-RU")} {"\u20BD"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary disabled:opacity-30"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-[2rem] text-center text-lg font-bold tabular-nums text-foreground">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
            disabled={quantity >= maxQty}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary disabled:opacity-30"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3 text-sm font-bold text-foreground transition-all hover:bg-secondary active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4" />
          {"Назад"}
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-secondary px-6 py-3 text-sm font-bold text-foreground transition-all hover:bg-secondary/80 active:scale-[0.98]">
          <ShoppingCart className="h-4 w-4" />
          {"В корзину"}
        </button>
        <button className="group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]">
          <Zap className="h-4 w-4" />
          {"Купить сейчас"}
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 transition-opacity group-hover:opacity-100" />
        </button>
      </div>
    </div>
  )
}
