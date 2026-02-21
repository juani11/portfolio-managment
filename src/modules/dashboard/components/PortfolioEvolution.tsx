import { Button, Skeleton } from '@heroui/react'

import Badge from '../../core/components/design-system/Badge'
import Card from '../../core/components/design-system/Card/Card'
import { AreaChartIcon, ArrowUpRightIcon } from '../../core/components/design-system/Icons'
import { currencyFormat } from '../../core/utils/utils'
import { useInvestmentsStore } from '../states/investments.state'
import EmptyState from './EmptyState'

const SYMBOL_POSITIVE = 'positive'
const SYMBOL_NEGATIVE = 'negative'

const TOTAL_INVESTED = 2_230_000
const TOTAL_GAIN_LOSS_PERCENT = { percent: 6.5, symbol: SYMBOL_POSITIVE }
const TOTAL_GAIN_LOSS = (TOTAL_GAIN_LOSS_PERCENT.percent * TOTAL_INVESTED) / 100

const PortfolioEvolution = ({
    className,
    isLoading,
}: {
    className?: string
    isLoading?: boolean
}) => {
    const investments = useInvestmentsStore((state) => state.investments)
    const existsInvestments = investments.length > 0
    const totalInvested = useInvestmentsStore((state) =>
        state.investments.reduce((acc, i) => acc + i.amount * i.quantity, 0),
    )

    return (
        <Card
            title={!existsInvestments ? undefined : 'Evolución de la cartera'}
            className={className}
        >
            {!existsInvestments ? (
                <EmptyState
                    title="No hay inversiones"
                    description="Agregá tu primera inversión para ver el detalle aquí."
                    icon={<AreaChartIcon size={36} />}
                >
                    <Button size="sm" color="primary" variant="flat">
                        Agregar inversión
                    </Button>
                </EmptyState>
            ) : (
                <section className="flex flex-col items-start justify-center">
                    {isLoading ? (
                        <Skeleton className="h-8 w-32 rounded-lg" />
                    ) : (
                        <section className="flex justify-between items-start gap-4">
                            <div>
                                <h4 className="text-2xl">
                                    {currencyFormat(totalInvested)}{' '}
                                    <span className="text-default-400 text-small">USD</span>
                                </h4>
                                <div className="flex items-center justify-center text-default-400 text-xs gap-1">
                                    <p
                                        className={`${TOTAL_GAIN_LOSS_PERCENT.symbol === SYMBOL_POSITIVE ? 'text-emerald-500' : 'text-danger'} `}
                                    >
                                        {TOTAL_GAIN_LOSS_PERCENT.symbol === SYMBOL_POSITIVE
                                            ? '+'
                                            : '-'}{' '}
                                        {currencyFormat(Math.abs(TOTAL_GAIN_LOSS))}
                                    </p>
                                    <p className="">desde la inversión inicial</p>
                                </div>
                            </div>
                            <div className="mt-1.5">
                                <Badge
                                    className={`rounded-xl ${TOTAL_GAIN_LOSS_PERCENT.symbol === SYMBOL_POSITIVE ? 'text-emerald-500 bg-emerald-400/10 border border-emerald-400/20' : 'text-danger bg-danger/10 border border-danger/20'}`}
                                    startContent={<ArrowUpRightIcon size={12} />}
                                >
                                    {TOTAL_GAIN_LOSS_PERCENT.percent}%
                                </Badge>
                            </div>
                        </section>
                    )}
                </section>
            )}
        </Card>
    )
}

export default PortfolioEvolution
