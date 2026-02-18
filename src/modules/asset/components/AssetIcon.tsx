import { Avatar } from '@heroui/react'

import type { AssetSymbol } from '../types/assets.types'
import { ASSET_ICON_REGISTRY } from './AssetIconsRegistry'

type Props = {
    symbol: AssetSymbol
    className?: string
    size?: number
}

export function AssetIcon({ symbol, className = 'rounded-md w-8 h-8' }: Props) {
    const Icon = ASSET_ICON_REGISTRY[symbol]

    return <Avatar className={`${className}`} icon={<Icon />} />
}
