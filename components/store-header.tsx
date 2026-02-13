"use client"

import { Store, HelpCircle, MessageCircleQuestion, LogIn, User, Menu, X } from "lucide-react"
import { useState } from "react"

export type NavTab = "store" | "support" | "faq"

const navItems: { label: string; value: NavTab; icon: typeof Store }[] = [
  { label: "Магазин", value: "store", icon: Store },
  { label: "Поддержка", value: "support", icon: HelpCircle },
  { label: "FAQ", value: "faq", icon: MessageCircleQuestion },
]

interface StoreHeaderProps {
  activeTab: NavTab
  onTabChange: (tab: NavTab) => void
  isLoggedIn: boolean
  username?: string
  onLoginClick: () => void
  onLogout: () => void
}

export function StoreHeader({
  activeTab,
  onTabChange,
  isLoggedIn,
  username,
  onLoginClick,
  onLogout,
}: StoreHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="relative">
      <div className="flex items-center justify-between py-5">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/20">
            <span className="text-lg font-extrabold text-primary-foreground">M</span>
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-foreground">MadPum</h1>
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              {"Цифровой магазин"}
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 rounded-2xl border border-border bg-card/60 p-1 backdrop-blur-md md:flex">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => onTabChange(item.value)}
              className={`flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-medium transition-all ${
                activeTab === item.value
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-card/60 px-3 py-2 backdrop-blur-md">
                <User className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-foreground">{username}</span>
              </div>
              <button
                onClick={onLogout}
                className="rounded-xl border border-border bg-card/60 px-3 py-2 text-xs font-medium text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground"
              >
                {"Выйти"}
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">{"Войти"}</span>
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card/60 text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground md:hidden"
            aria-label="Меню"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="absolute left-0 right-0 top-full z-50 flex flex-col gap-1 rounded-2xl border border-border bg-card p-2 shadow-2xl md:hidden">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                onTabChange(item.value)
                setMobileMenuOpen(false)
              }}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                activeTab === item.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}
