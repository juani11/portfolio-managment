import { Button, Card, CardBody, CardHeader } from '@heroui/react'
import { useMemo } from 'react'

import { AssetIcon } from '../../asset/components/AssetIcon'
import { calculateAssetsComposition } from '../../asset/lib/logic'
import type { AssetComposition } from '../../asset/types/assets.types'
import { BarChartIcon } from '../../core/components/design-system/Icons'
import { currencyFormat } from '../../core/components/design-system/utils/utils'
import { useInvestmentsStore } from '../states/investments.state'
import EmptyState from './EmptyState'

type TextSize = 'xs' | 'sm' | 'md' | 'lg'

interface AssetsCompositionProps {
    isLoading?: boolean
    className?: string
    size?: TextSize
}

interface AssetsCompositionListProps {
    topFiveAssets: AssetComposition[]
    textSize: TextSize
}

const AssetsCompositionList = ({ topFiveAssets, textSize }: AssetsCompositionListProps) => {
    return (
        <ul className={`pb-4 ${textSize}`}>
            {[...topFiveAssets]
                .sort((a, b) => b.percentage - a.percentage)
                .map(({ asset, percentage, amount, quantity }) => {
                    return (
                        <li className="flex items-center justify-between gap-4 py-2">
                            <AssetIcon symbol={asset.symbol} className="w-6 h-6" />
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
        <Card className={`h-full w-full px-2 text-${size} ${className}`} shadow="sm" radius="sm">
            <CardHeader className="justify-between">
                <small className="text-default-400 text-sm capitalize">Composición</small>
                {isThereMoreThanFiveAssets && (
                    <section className="flex gap-2">
                        <Button size="sm" color="default" variant="light">
                            Ver todo
                        </Button>
                    </section>
                )}
            </CardHeader>
            <CardBody className="gap-4 h-full">
                {isLoading ? (
                    <div>Loading...</div>
                ) : !existsInvestments ? (
                    <EmptyState
                        title="Aún no hay activos en la cartera"
                        description="Agregá tu primer activo para ver el detalle aquí."
                        icon={<BarChartIcon size={40} />}
                    />
                ) : (
                    <AssetsCompositionList topFiveAssets={topFiveAssets} textSize={size} />
                )}
            </CardBody>
        </Card>
    )
}

export default AssetsComposition
