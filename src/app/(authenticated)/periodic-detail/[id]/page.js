"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Clock, RotateCcw, CheckCircle2, XCircle, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PeriodicDetail({ params }) {
  // 仮のデータ
  const [housework] = useState({
    id: params.id,
    title: "洗濯",
    time: "08:00",
    recurrence: {
      type: "daily",
      interval: 1,
      description: "毎日",
      weekdays: [1, 3, 5]
    },
    mainImage: "/placeholder.jpg",
    subImages: ["/placeholder.jpg", "/placeholder.jpg"],
    tasks: [
      "洗濯物を分別する",
      "洗剤を適量入れる",
      "洗濯機を回す",
      "干す"
    ],
    steps: [
      "色物と白物を分ける",
      "洗剤を2スプーン入れる",
      "標準コースで洗濯",
      "しわにならないように干す"
    ],
    notes: "柔軟剤は必要に応じて使用",
    executionHistory: [
      { date: "2024-01-20", time: "08:00", isCompleted: true },
      { date: "2024-01-19", time: "08:15", isCompleted: true },
      { date: "2024-01-18", time: "08:00", isCompleted: false },
      { date: "2024-01-17", time: "08:00", isCompleted: true },
    ],
    nextDue: "2024-01-21"
  })

  const handleUpdateStatus = (date, isCompleted) => {
    console.log("Update status:", { date, isCompleted })
    // TODO: 実行履歴のステータス更新処理を実装
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ja-JP', { 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '/')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/list-periodic"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-serif">{housework.title}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* 実行ステータス */}
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-semibold">実行ステータス</h2>
              <div className="flex items-center gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>予定時刻: {housework.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4 text-gray-500" />
                    <span>{housework.recurrence.description}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>次回予定: {formatDate(housework.nextDue || '')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* メイン画像 */}
            {housework.mainImage && (
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                <h2 className="text-lg font-semibold">メイン画像</h2>
                <div className="relative aspect-video">
                  <Image
                    src={housework.mainImage}
                    alt={housework.title}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            )}

            {/* サブ画像 */}
            {housework.subImages && housework.subImages.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                <h2 className="text-lg font-semibold">サブ画像</h2>
                <div className="grid grid-cols-2 gap-4">
                  {housework.subImages.map((image, index) => (
                    <div key={index} className="relative aspect-video">
                      <Image
                        src={image}
                        alt={`${housework.title} - サブ画像 ${index + 1}`}
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* タスク一覧 */}
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-semibold">タスク一覧</h2>
              <ul className="list-disc list-inside space-y-2">
                {housework.tasks.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>
            </div>

            {/* 手順 */}
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-semibold">手順</h2>
              <ol className="list-decimal list-inside space-y-2">
                {housework.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            {/* 備考 */}
            {housework.notes && (
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                <h2 className="text-lg font-semibold">備考</h2>
                <p>{housework.notes}</p>
              </div>
            )}

            {/* 実行履歴 */}
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-semibold">実行履歴</h2>
              <div className="space-y-4">
                {housework.executionHistory.map((record, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="font-medium">{formatDate(record.date)}</div>
                      <div className="text-sm text-gray-500">{record.time}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateStatus(record.date, true)}
                        className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-sm ${
                          record.isCompleted
                            ? 'bg-green-500 text-white'
                            : 'text-green-600 bg-green-50 hover:bg-green-100'
                        } transition-colors`}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        完了
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(record.date, false)}
                        className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-sm ${
                          !record.isCompleted
                            ? 'bg-red-500 text-white'
                            : 'text-red-600 bg-red-50 hover:bg-red-100'
                        } transition-colors`}
                      >
                        <XCircle className="h-4 w-4" />
                        未完了
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </main>
    </div>
  )
} 