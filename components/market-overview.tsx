"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"

const marketData = [
  { name: "Mon", dragons: 4000, teleporters: 2400, crystals: 2400, invisibility: 1200, potions: 800, gravity: 1600 },
  { name: "Tue", dragons: 3000, teleporters: 1398, crystals: 2800, invisibility: 1100, potions: 900, gravity: 1700 },
  { name: "Wed", dragons: 2000, teleporters: 9800, crystals: 2900, invisibility: 900, potions: 1000, gravity: 1400 },
  { name: "Thu", dragons: 2780, teleporters: 3908, crystals: 2600, invisibility: 1500, potions: 1100, gravity: 1200 },
  { name: "Fri", dragons: 1890, teleporters: 4800, crystals: 2700, invisibility: 1700, potions: 1200, gravity: 1100 },
  { name: "Sat", dragons: 2390, teleporters: 3800, crystals: 3100, invisibility: 1400, potions: 1300, gravity: 1300 },
  { name: "Sun", dragons: 3490, teleporters: 4300, crystals: 3400, invisibility: 1300, potions: 1400, gravity: 1500 },
]

const sectorData = [
  { name: "Magical", value: 35 },
  { name: "Tech", value: 25 },
  { name: "Potions", value: 15 },
  { name: "Artifacts", value: 10 },
  { name: "Creatures", value: 15 },
]

const colors = {
  dragons: "#f59e0b",
  teleporters: "#8b5cf6",
  crystals: "#10b981",
  invisibility: "#3b82f6",
  potions: "#ec4899",
  gravity: "#f97316",
}

export default function MarketOverview() {
  const [timeframe, setTimeframe] = useState("week")

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Market Overview</CardTitle>
          <Tabs defaultValue="week" value={timeframe} onValueChange={setTimeframe} className="w-[300px]">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={marketData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorDragons" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.dragons} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colors.dragons} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTeleporters" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.teleporters} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colors.teleporters} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCrystals" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.crystals} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colors.crystals} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="dragons"
                stroke={colors.dragons}
                fillOpacity={1}
                fill="url(#colorDragons)"
                name="Dragon Eggs"
              />
              <Area
                type="monotone"
                dataKey="teleporters"
                stroke={colors.teleporters}
                fillOpacity={1}
                fill="url(#colorTeleporters)"
                name="Teleporters"
              />
              <Area
                type="monotone"
                dataKey="crystals"
                stroke={colors.crystals}
                fillOpacity={1}
                fill="url(#colorCrystals)"
                name="Time Crystals"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Market Cap</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">326.5B</p>
                <p className="text-sm text-green-600 font-medium mt-1">+2.4% today</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Trading Volume</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">27.3M</p>
                <p className="text-sm text-red-600 font-medium mt-1">-1.2% today</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Fantasy Index</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">12,432</p>
                <p className="text-sm text-green-600 font-medium mt-1">+156 points</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
