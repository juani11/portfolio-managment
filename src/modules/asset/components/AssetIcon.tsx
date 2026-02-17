import type { AssetSymbol } from '../types/assets.types'
import { ASSET_ICON_REGISTRY } from './AssetIconsRegistry'

type Props = {
    symbol: AssetSymbol
    size?: number
}

export function AssetIcon({ symbol, size = 24 }: Props) {
    const Icon = ASSET_ICON_REGISTRY[symbol]

    return <Icon width={size} height={size} />
}
