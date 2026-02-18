import type { Investment } from '../../dashboard/types/investments.types'
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

export const calculateAssetsComposition = (investments: Investment[]): AssetComposition[] => {
    if (!investments?.length) return []

    const portfolioAssets = groupBy(investments, (investment) => investment.asset.symbol)

    const assets = Object.keys(portfolioAssets)
    const totalValue = investments.reduce((acc, inv) => acc + inv.amount, 0)

    return assets.map((assetKey) => {
        const assetInvestments = portfolioAssets[assetKey as AssetSymbol]
        const [first] = assetInvestments
        const { asset: completeAsset } = first
        const assetValue = assetInvestments.reduce((acc, inv) => acc + inv.amount, 0)
        const percentage = totalValue > 0 ? Number(((assetValue / totalValue) * 100).toFixed(2)) : 0

        return {
            asset: completeAsset,
            amount: assetValue,
            quantity: assetInvestments.reduce((acc, inv) => acc + inv.quantity, 0),
            percentage,
        }
    })
}
