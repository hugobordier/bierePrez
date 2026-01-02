"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NameForm() {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/loser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      })

      if (response.ok) {
        setName("")
        window.location.reload()
      }
    } catch (error) {
      console.error("Error submitting name:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-black/60 rounded-lg border-2 border-amber-600/50 p-8 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-amber-100 text-lg font-bold mb-3 text-center">
            Entre ton prénom pour devenir le prochain connecté
          </label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ton prénom..."
            className="text-lg p-6 bg-black/40 border-amber-700/50 text-amber-100 placeholder:text-amber-700 focus:border-amber-500"
            disabled={loading}
          />
        </div>
        <Button
          type="submit"
          disabled={loading || !name.trim()}
          className="w-full text-xl p-6 bg-amber-600 hover:bg-amber-500 text-white font-bold"
        >
          {loading ? "Connexion..." : "SE CONNECTER"}
        </Button>
      </form>
    </div>
  )
}
