"use client"

import { useEffect, useState } from "react"
import { Calendar, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CountdownTimerProps {
  targetDate: Date
}

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({ targetDate: initialTargetDate }: CountdownTimerProps) {
  const [targetDate, setTargetDate] = useState<Date>(initialTargetDate)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [newDate, setNewDate] = useState<string>(initialTargetDate.toISOString().split("T")[0])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const handleDateChange = () => {
    const date = new Date(newDate)
    if (!isNaN(date.getTime())) {
      setTargetDate(date)
    }
  }

  const timeUnits = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ]

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {timeUnits.map((unit, index) => (
          <TimeUnit
            key={unit.label}
            label={unit.label}
            value={unit.value}
            className={cn(
              "from-pink-500 to-purple-600",
              index === 1 && "from-purple-600 to-blue-500",
              index === 2 && "from-blue-500 to-teal-400",
              index === 3 && "from-teal-400 to-green-500",
            )}
          />
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-white/20 text-white border-white/30 hover:bg-white/30 hover:text-white"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Cambiar fecha objetivo
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cambiar fecha objetivo</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Nueva fecha</Label>
              <Input id="date" type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
            </div>
            <Button onClick={handleDateChange}>Actualizar fecha</Button>
          </div>
        </DialogContent>
      </Dialog>

      <p className="mt-4 text-white/80 flex items-center justify-center">
        <Clock className="mr-2 h-4 w-4" />
        Fecha objetivo: {targetDate.toLocaleDateString()}
      </p>
    </div>
  )
}

interface TimeUnitProps {
  label: string
  value: number
  className?: string
}

function TimeUnit({ label, value, className }: TimeUnitProps) {
  return (
    <Card className={cn("bg-gradient-to-br p-0.5 shadow-xl animate-pulse", className)}>
      <div className="bg-black/30 backdrop-blur-sm rounded-[inherit] p-4 h-full flex flex-col items-center justify-center">
        <span className="text-4xl md:text-6xl font-bold text-white">{value.toString().padStart(2, "0")}</span>
        <span className="text-white/80 text-sm md:text-base mt-2">{label}</span>
      </div>
    </Card>
  )
}
