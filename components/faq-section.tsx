"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqItems = [
  {
    question: "Что такое бизнес-профиль?",
    answer:
      "Бизнес-профиль — это прокачанный аккаунт TikTok с возможностью вставки кликабельной ссылки в био. Идеально подходит для арбитража, продвижения товаров и услуг.",
  },
  {
    question: "Как быстро я получу профиль?",
    answer:
      "Доставка происходит автоматически в течение 5 минут после оплаты. Данные для входа придут вам на почту и в личный кабинет.",
  },
  {
    question: "Есть ли гарантия?",
    answer:
      "Да! На тариф Business Lifetime предоставляется пожизненная гарантия. Если профиль будет заблокирован по нашей вине, мы заменим его бесплатно.",
  },
  {
    question: "Какие способы оплаты доступны?",
    answer:
      "Мы принимаем банковские карты, криптовалюту и электронные кошельки. Все платежи проходят через защищённый шлюз.",
  },
  {
    question: "Можно ли использовать профиль для личных целей?",
    answer:
      "Конечно! Тариф Starter Profile создан специально для личного использования — просмотры, лайки и базовые функции TikTok.",
  },
  {
    question: "Как связаться с поддержкой?",
    answer:
      "Напишите нам в Telegram: @vasya1216. Мы отвечаем в течение 30 минут в рабочее время.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-3">
      <div className="mb-2 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
          {"Частые вопросы"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {"Ответы на популярные вопросы наших клиентов"}
        </p>
      </div>

      <div className="flex flex-col gap-2">
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
