"use client"

import { useState } from "react"
import { ArrowRight, Shield, Users, Star, Zap } from "lucide-react"
import { StoreHeader } from "@/components/store-header"
import type { NavTab } from "@/components/store-header"
import { StepIndicator } from "@/components/step-indicator"
import { PlanCard } from "@/components/plan-card"
import { StoreFooter } from "@/components/store-footer"
import { CartCheckout } from "@/components/cart-checkout"
import { TikTokBackground } from "@/components/tiktok-background"
import { LoginModal } from "@/components/login-modal"
import { FaqSection } from "@/components/faq-section"
import { SupportSection } from "@/components/support-section"
import { CountrySelector } from "@/components/country-selector"

const plans = [
  {
    id: "business-lifetime",
    name: "Бизнес \u00B7 Навсегда",
    description: "Кликабельная ссылка в Bio. Пожизненная гарантия.",
    price: 990,
    originalPrice: 1490,
    isSoldOut: false,
    isBestValue: true,
  },
  {
    id: "business-30",
    name: "Бизнес \u00B7 30 дней",
    description: "Временное решение для арбитража. Ссылка в bio.",
    price: 390,
    isSoldOut: true,
    isBestValue: false,
  },
  {
    id: "starter",
    name: "Стартовый профиль",
    description: "Прогретый профиль для личного использования и просмотров",
    price: 149,
    isSoldOut: true,
    isBestValue: false,
  },
]

const stats = [
  { icon: Users, value: "12K+", label: "Клиентов" },
  { icon: Star, value: "4.9", label: "Рейтинг" },
  { icon: Zap, value: "<5м", label: "Доставка" },
]

export default function StorePage() {
  const [selectedPlan, setSelectedPlan] = useState("business-lifetime")
  const [currentStep, setCurrentStep] = useState(1)
  const [activeTab, setActiveTab] = useState<NavTab>("store")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [showLogin, setShowLogin] = useState(false)
  const [cartItem, setCartItem] = useState<{
    planName: string
    countryName: string
    countryFlag: string
    quantity: number
    price: number
  } | null>(null)

  const selectedPlanData = plans.find((p) => p.id === selectedPlan)

  const handleLogin = (name: string) => {
    setIsLoggedIn(true)
    setUsername(name)
    setShowLogin(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername("")
  }

  const handleNext = () => {
    if (!isLoggedIn) {
      setShowLogin(true)
      return
    }
    setCurrentStep(2)
  }

  const handleBack = () => {
    setCurrentStep(1)
  }

  const handleBuyNow = (data: { countryName: string; countryFlag: string; quantity: number; price: number }) => {
    setCartItem({
      planName: selectedPlanData?.name ?? "",
      countryName: data.countryName,
      countryFlag: data.countryFlag,
      quantity: data.quantity,
      price: data.price,
    })
    setCurrentStep(3)
  }

  const handleCartBack = () => {
    setCurrentStep(2)
  }

  const handleRemoveItem = () => {
    setCartItem(null)
    setCurrentStep(2)
  }

  // When switching tabs, reset to step 1
  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab)
    if (tab === "store") {
      setCurrentStep(1)
      setCartItem(null)
    }
  }

  return (
    <div className="relative min-h-screen bg-background">
      <TikTokBackground />

      <div className="relative z-10 mx-auto max-w-xl px-4">
        <StoreHeader
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isLoggedIn={isLoggedIn}
          username={username}
          onLoginClick={() => setShowLogin(true)}
          onLogout={handleLogout}
        />

        {/* Social proof stats */}
        <div className="mt-3 flex items-center justify-center gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <stat.icon className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-bold text-foreground">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Main Card */}
        <main className="mt-5 overflow-hidden rounded-3xl border border-border bg-card/80 shadow-2xl backdrop-blur-md">
          {activeTab === "store" && currentStep === 1 && (
            <>
              {/* Header */}
              <div className="border-b border-border/50 px-6 py-6 text-center sm:px-8">
                <h2 className="text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                  {"Тип профиля"}
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {"Выберите подходящий тариф"}
                </p>
                <div className="mx-auto mt-5 max-w-xs">
                  <StepIndicator currentStep={1} totalSteps={3} />
                </div>
              </div>

              {/* Plans */}
              <div className="flex flex-col gap-4 p-6 sm:p-8">
                {plans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    name={plan.name}
                    description={plan.description}
                    price={plan.price}
                    originalPrice={plan.originalPrice}
                    isSoldOut={plan.isSoldOut}
                    isBestValue={plan.isBestValue}
                    isSelected={selectedPlan === plan.id}
                    onSelect={() => setSelectedPlan(plan.id)}
                  />
                ))}
              </div>

              {/* CTA Bottom Bar */}
              <div className="border-t border-border/50 bg-secondary/30 px-6 py-4 sm:px-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="hidden h-4 w-4 text-accent sm:block" />
                    <div className="text-sm">
                      <span className="text-muted-foreground">{"Выбрано: "}</span>
                      <span className="font-bold text-foreground">{selectedPlanData?.name}</span>
                      <span className="ml-2 font-extrabold text-primary">
                        {selectedPlanData?.price} {"\u20BD"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleNext}
                    className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {"Далее"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === "store" && currentStep === 2 && (
            <>
              {/* Header */}
              <div className="border-b border-border/50 px-6 py-6 text-center sm:px-8">
                <h2 className="text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                  {"Гео и Количество"}
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {"Выберите страну и количество"}
                </p>
                <div className="mx-auto mt-5 max-w-xs">
                  <StepIndicator currentStep={2} totalSteps={3} />
                </div>
              </div>

              {/* Country Selector */}
              <div className="p-6 sm:p-8">
                <CountrySelector
                  selectedPlanName={selectedPlanData?.name ?? ""}
                  selectedPlanPrice={selectedPlanData?.price ?? 0}
                  onBack={handleBack}
                  onBuyNow={handleBuyNow}
                />
              </div>
            </>
          )}

          {activeTab === "store" && currentStep === 3 && cartItem && (
            <CartCheckout
              item={cartItem}
              onBack={handleCartBack}
              onRemoveItem={handleRemoveItem}
            />
          )}

          {activeTab === "support" && (
            <div className="p-6 sm:p-8">
              <SupportSection />
            </div>
          )}

          {activeTab === "faq" && (
            <div className="p-6 sm:p-8">
              <FaqSection />
            </div>
          )}
        </main>

        <StoreFooter />
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
    </div>
  )
}
