import { Skeleton } from '@heroui/react'

import Card from '../../core/components/design-system/Card/Card'
import { PigMoneyIcon } from '../../core/components/design-system/Icons'
import { currencyFormat } from '../../core/utils/utils'
import { useInvestmentsStore } from '../states/investments.state'
import EmptyState from './EmptyState'

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
        <Card title="Evolución de la cartera" className={className}>
            {!existsInvestments ? (
                <EmptyState
                    title="No hay inversiones"
                    description="Agregá tu primera inversión para ver el detalle aquí."
                    icon={<PigMoneyIcon size={40} />}
                />
            ) : (
                <section className="flex flex-col items-start justify-center">
                    {isLoading ? (
                        <Skeleton className="h-8 w-32 rounded-lg" />
                    ) : (
                        <h4 className=" text-2xl">
                            {currencyFormat(totalInvested)}{' '}
                            <span className="text-default-400 text-small">USD</span>
                        </h4>
                    )}
                </section>
            )}
        </Card>
    )
}

export default PortfolioEvolution
