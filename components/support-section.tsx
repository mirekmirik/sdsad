import { MessageCircle, Clock, Shield } from "lucide-react"

export function SupportSection() {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
          {"Поддержка"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {"Мы всегда на связи и готовы помочь"}
        </p>
      </div>

      {/* Telegram CTA */}
      <a
        href="https://t.me/vasya1216"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex w-full items-center gap-4 rounded-2xl border-2 border-primary/30 bg-primary/5 p-5 transition-all hover:border-primary/60 hover:bg-primary/10"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-foreground">{"Написать в Telegram"}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{"@vasya1216"}</p>
        </div>
        <svg
          className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>

      {/* Info cards */}
      <div className="grid w-full grid-cols-2 gap-3">
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/60 p-4 text-center backdrop-blur-md">
          <Clock className="h-5 w-5 text-accent" />
          <div>
            <p className="text-xs font-bold text-foreground">{"Время ответа"}</p>
            <p className="text-[11px] text-muted-foreground">{"~30 минут"}</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/60 p-4 text-center backdrop-blur-md">
          <Shield className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs font-bold text-foreground">{"Гарантия"}</p>
            <p className="text-[11px] text-muted-foreground">{"Замена при проблемах"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
