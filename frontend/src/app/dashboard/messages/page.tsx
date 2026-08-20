"use client"

import * as React from "react"
import Link from "next/link"
import {
  Phone,
  MoreVertical,
  Plus,
  Smile,
  Send,
  Calendar,
  Car,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function MessagesPage() {
  const [inputText, setInputText] = React.useState("")
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      sender: "customer",
      text: "Hi, I need help with a leaking socket. It started sparking earlier.",
      time: "10:42 AM",
    },
    {
      id: 2,
      sender: "trader",
      text: "Sure, I can help with that. That sounds like a potential safety issue. What day would work best for you for a visit?",
      time: "10:43 AM",
    },
    {
      id: 3,
      sender: "customer",
      text: "Tomorrow around 11:00 AM would be perfect.",
      time: "10:45 AM",
    },
    {
      id: 4,
      sender: "trader",
      text: "I found an available slot at 11:30 AM tomorrow. Would you like to secure this time?",
      time: "10:46 AM",
      hasSlotCard: true,
    },
  ])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "customer",
        text: inputText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ])
    setInputText("")
  }

  return (
    <>
      <DashboardHeader title="Messages" showSearch={false} />

      <main className="flex-1 flex flex-col h-[calc(100vh-4rem)] max-w-4xl w-full mx-auto bg-white border-x border-slate-100 shadow-sm">
        {/* Chat Participant Header */}
        <div className="px-6 py-3.5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=120&h=120&q=80"
              alt="Jordan Mitchell"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100"
            />
            <div>
              <h3 className="font-display font-bold text-sm text-slate-900 leading-tight">
                Jordan Mitchell
              </h3>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <span>Electrician</span>
                <span>•</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  AVAILABLE TODAY
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500 hover:text-slate-700">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500 hover:text-slate-700">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chat Message Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Center Date Pill */}
          <div className="flex justify-center">
            <span className="bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              TODAY
            </span>
          </div>

          {messages.map((msg) => {
            const isCustomer = msg.sender === "customer"

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isCustomer ? "items-end" : "items-start"}`}
              >
                <div className="flex items-end gap-2.5 max-w-[80%]">
                  {!isCustomer && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=80&h=80&q=80"
                      alt="Jordan"
                      className="h-6 w-6 rounded-full object-cover shrink-0 mb-1 ring-1 ring-slate-200"
                    />
                  )}

                  <div className="space-y-2 w-full">
                    {/* Speech bubble */}
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        isCustomer
                          ? "bg-[#0b1329] text-white rounded-br-none"
                          : "bg-slate-100 text-slate-800 rounded-bl-none"
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>

                    {/* Embedded Booking Slot Card */}
                    {msg.hasSlotCard && (
                      <div className="bg-white border-2 border-emerald-500/40 rounded-2xl p-5 shadow-lg max-w-xs space-y-3 mt-2">
                        <div className="flex items-center justify-between text-emerald-600 font-bold text-[10px] uppercase tracking-wider">
                          <span className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            AVAILABLE SLOT
                          </span>
                          <Calendar className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="text-xs text-slate-500">Tomorrow</p>
                          <h4 className="font-display text-2xl font-extrabold text-slate-900 mt-0.5">
                            11:30 AM
                          </h4>
                        </div>

                        <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-100">
                          <span className="text-slate-500">Booking fee</span>
                          <span className="font-bold text-slate-900">£25.00</span>
                        </div>

                        <div className="bg-emerald-50/70 text-emerald-700 font-bold text-[10px] px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 uppercase tracking-wide">
                          <Car className="h-3 w-3" />
                          20 MIN TRAVEL BUFFER INCLUDED
                        </div>

                        <div className="space-y-1.5 pt-1">
                          <Link href="/dashboard/book/secure" className="w-full block">
                            <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs h-9 rounded-xl shadow-sm shadow-emerald-600/20">
                              Confirm slot
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            className="w-full border-slate-200 text-slate-700 text-xs h-9 rounded-xl hover:bg-slate-50"
                          >
                            Choose another time
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            )
          })}
        </div>

        {/* Input Bar & Sync Footnote */}
        <div className="p-4 border-t border-slate-100 bg-white shrink-0 space-y-2">
          <form onSubmit={handleSend} className="relative flex items-center">
            <button
              type="button"
              className="absolute left-3 h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>

            <input
              type="text"
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/90 rounded-full pl-12 pr-24 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            />

            <div className="absolute right-2 flex items-center gap-1">
              <button
                type="button"
                className="h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600"
              >
                <Smile className="h-4 w-4" />
              </button>
              <button
                type="submit"
                className="h-8 w-8 rounded-full bg-[#0b1329] text-white flex items-center justify-center hover:bg-slate-800 transition-colors shadow-sm"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>

          <p className="text-[11px] text-slate-400 text-center">
            Messages are synced with WhatsApp in real-time.
          </p>
        </div>
      </main>
    </>
  )
}
