import { Button, Select, SelectItem } from '@heroui/react'

import { useInvestmentsStore } from '../states/investments.state'

const Actions = ({
    className,
    onSelectPortfolio,
    onClickAddInvestment,
}: {
    className?: string
    onSelectPortfolio: () => void
    onClickAddInvestment: () => void
}) => {
    const investmentPortfolios = useInvestmentsStore((state) => state.investmentPortfolios)
    return (
        <div className={`flex gap-2 ${className}`}>
            <div className="w-1/2">
                <Select size="sm" label="Portfolio" onSelectionChange={onSelectPortfolio}>
                    {investmentPortfolios.map((portfolio) => (
                        <SelectItem key={portfolio.key}>{portfolio.label}</SelectItem>
                    ))}
                </Select>
            </div>
            <div className=" w-1/2">
                <Button
                    size="sm"
                    color="default"
                    variant="flat"
                    className="w-full"
                    onPress={onClickAddInvestment}
                >
                    Agregar inversión
                </Button>
            </div>
        </div>
    )
}

export default Actions
