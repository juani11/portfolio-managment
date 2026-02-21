import { Button } from '@heroui/react'

import { AssetIcon } from '../../asset/components/AssetIcon'
import Card from '../../core/components/design-system/Card/Card'
import { PigMoneyIcon } from '../../core/components/design-system/Icons'
import type { TextSize } from '../../core/types/core.types'
import { currencyFormat, dateFormat } from '../../core/utils/utils'
import { useInvestmentsStore } from '../states/investments.state'
import type { Investment } from '../types/investments.types'
import EmptyState from './EmptyState'
import { LatestInvestmentsSkeleton } from './Skeletons'

interface LatestInvestmentsProps {
    className?: string
    withIcon?: boolean
    size?: TextSize
    isLoading?: boolean
}

interface LatestInvestmentsListProps {
    latestFiveInvestments: Investment[]
    withIcon?: boolean
}

const LatestInvestmentsList = ({ latestFiveInvestments, withIcon }: LatestInvestmentsListProps) => {
    return (
        <ul>
            {latestFiveInvestments.map(({ asset, amount, date, quantity }) => {
                return (
                    <li
                        key={asset.symbol}
                        className="flex items-center justify-between py-2 hover:bg-default-50"
                    >
                        <div className="flex items-center gap-4">
                            {withIcon && <AssetIcon symbol={asset.symbol} />}
                            <div className="flex flex-col items-start gap-0.5 capitalize flex-1">
                                <p>{asset.symbol}</p>
                                <p className="text-default-400 ">{asset.name}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end justify-end gap-0.5 capitalize flex-1 w-[70px]">
                            <p className="font-bold  text-emerald-500 ">
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
    isLoading = false,
}: LatestInvestmentsProps) => {
    const investments = useInvestmentsStore((state) => state.investments)
    const existsInvestments = useInvestmentsStore((state) => state.investments.length > 0)

    const latestFiveInvestments = investments
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 5)

    return (
        // <Card className={`h-full w-full px-2  ${className}`} shadow="sm" radius="sm">
        //     <CardHeader className="justify-between items-start">
        //         <small className="text-default-400 text-sm capitalize">Últimas inversiones</small>
        //         {existsInvestments && (
        //             <section className="flex gap-2">
        //                 <Button size="sm" color="default" variant="light">
        //                     Ver todas
        //                 </Button>
        //             </section>
        //         )}
        //     </CardHeader>
        //     <CardBody>
        //         {!existsInvestments ? (
        //             <EmptyState
        //                 title="No hay inversiones"
        //                 description="No hay inversiones realizadas"
        //                 icon={<PigMoneyIcon size={40} />}
        //             />
        //         ) : (
        //             <LatestInvestmentsList
        //                 latestFiveInvestments={latestFiveInvestments}
        //                 size={size}
        //                 withIcon={withIcon}
        //             />
        //         )}
        //     </CardBody>
        // </Card>
        <Card
            className={className}
            size={size}
            title="Últimas inversiones"
            extra={
                existsInvestments && (
                    <Button size="sm" color="default" variant="light">
                        Ver todas
                    </Button>
                )
            }
        >
            {isLoading ? (
                <LatestInvestmentsSkeleton count={2} labelHeight="h-2" progressHeight="h-2" />
            ) : !existsInvestments ? (
                <EmptyState
                    title="Aún no hay inversiones"
                    description="Agregá tu primera inversión para ver el detalle aquí."
                    className="h-full"
                    icon={<PigMoneyIcon size={36} />}
                />
            ) : (
                <LatestInvestmentsList
                    latestFiveInvestments={latestFiveInvestments}
                    withIcon={withIcon}
                />
            )}
        </Card>
    )
}

export default LatestInvestments
