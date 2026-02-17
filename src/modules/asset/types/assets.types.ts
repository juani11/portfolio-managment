import type { ASSET_CATEGORIES } from '../constants/assetCategories'
import type { ASSET_METADATA } from '../constants/assets'

export type AssetCategoryKey = keyof typeof ASSET_CATEGORIES

export type AssetCategory = (typeof ASSET_CATEGORIES)[AssetCategoryKey]

export type AssetSymbol = keyof typeof ASSET_METADATA

export type Asset = {
    symbol: AssetSymbol
    name: string
    category: AssetCategory
}
