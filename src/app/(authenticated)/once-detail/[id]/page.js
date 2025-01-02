"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Clock, Calendar, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function OnceDetail({ params }) {
  const [housework] = useState({
    id: params.id,
    title: "大掃除",
    date: "2024-12-28",
    time: "10:00",
    mainImage: "/placeholder.jpg",
    subImages: ["/placeholder.jpg", "/placeholder.jpg"],
    tasks: [
      "窓の清掃",
      "エアコンフィルターの掃除",
      "床の掃除機がけ",
      "床拭き"
    ],
    steps: [
      "窓ガラスクリーナーで拭く",
      "フィルターを外して水洗い",
      "掃除機で床全体を吸引",
      "モップで床を拭く"
    ],
    notes: "換気をしながら作業を行う",
    isCompleted: false
  })

  const handleComplete = () => {
    console.log("Complete task:", params.id)
    // TODO: タスク完了の処理を実装
  }

  const handleIncomplete = () => {
    console.log("Mark as incomplete:", params.id)
    // TODO: タスク未完了の処理を実装
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
              href="/list-once"
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
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>予定日: {formatDate(housework.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>予定時刻: {housework.time}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleComplete}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    完了
                  </button>
                  <button
                    onClick={handleIncomplete}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                  >
                    <XCircle className="h-4 w-4" />
                    未完了
                  </button>
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
          </div>
        </ScrollArea>
      </main>
    </div>
  )
} 