"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, BarChart3 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import StockChart from "@/components/stock-chart"

interface Stock {
  id: number
  name: string
  symbol: string
  price: number
  change: number
  changePercent: number
  marketCap: string
  volume: string
  color: string
  description: string
  history: number[]
}

interface StockCardProps {
  stock: Stock
}

export default function StockCard({ stock }: StockCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [quantity, setQuantity] = useState("1")
  const [orderType, setOrderType] = useState("buy")

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value)
  }

  return (
    <div className="perspective-1000 h-[280px]">
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={handleFlip}
      >
        {/* Front of card */}
        <Card
          className={`absolute w-full h-full backface-hidden border-2 ${
            stock.change >= 0 ? "border-green-400" : "border-red-400"
          } hover:shadow-lg transition-shadow duration-200`}
        >
          <CardContent className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{stock.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stock.symbol}</p>
              </div>
              <div
                className={`px-2 py-1 rounded-md text-white text-xs font-medium ${
                  stock.change >= 0 ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {stock.change >= 0 ? (
                  <ArrowUp className="h-3 w-3 inline mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 inline mr-1" />
                )}
                {stock.changePercent.toFixed(2)}%
              </div>
            </div>

            <div className="flex-grow relative">
              <div className="absolute inset-0">
                <StockChart data={stock.history} color={stock.change >= 0 ? "#10b981" : "#ef4444"} />
              </div>
            </div>

            <div className="mt-2">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stock.price)}</span>
                <span className={`text-sm font-medium ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {stock.change >= 0 ? "+" : ""}
                  {formatCurrency(stock.change)}
                </span>
              </div>

              <div className="flex justify-between mt-3">
                <Dialog>
                  <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button className={`w-full bg-gradient-to-r ${stock.color} hover:opacity-90 text-white`}>
                      Trade
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Trade {stock.name}</DialogTitle>
                      <DialogDescription>Current price: {formatCurrency(stock.price)}</DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="buy" onValueChange={setOrderType} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="buy">Buy</TabsTrigger>
                        <TabsTrigger value="sell">Sell</TabsTrigger>
                      </TabsList>
                      <TabsContent value="buy" className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="quantity">Quantity</Label>
                          <Input
                            id="quantity"
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Total Cost</Label>
                          <div className="text-lg font-bold">
                            {formatCurrency(stock.price * Number.parseInt(quantity || "0"))}
                          </div>
                        </div>
                        <Button
                          className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white`}
                        >
                          Buy {stock.symbol}
                        </Button>
                      </TabsContent>
                      <TabsContent value="sell" className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="quantity-sell">Quantity</Label>
                          <Input
                            id="quantity-sell"
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Total Value</Label>
                          <div className="text-lg font-bold">
                            {formatCurrency(stock.price * Number.parseInt(quantity || "0"))}
                          </div>
                        </div>
                        <Button
                          className={`w-full bg-gradient-to-r from-red-500 to-rose-600 hover:opacity-90 text-white`}
                        >
                          Sell {stock.symbol}
                        </Button>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back of card */}
        <Card className="absolute w-full h-full backface-hidden rotate-y-180 border-2 border-gray-300">
          <CardContent className="p-4 h-full flex flex-col">
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
              {stock.name} ({stock.symbol})
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{stock.description}</p>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-400">Market Cap</span>
                <span className="font-medium text-gray-900 dark:text-white">{stock.marketCap}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-400">Volume</span>
                <span className="font-medium text-gray-900 dark:text-white">{stock.volume}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-400">52W High</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(Math.max(...stock.history) * 1.2)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-400">52W Low</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(Math.min(...stock.history) * 0.8)}
                </span>
              </div>
            </div>

            <div className="mt-auto">
              <Dialog>
                <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="outline" className="w-full mt-4">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Detailed Chart
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>
                      {stock.name} ({stock.symbol})
                    </DialogTitle>
                    <DialogDescription>Historical price performance</DialogDescription>
                  </DialogHeader>
                  <div className="h-[300px]">
                    <StockChart
                      data={stock.history}
                      color={stock.change >= 0 ? "#10b981" : "#ef4444"}
                      showAxis={true}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
