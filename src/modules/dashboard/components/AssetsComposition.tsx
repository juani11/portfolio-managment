import { Button } from '@heroui/react'
import { useMemo } from 'react'

import { AssetIcon } from '../../asset/components/AssetIcon'
import { calculateAssetsComposition } from '../../asset/lib/logic'
import type { AssetComposition } from '../../asset/types/assets.types'
import Card from '../../core/components/design-system/Card/Card'
import { BarChartIcon } from '../../core/components/design-system/Icons'
import type { TextSize } from '../../core/types/core.types'
import { currencyFormat } from '../../core/utils/utils'
import { useInvestmentsStore } from '../states/investments.state'
import EmptyState from './EmptyState'
import { AssetsCompositionSkeleton } from './Skeletons'

interface AssetsCompositionProps {
    isLoading?: boolean
    className?: string
    size?: TextSize
}

interface AssetsCompositionListProps {
    topFiveAssets: AssetComposition[]
}

const AssetsCompositionList = ({ topFiveAssets }: AssetsCompositionListProps) => {
    return (
        <ul className="pb-4">
            {[...topFiveAssets]
                .sort((a, b) => b.percentage - a.percentage)
                .map(({ asset, percentage, amount, quantity }) => {
                    return (
                        <li className="flex items-center justify-between gap-4 py-2">
                            <AssetIcon symbol={asset.symbol} />
                            <div className="flex flex-col items-start flex-1 gap-0.5">
                                <p className="capitalize">{asset.name}</p>
                                <div className="flex items-center justify-between w-full">
                                    <p className="capitalize text-default-400 ">{asset.symbol}</p>
                                    <p className="text-default-400">{percentage}%</p>
                                </div>
                                <div className="w-full h-1 bg-default-200 rounded-full relative">
                                    <div
                                        className="absolute bg-primary rounded-full h-1"
                                        style={{
                                            width: `${percentage}%`,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-0.5 w-[80px] self-center">
                                <p className="font-bold capitalize">
                                    {currencyFormat(amount * quantity)}
                                </p>
                            </div>
                        </li>
                    )
                })}
        </ul>
    )
}
const AssetsComposition = ({
    isLoading = false,
    className = '',
    size = 'sm',
}: AssetsCompositionProps) => {
    const investments = useInvestmentsStore((state) => state.investments)
    const existsInvestments = investments.length > 0

    const portfolio = useMemo(() => calculateAssetsComposition(investments), [investments])

    const topFiveAssets = [...portfolio].sort((a, b) => b.percentage - a.percentage).slice(0, 5)

    const isThereMoreThanFiveAssets = portfolio.length > 5

    return (
        <Card
            className={className}
            size={size}
            title="Composición"
            extra={
                isThereMoreThanFiveAssets && (
                    <Button size="sm" color="default" variant="light">
                        Ver todo
                    </Button>
                )
            }
        >
            {isLoading ? (
                <AssetsCompositionSkeleton
                    count={2}
                    labelHeight="h-2"
                    progressHeight="h-2"
                    withAvatar
                />
            ) : !existsInvestments ? (
                <EmptyState
                    title="Aún no hay activos en la cartera"
                    description="Agregá tu primer activo para ver el detalle aquí."
                    icon={<BarChartIcon size={40} />}
                />
            ) : (
                <AssetsCompositionList topFiveAssets={topFiveAssets} />
            )}
        </Card>
    )
}

export default AssetsComposition
