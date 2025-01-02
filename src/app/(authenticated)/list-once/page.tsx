"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Edit, Trash2, ChevronRight, Clock, Calendar, Menu, X, Home, CalendarClock, CalendarPlus, ListTodo, User, LogOut } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type FilterType = "all" | "upcoming" | "past"

// 仮のデータ型定義
interface HouseworkTask {
  id: string
  title: string
  date: string
  time: string
  mainImage?: string
  todo: string
}

export default function OnceList() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("upcoming")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // 仮のデータ
  const [tasks] = useState<HouseworkTask[]>([
    {
      id: "1",
      title: "大掃除",
      date: "2024-12-28",
      time: "10:00",
      mainImage: "/placeholder.jpg",
      todo: "年末の大掃除"
    },
    {
      id: "2",
      title: "窓拭き",
      date: "2024-12-29",
      time: "14:00",
      todo: "全ての窓の清掃"
    },
    {
      id: "3",
      title: "エアコン掃除",
      date: "2024-12-30",
      time: "11:00",
      mainImage: "/placeholder.jpg",
      todo: "フィルター清掃と本体の拭き掃除"
    }
  ])

  const handleDelete = (taskId: string) => {
    console.log("Delete task:", taskId)
    // TODO: 削除の確認ダイアログと削除処理の実装
  }

  const isUpcoming = (date: string) => {
    const taskDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return taskDate >= today
  }

  const filteredTasks = tasks.filter(task => {
    switch (activeFilter) {
      case "upcoming":
        return isUpcoming(task.date)
      case "past":
        return !isUpcoming(task.date)
      default:
        return true
    }
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const filterLabels: Record<FilterType, string> = {
    all: "すべて",
    upcoming: "予定",
    past: "過去"
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ja-JP', { 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '/')
  }

  const handleSignOut = () => {
    // TODO: サインアウト処理の実装
    console.log("Sign out attempt")
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-background relative">
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

      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            className="text-foreground p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">menu</span>
          </button>
          <h1 className="text-2xl font-serif">単発家事一覧</h1>
          <div className="w-10" /> {/* スペーサー */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* 新規登録ボタン */}
            <div className="text-right">
              <Link
                href="/register-once"
                className="inline-flex items-center px-4 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#357ABD] transition-colors"
              >
                新規登録
              </Link>
            </div>

            {/* フィルタータブ */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-4" aria-label="表示フィルター">
                {(Object.keys(filterLabels) as FilterType[]).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`
                      whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm
                      ${activeFilter === filter
                        ? "border-[#4A90E2] text-[#4A90E2]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }
                      transition-colors
                    `}
                  >
                    {filterLabels[filter]}
                    <span className="ml-2 text-xs text-gray-400">
                      {tasks.filter(task => {
                        switch (filter) {
                          case "upcoming":
                            return isUpcoming(task.date)
                          case "past":
                            return !isUpcoming(task.date)
                          default:
                            return true
                        }
                      }).length}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* タスクリスト */}
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      {/* 画像 */}
                      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {task.mainImage ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={task.mainImage}
                              alt={task.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Calendar className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* 詳細情報 */}
                      <div className="flex-grow">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-medium">{task.title}</h3>
                            <div className="mt-1 space-y-1">
                              <p className="text-sm text-gray-600 flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {formatDate(task.date)}
                              </p>
                              <p className="text-sm text-gray-600 flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {task.time}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/edit-once/${task.id}`}
                              className="p-2 text-gray-600 hover:text-[#4A90E2] transition-colors"
                            >
                              <Edit className="h-5 w-5" />
                            </Link>
                            <button
                              onClick={() => handleDelete(task.id)}
                              className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>

                        <p className="mt-2 text-sm text-gray-700">{task.todo}</p>

                        {/* 詳細リンク */}
                        <div className="mt-3 flex justify-end">
                          <Link
                            href={`/once-detail/${task.id}`}
                            className="inline-flex items-center text-sm text-[#4A90E2] hover:text-[#357ABD] transition-colors"
                          >
                            詳細を見る
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* 該当するタスクがない場合 */}
              {filteredTasks.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  {activeFilter === "upcoming" ? "予定されている家事はありません" :
                   activeFilter === "past" ? "過去の家事はありません" :
                   "登録されている家事はありません"}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </main>
    </div>
  )
} 