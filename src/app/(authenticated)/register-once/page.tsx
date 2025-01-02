"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { Camera, ChevronDown, X, Calendar } from "lucide-react"
import Link from "next/link"

export default function RegisterOnce() {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [hour, setHour] = useState("00")
  const [minute, setMinute] = useState("00")
  const [mainImage, setMainImage] = useState<string | null>(null)
  const [subImages, setSubImages] = useState<string[]>([])
  const [todo, setTodo] = useState("")
  const [steps, setSteps] = useState("")
  const [details, setDetails] = useState("")

  // 今日の日付をYYYY-MM-DD形式で取得
  const today = new Date().toISOString().split('T')[0]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Registration attempt", {
      title,
      date,
      time: `${hour}:${minute}`,
      mainImage,
      subImages,
      todo,
      steps,
      details
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isMain: boolean) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (isMain) {
          setMainImage(reader.result as string)
        } else {
          setSubImages(prev => [...prev, reader.result as string].slice(0, 3))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
  const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, "0"))

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-serif text-center">単発家事の登録</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <ScrollArea className="h-[calc(100vh-100px)]">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
            {/* タイトル */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium">
                家事のタイトル<span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* 日付と時間 */}
            <div className="space-y-4">
              {/* 日付選択 */}
              <div className="space-y-2">
                <label htmlFor="date" className="block text-sm font-medium">
                  実施日<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="date"
                    type="date"
                    required
                    min={today}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] appearance-none"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* 時間選択 */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  実施時間<span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2 items-center">
                  <div className="relative">
                    <select
                      value={hour}
                      onChange={(e) => setHour(e.target.value)}
                      className="appearance-none px-4 py-2 pr-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] bg-white"
                    >
                      {hours.map(h => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                  <span>:</span>
                  <div className="relative">
                    <select
                      value={minute}
                      onChange={(e) => setMinute(e.target.value)}
                      className="appearance-none px-4 py-2 pr-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] bg-white"
                    >
                      {minutes.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* 画像アップロード */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  メイン写真
                  <span className="text-sm text-gray-500 ml-2">推奨: 16:9の画像</span>
                </label>
                <div className="relative aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg overflow-hidden group hover:border-[#4A90E2] transition-colors">
                  {mainImage ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={mainImage}
                        alt="Main preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setMainImage(null)}
                        className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                      <Camera className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">クリックして写真を追加</span>
                      <span className="text-xs text-gray-400 mt-1">または画像をドラッグ＆ドロップ</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, true)}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  サブ写真
                  <span className="text-sm text-gray-500 ml-2">最大3枚まで</span>
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {Array.from({ length: 3 }, (_, i) => (
                    <div key={i} className="relative aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg overflow-hidden group hover:border-[#4A90E2] transition-colors">
                      {subImages[i] ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={subImages[i]}
                            alt={`Sub preview ${i + 1}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setSubImages(prev => prev.filter((_, index) => index !== i))}
                            className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                          <Camera className="h-6 w-6 text-gray-400 mb-1" />
                          <span className="text-xs text-gray-500">写真を追加</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, false)}
                          />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* やること */}
            <div className="space-y-2">
              <label htmlFor="todo" className="block text-sm font-medium">
                やること
                <span className="text-sm text-gray-500 ml-2">家事の概要</span>
              </label>
              <textarea
                id="todo"
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="例：洗濯物を分別して洗う"
              />
            </div>

            {/* 手順 */}
            <div className="space-y-2">
              <label htmlFor="steps" className="block text-sm font-medium">
                手順
                <span className="text-sm text-gray-500 ml-2">具体的な実施手順</span>
              </label>
              <textarea
                id="steps"
                rows={5}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder="例：&#13;&#10;1. 色物と白物を分ける&#13;&#10;2. 洗剤を適量入れる&#13;&#10;3. 洗濯機を設定して開始"
              />
            </div>

            {/* その他詳細 */}
            <div className="space-y-2">
              <label htmlFor="details" className="block text-sm font-medium">
                その他詳細
                <span className="text-sm text-gray-500 ml-2">補足情報</span>
              </label>
              <textarea
                id="details"
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="例：柔軟剤は〇〇を使用、水温は30度"
              />
            </div>

            {/* 登録ボタン */}
            <div className="pt-8 flex gap-4">
              <Link
                href="/main"
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center"
              >
                登録せず戻る
              </Link>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-[#4A90E2] text-white rounded-lg hover:bg-[#357ABD] transition-colors"
              >
                登録する
              </button>
            </div>
          </form>
        </ScrollArea>
      </main>
    </div>
  )
} 