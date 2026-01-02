import { LoserDisplay } from "@/components/loser-display"
import { NameForm } from "@/components/name-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-amber-950 relative flex flex-col items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url(/beer-background.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

      <div className="relative z-10 w-full max-w-2xl space-y-8">
        <LoserDisplay />
        <NameForm />
      </div>
    </main>
  )
}
