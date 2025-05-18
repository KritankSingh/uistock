"use client"

import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Stock {
  id: number
  name: string
  symbol: string
  price: number
  change: number
  changePercent: number
}

interface TrendingStocksProps {
  stocks: Stock[]
}

export default function TrendingStocks({ stocks }: TrendingStocksProps) {
  // Sort stocks by absolute change percentage to get trending ones
  const trendingStocks = [...stocks].sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent)).slice(0, 5)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
          Trending Stocks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trendingStocks.map((stock) => (
            <div key={stock.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{stock.symbol}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(stock.price)}</p>
                <p
                  className={`text-sm flex items-center justify-end ${
                    stock.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stock.change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {stock.changePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          View All Stocks
        </Button>
      </CardContent>
    </Card>
  )
}
