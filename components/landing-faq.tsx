"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqItems = [
  {
    question: "Что такое прогретый бизнес-аккаунт?",
    answer:
      "Это аккаунт TikTok, который прошёл этап прогрева: регулярная активность, просмотры, подписки. Бизнес-аккаунт имеет доступ к кликабельной ссылке в Bio, что важно для арбитража трафика и продвижения товаров.",
  },
  {
    question: "Чем бизнес-аккаунт отличается от обычного?",
    answer:
      "Бизнес-аккаунт позволяет добавить кликабельную ссылку в Bio, даёт доступ к расширенной аналитике и Creative Center. Обычный аккаунт таких функций не имеет до определённого количества подписчиков.",
  },
  {
    question: "Какую страну лучше выбрать для арбитража?",
    answer:
      "Зависит от оффера. Для англоязычных офферов подходят США, Канада, Великобритания. Для Европы — Германия, Франция. Для тестов и масштабирования с ограниченным бюджетом — Турция, Бразилия. Мы рекомендуем начать с США или Канады для максимального CPM.",
  },
  {
    question: "Как долго живут аккаунты?",
    answer:
      "При правильном использовании аккаунты живут от 3 месяцев до нескольких лет. На тариф Business Lifetime действует пожизненная гарантия: если аккаунт будет заблокирован по нашей вине, мы заменим его бесплатно.",
  },
  {
    question: "Какие способы оплаты вы принимаете?",
    answer:
      "Мы принимаем банковские карты (МИР, Visa, Mastercard) и криптовалюту (Bitcoin, USDT). Все платежи защищены SSL-шифрованием. Оплата проходит через безопасный платёжный шлюз.",
  },
  {
    question: "Как быстро я получу аккаунт?",
    answer:
      "Доставка происходит автоматически в течение 5 минут после подтверждения оплаты. Данные для входа придут в личный кабинет. Поддержка работает 24/7 в Telegram.",
  },
  {
    question: "Можно ли использовать аккаунт с телефона?",
    answer:
      "Да, аккаунт полностью функционален на любых устройствах: Android, iOS, а также через веб-версию TikTok. Мы предоставим подробную инструкцию по безопасному входу.",
  },
  {
    question: "Что делать, если аккаунт заблокировали?",
    answer:
      "Свяжитесь с нашей поддержкой в Telegram. На тарифе Business Lifetime мы бесплатно заменим аккаунт, если блокировка произошла по нашей вине. Также мы даём рекомендации по безопасному использованию.",
  },
]

export function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-3">
      <div className="mb-4 text-center">
        <h3 className="text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          {"Часто задаваемые вопросы"}
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
          {"Ответы на самые популярные вопросы о наших аккаунтах и сервисе"}
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-col gap-2">
        {faqItems.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-md transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-secondary/30"
              >
                <span className="text-sm font-semibold text-foreground">{item.question}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-border/50 px-5 py-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
