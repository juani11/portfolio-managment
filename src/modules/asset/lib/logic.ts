import type { Investment } from '../../dashboard/types/investments.types'
import { ASSET_METADATA } from '../constants/assets'
import type { AssetComposition, AssetSymbol } from '../types/assets.types'

export function groupBy<T, K extends PropertyKey>(
    items: T[],
    getKey: (item: T) => K,
): Record<K, T[]> {
    return items.reduce(
        (acc, item) => {
            const key = getKey(item)
            ;(acc[key] ||= []).push(item)
            return acc
        },
        {} as Record<K, T[]>,
    )
}

type Result = Record<AssetSymbol, { totalInvestment: number; totalQuantity: number }>

export const calculateAssetsComposition = (investments: Investment[]): AssetComposition[] => {
    if (!investments?.length) return []

    const result = {} as Result

    let totalAssetsInvestment = 0

    const portfolioAssets = groupBy(investments, (investment) => investment.asset.symbol)
    const assetsSymbols = Object.keys(portfolioAssets) as AssetSymbol[]

    assetsSymbols.map((assetSymbol) => {
        result[assetSymbol] = { totalInvestment: 0, totalQuantity: 0 }
        portfolioAssets[assetSymbol].map((investment) => {
            const investmentValue = investment.amount * investment.quantity
            result[assetSymbol].totalInvestment += investmentValue
            result[assetSymbol].totalQuantity += investment.quantity
            totalAssetsInvestment += investmentValue
        })
    })

    return Object.entries(result).map(([assetSymbol, { totalInvestment, totalQuantity }]) => {
        return {
            asset: {
                symbol: assetSymbol as AssetSymbol,
                ...ASSET_METADATA[assetSymbol as AssetSymbol],
            },
            amount: totalInvestment,
            quantity: totalQuantity,
            percentage:
                totalAssetsInvestment > 0
                    ? Number((totalInvestment / totalAssetsInvestment) * 100).toFixed(2)
                    : '0',
        }
    })
}
