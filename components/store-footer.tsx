import { Mail, ShieldCheck, Lock, Truck } from "lucide-react"

export function StoreFooter() {
  return (
    <footer className="mt-10 pb-10 pt-6">
      <div className="flex flex-col items-center gap-6 text-center">
        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            {"Безопасная оплата"}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md">
            <Truck className="h-3.5 w-3.5 text-primary" />
            {"Мгновенная доставка"}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md">
            <Lock className="h-3.5 w-3.5 text-accent" />
            {"SSL защита"}
          </div>
        </div>

        <div className="flex items-center gap-5 text-xs">
          <a
            href="#"
            className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            {"Условия использования"}
          </a>
          <span className="text-border">|</span>
          <a
            href="#"
            className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            {"Политика конфиденциальности"}
          </a>
        </div>

        <a
          href="mailto:madpumsup@gmail.com"
          className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <Mail className="h-3.5 w-3.5" />
          madpumsup@gmail.com
        </a>

        <p className="text-[11px] text-muted-foreground/50">
          {"© 2026 MadPum Store. Все права защищены."}
        </p>
      </div>
    </footer>
  )
}
