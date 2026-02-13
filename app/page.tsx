import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Users,
  Star,
  ChevronDown,
  CreditCard,
  Lock,
  CheckCircle2,
  MessageCircle,
} from "lucide-react"
import { TikTokBackground } from "@/components/tiktok-background"
import { StoreFooter } from "@/components/store-footer"
import { LandingFaq } from "@/components/landing-faq"

const countries = [
  {
    flag: "🇺🇸",
    name: "США",
    description: "Самая популярная гео. Подходит для англоязычного арбитража и продвижения товаров на западный рынок.",
    tag: "Топ выбор",
  },
  {
    flag: "🇨🇦",
    name: "Канада",
    description: "Высокий CPM, платёжеспособная аудитория. Идеально для e-commerce и nutra-офферов.",
    tag: "Высокий CPM",
  },
  {
    flag: "🇬🇧",
    name: "Великобритания",
    description: "Англоязычный трафик с высокой конверсией. Хорошо для финансов и гемблинга.",
    tag: "Конверсия",
  },
  {
    flag: "🇩🇪",
    name: "Германия",
    description: "Крупнейший рынок Европы. Подходит для товарки и криптовалютных офферов.",
    tag: "Европа",
  },
  {
    flag: "🇧🇷",
    name: "Бразилия",
    description: "Огромная аудитория TikTok. Низкая конкуренция и быстрый рост аккаунтов.",
    tag: "Рост",
  },
  {
    flag: "🇹🇷",
    name: "Турция",
    description: "Доступные цены при высокой активности аудитории. Подходит для тестов и масштабирования.",
    tag: "Бюджетный",
  },
]

const features = [
  {
    icon: Shield,
    title: "Пожизненная гарантия",
    description: "На тариф Business Lifetime действует гарантия замены при блокировке по нашей вине.",
  },
  {
    icon: Zap,
    title: "Моментальная доставка",
    description: "Аккаунт будет доставлен автоматически в течение 5 минут после оплаты.",
  },
  {
    icon: Globe,
    title: "35+ стран",
    description: "Выбирайте из более чем 35 гео для максимальной эффективности вашего трафика.",
  },
  {
    icon: Lock,
    title: "Безопасные платежи",
    description: "Принимаем карты МИР и Bitcoin. Все транзакции защищены SSL-шифрованием.",
  },
]

const stats = [
  { value: "12K+", label: "Клиентов" },
  { value: "4.9", label: "Рейтинг" },
  { value: "<5м", label: "Доставка" },
  { value: "35+", label: "Стран" },
]

const reviews = [
  {
    name: "Алексей М.",
    text: "Купил бизнес-аккаунт для арбитража. Ссылка работает, аккаунт стабильный. Рекомендую!",
    rating: 5,
  },
  {
    name: "Дмитрий К.",
    text: "Доставка за 2 минуты, поддержка ответила мгновенно. Уже третий аккаунт беру.",
    rating: 5,
  },
  {
    name: "Анна В.",
    text: "Отличное качество прогрева. Аккаунт живёт уже 3 месяца без проблем.",
    rating: 5,
  },
]

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <TikTokBackground />

      <div className="relative z-10">
        {/* Header */}
        <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
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

          <Link
            href="/store"
            className="flex items-center gap-2 rounded-xl bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary/20"
          >
            {"Магазин"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </header>

        {/* Hero Section */}
        <section className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Zap className="h-3.5 w-3.5" />
              {"Прогретые TikTok аккаунты"}
            </div>

            <h2 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {"Бизнес-аккаунты TikTok "}
              <span className="text-primary">{"с кликабельной ссылкой"}</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {"Готовые прогретые профили из 35+ стран мира. Идеально для арбитража трафика, продвижения товаров и услуг. Моментальная доставка и пожизненная гарантия на бизнес-аккаунты."}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/store"
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary px-10 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {"Перейти к покупке"}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </span>
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <a
                href="#countries"
                className="flex items-center gap-2 rounded-2xl border border-border bg-card/60 px-8 py-4 text-sm font-bold text-foreground backdrop-blur-md transition-all hover:bg-secondary active:scale-[0.98]"
              >
                {"Узнать больше"}
                <ChevronDown className="h-4 w-4" />
              </a>
            </div>

            {/* Stats */}
            <div className="mt-14 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span className="text-2xl font-extrabold text-foreground sm:text-3xl">{stat.value}</span>
                  <span className="mt-1 text-xs text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <div className="text-center">
            <h3 className="text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              {"Почему выбирают нас"}
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              {"Мы предлагаем лучшее качество и сервис на рынке"}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-md transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="mt-4 text-base font-bold text-foreground">{feature.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Countries Section */}
        <section id="countries" className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <div className="text-center">
            <h3 className="text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              {"Какая страна подойдёт вам?"}
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              {"Выбирайте гео в зависимости от вашей ниши и целевой аудитории"}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map((country) => (
              <div
                key={country.name}
                className="group rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-md transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{country.flag}</span>
                    <h4 className="text-base font-bold text-foreground">{country.name}</h4>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
                    {country.tag}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{country.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/store"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              {"Посмотреть все доступные страны"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <div className="text-center">
            <h3 className="text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              {"Удобные способы оплаты"}
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              {"Выбирайте удобный для вас способ оплаты"}
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-md gap-4 sm:grid-cols-2">
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card/80 p-8 backdrop-blur-md transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
              <Image
                src="/images/mir.png"
                alt="МИР"
                width={120}
                height={42}
                className="h-10 w-auto object-contain"
              />
              <div className="text-center">
                <h4 className="text-sm font-bold text-foreground">{"Банковская карта"}</h4>
                <p className="mt-1 text-xs text-muted-foreground">{"Карта МИР, Visa, Mastercard"}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card/80 p-8 backdrop-blur-md transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
              <Image
                src="/images/btc.png"
                alt="Bitcoin"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <div className="text-center">
                <h4 className="text-sm font-bold text-foreground">{"Криптовалюта"}</h4>
                <p className="mt-1 text-xs text-muted-foreground">{"Bitcoin, USDT"}</p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5 text-accent" />
              {"SSL защита"}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CreditCard className="h-3.5 w-3.5 text-primary" />
              {"Безопасные платежи"}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <div className="text-center">
            <h3 className="text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              {"Отзывы клиентов"}
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              {"Нам доверяют более 12 000 клиентов"}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-md"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {`"${review.text}"`}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-foreground">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <LandingFaq />
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <div className="rounded-3xl border border-primary/20 bg-card/80 px-6 py-10 text-center backdrop-blur-md sm:px-12">
            <h3 className="text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              {"Готовы начать?"}
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {"Выберите подходящий тариф и получите свой бизнес-аккаунт TikTok уже через 5 минут. Более 12 000 довольных клиентов не могут ошибаться."}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/store"
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary px-10 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {"Перейти к покупке"}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </span>
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                {"Поддержка 24/7 в Telegram"}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                {"Мгновенная доставка"}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                {"Гарантия замены"}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                {"Карта МИР & Bitcoin"}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <StoreFooter />
        </div>
      </div>
    </div>
  )
}
