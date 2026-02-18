import { Button, Card, CardBody, CardHeader } from '@heroui/react'

import { AssetIcon } from '../../asset/components/AssetIcon'
import { PigMoneyIcon } from '../../core/components/design-system/Icons'
import { currencyFormat, dateFormat } from '../../core/components/design-system/utils/utils'
import { useInvestmentsStore } from '../states/investments.state'
import type { Investment } from '../types/investments.types'
import EmptyState from './EmptyState'

interface LatestInvestmentsProps {
    className?: string
    withIcon?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg'
    isLoading?: boolean
}

interface LatestInvestmentsListProps {
    latestFiveInvestments: Investment[]
    size?: 'xs' | 'sm' | 'md' | 'lg'
    withIcon?: boolean
}

const LatestInvestmentsList = ({
    latestFiveInvestments,
    size,
    withIcon,
}: LatestInvestmentsListProps) => {
    return (
        <ul>
            {latestFiveInvestments.map(({ asset, amount, date, quantity }) => {
                return (
                    <li
                        key={asset.symbol}
                        className={`flex items-center justify-between py-2 text-${size} hover:bg-default-50`}
                    >
                        <div className="flex items-center gap-4">
                            {withIcon && <AssetIcon symbol={asset.symbol} />}
                            <div className="flex flex-col items-start gap-0.5 capitalize flex-1">
                                <p>{asset.name}</p>
                                <p className="text-default-400">{asset.symbol}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end justify-end gap-0.5 capitalize flex-1 w-[70px]">
                            <p className="font-bold text-success">
                                + {currencyFormat(amount * quantity)}
                            </p>
                            <p className="text-default-400">{dateFormat(date)}</p>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}
const LatestInvestments = ({
    className = '',
    withIcon = false,
    size = 'sm',
}: LatestInvestmentsProps) => {
    const investments = useInvestmentsStore((state) => state.investments)
    const existsInvestments = useInvestmentsStore((state) => state.investments.length > 0)

    const latestFiveInvestments = investments
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 5)

    return (
        <Card className={`h-full w-full px-2  ${className}`} shadow="sm" radius="sm">
            <CardHeader className=" justify-between items-start">
                <small className="text-default-400 text-sm capitalize">Últimas inversiones</small>
                {existsInvestments && (
                    <section className="flex gap-2">
                        <Button size="sm" color="default" variant="light">
                            Ver todas
                        </Button>
                    </section>
                )}
            </CardHeader>
            <CardBody>
                {!existsInvestments ? (
                    <EmptyState
                        title="No hay inversiones"
                        description="No hay inversiones realizadas"
                        icon={<PigMoneyIcon size={40} />}
                    />
                ) : (
                    <LatestInvestmentsList
                        latestFiveInvestments={latestFiveInvestments}
                        size={size}
                        withIcon={withIcon}
                    />
                )}
            </CardBody>
        </Card>
    )
}

export default LatestInvestments
