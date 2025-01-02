"use client"

import { Menu, LogOut, X, Home, CalendarPlus, CalendarClock, ListTodo, User } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link"

const initialTasks = [
  { id: 1, title: "朝の掃除", date: "08:00", status: "done", selected: false },
  { id: 2, title: "洗濯", subtitle: "タオルと衣類を分けて洗う", date: "09:30", status: "done", selected: false },
  { id: 3, title: "食器洗い", subtitle: "朝食の後片付け", date: "10:00", status: "incomplete", selected: false },
  { id: 4, title: "部屋の換気", subtitle: "15分程度窓を開ける", date: "11:00", status: "done", selected: true },
  { id: 5, title: "植物の水やり", subtitle: "室内の観葉植物全て", date: "12:00", status: "incomplete", selected: false }
]

export default function AuthenticatedHome() {
  const [tasks, setTasks] = useState(initialTasks)
  const [selectedTask, setSelectedTask] = useState(tasks.find(task => task.selected) || tasks[0])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)

      if (now.getDate() !== currentDate.getDate()) {
        setCurrentDate(now)
        window.location.reload()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [currentDate])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', { 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '/')
  }

  const toggleStatus = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === "done" ? "incomplete" : "done" }
        : task
    ))
  }

  const selectTask = (task: typeof tasks[0]) => {
    setTasks(tasks.map(t => 
      ({ ...t, selected: t.id === task.id })
    ))
    setSelectedTask(task)
  }

  const handleSignOut = () => {
    // ここにサインアウトのロジックを実装予定
    console.log("Sign out attempt")
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* オーバーレイ */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* サイドメニュー */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <button 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">close menu</span>
          </button>
          <div className="mt-4">
            <h2 className="text-lg font-serif mb-4">Menu</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/main"
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Home className="h-4 w-4" />
                  メイン画面
                </Link>
              </li>
              <li>
                <Link
                  href="/register-periodic"
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <CalendarClock className="h-4 w-4" />
                  家事登録（定期）
                </Link>
              </li>
              <li>
                <Link
                  href="/register-once"
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <CalendarPlus className="h-4 w-4" />
                  家事登録（単発）
                </Link>
              </li>
              <li>
                <Link
                  href="/list-periodic"
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <ListTodo className="h-4 w-4" />
                  登録済み家事一覧（定期）
                </Link>
              </li>
              <li>
                <Link
                  href="/list-once"
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <ListTodo className="h-4 w-4" />
                  登録済み家事一覧（単発）
                </Link>
              </li>
              <li>
                <Link
                  href="/account-settings"
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <User className="h-4 w-4" />
                  アカウント設定
                </Link>
              </li>
              <li className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 p-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-red-500 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  サインアウト
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ヘッダー */}
      <header className="border-b relative z-30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            className="text-foreground p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">menu</span>
          </button>
          <div className="text-center">
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <span>{formatDate(currentDate)}</span>
              <span className="w-[2px] h-[2px] rounded-full bg-muted-foreground" />
              <span>{currentTime.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <h1 className="text-2xl font-serif">Today&apos;s housework</h1>
          </div>
          <div className="w-[88px]" /> {/* ヘッダーの左右対称を保つためのスペーサー */}
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="container mx-auto px-4 flex-1 grid md:grid-cols-[1fr,2px,1fr] gap-6 overflow-hidden">
        {/* 家事リスト */}
        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="py-6 pr-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`mb-4 flex gap-4 p-4 rounded-lg transition-colors cursor-pointer ${
                  task.selected ? "bg-[#F0F7FF] dark:bg-blue-950" : ""
                }`}
                onClick={() => selectTask(task)}
              >
                <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                  <Image
                    src="/placeholder.svg"
                    alt=""
                    width={96}
                    height={96}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg">{task.title}</h3>
                  {task.subtitle && <p className="text-muted-foreground mt-1">{task.subtitle}</p>}
                  <p className="text-sm text-muted-foreground mt-2">{task.date}</p>
                </div>
                <button
                  className={`h-8 px-4 rounded-[4px] self-start transition-colors ${
                    task.status === "done"
                      ? "bg-[#4CAF50] text-white hover:bg-[#43A047]"
                      : "bg-[#9E9E9E] text-white hover:bg-[#757575]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleStatus(task.id)
                  }}
                >
                  {task.status === "done" ? "Done!" : "incomplete"}
                </button>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* 区切り線 */}
        <div className="hidden md:block w-[2px] bg-[#E0E0E0] dark:bg-[#333333] self-stretch my-6" />

        {/* 家事詳細 */}
        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="py-6 pl-4">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-1">Detail</p>
              <h2 className="text-3xl font-serif">{selectedTask.title}</h2>
            </div>

            <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
              <Image
                src="/placeholder.svg"
                alt="Main detail image"
                width={800}
                height={450}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Image
                    src="/placeholder.svg"
                    alt={`Thumbnail ${i}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-serif text-xl mb-4">specifications</h3>
              <p className="text-muted-foreground mb-2">{selectedTask.subtitle || "No specifications available"}</p>
              {/* スクロールのテスト用に追加のコンテンツ */}
              <div className="mt-8">
                <h4 className="font-serif text-lg mb-2">Additional Information</h4>
                {Array.from({ length: 5 }).map((_, i) => (
                  <p key={i} className="text-muted-foreground mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
} 