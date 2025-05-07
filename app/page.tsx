import { CountdownTimer } from "@/components/countdown-timer"

export default function Home() {
  // Fecha objetivo: 15 de junio de 2025
  const targetDate = new Date("2025-06-15T00:00:00")

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
      <div className="w-full max-w-4xl text-center">
        <h1 className="mb-8 text-4xl font-bold text-white md:text-6xl drop-shadow-lg">Cuenta regresiva - Salida del Sena: Libertad</h1>
        <CountdownTimer targetDate={targetDate} />
        <p className="mt-8 text-xl text-white opacity-90">¡Esperando con ansias el 15 de junio de 2025!</p>
      </div>
    </main>
  )
}
