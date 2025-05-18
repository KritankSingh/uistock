"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import StockCard from "@/components/stock-card"
import TrendingStocks from "@/components/trending-stocks"
import MarketOverview from "@/components/market-overview"

// Fictional stock data
const stocks = [
  {
    id: 1,
    name: "Dragon Eggs",
    symbol: "DRGEGG",
    price: 4289.75,
    change: 12.43,
    changePercent: 2.91,
    marketCap: "89.2B",
    volume: "1.2M",
    color: "from-amber-400 to-orange-600",
    description:
      "Rare dragon eggs from the mystical mountains of Dracarys. Each egg hatches into a unique dragon species.",
    history: [3800, 3950, 3800, 4100, 4000, 4200, 4289.75],
  },
  {
    id: 2,
    name: "Teleporters",
    symbol: "TPORT",
    price: 1567.32,
    change: -45.68,
    changePercent: -2.83,
    marketCap: "42.7B",
    volume: "3.4M",
    color: "from-purple-500 to-indigo-700",
    description: "Personal teleportation devices with a range of up to 1000 miles. Battery life: 50 jumps per charge.",
    history: [1700, 1650, 1620, 1590, 1610, 1580, 1567.32],
  },
  {
    id: 3,
    name: "Time Crystals",
    symbol: "TMCRY",
    price: 8932.14,
    change: 321.87,
    changePercent: 3.74,
    marketCap: "156.3B",
    volume: "892K",
    color: "from-emerald-400 to-teal-700",
    description:
      "Rare crystals that can slow down or speed up time in a localized area. Limited to 24 hours of manipulation.",
    history: [8200, 8350, 8500, 8400, 8600, 8700, 8932.14],
  },
  {
    id: 4,
    name: "Invisibility Cloaks",
    symbol: "INVIS",
    price: 763.29,
    change: -12.71,
    changePercent: -1.64,
    marketCap: "18.9B",
    volume: "5.1M",
    color: "from-blue-400 to-cyan-600",
    description:
      "Premium cloaks that bend light around the wearer, rendering them completely invisible for up to 12 hours.",
    history: [790, 785, 770, 775, 780, 768, 763.29],
  },
  {
    id: 5,
    name: "Memory Potions",
    symbol: "MEMPOT",
    price: 342.18,
    change: 15.42,
    changePercent: 4.72,
    marketCap: "7.3B",
    volume: "12.7M",
    color: "from-pink-400 to-rose-600",
    description:
      "Elixirs that can enhance memory or selectively erase specific memories. Popular among students and ex-partners.",
    history: [310, 315, 325, 330, 335, 338, 342.18],
  },
  {
    id: 6,
    name: "Gravity Boots",
    symbol: "GRVBT",
    price: 529.87,
    change: -8.13,
    changePercent: -1.51,
    marketCap: "12.1B",
    volume: "4.3M",
    color: "from-yellow-400 to-amber-600",
    description:
      "Footwear that allows the wearer to control their personal gravity, enabling walking on walls and ceilings.",
    history: [545, 540, 535, 538, 532, 530, 529.87],
  },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                FantasyTrade
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400"
              >
                Dashboard
              </Link>
              <Link
                href="/markets"
                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              >
                Markets
              </Link>
              <Link
                href="/portfolio"
                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              >
                Portfolio
              </Link>
              <Link
                href="/news"
                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              >
                News
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search stocks..."
                className="pl-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  <span className="hidden sm:inline">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Market Overview */}
          <div className="lg:col-span-2">
            <MarketOverview />

            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Fictional Stocks</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredStocks.map((stock) => (
                <StockCard key={stock.id} stock={stock} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TrendingStocks stocks={stocks} />

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Market News</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-purple-500 pl-3 py-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Dragon Egg Prices Soar After Rare Hatching
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                </div>
                <div className="border-l-4 border-red-500 pl-3 py-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Teleporter Recall: Battery Issues Reported
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">5 hours ago</p>
                </div>
                <div className="border-l-4 border-green-500 pl-3 py-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Time Crystal Mining Breakthrough Announced
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Yesterday</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3 py-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Invisibility Cloak Startup Secures Funding
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-3 text-purple-600 dark:text-purple-400">
                View All News
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Trading Calendar</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Dragon Egg Auction</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">May 20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Teleporter Earnings Call</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">May 22</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Time Crystal Expo</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">May 25</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-3 text-purple-600 dark:text-purple-400">
                Full Calendar
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
