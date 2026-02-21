import { useState } from 'react'

import type { TextSize } from '../../core/types/core.types'
import Actions from './Actions'
import AddInvestmentModal from './AddInvestmentModal'
import AssetsComposition from './AssetsComposition'
import AssetsDistribution from './AssetsDistribution'
import LatestInvestments from './LatestInvestments'
import PortfolioEvolution from './PortfolioEvolution'
import PortfolioPositions from './PortfolioPostions'

const Dashboard = () => {
    const withIcon = true
    const size: TextSize = 'sm'

    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openAddInvestmentModal = () => {
        setIsModalOpen(true)
    }
    const closeAddInvestmentModal = () => {
        setIsModalOpen(false)
    }

    const handleSelectPortfolio = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }

    return (
        <div className="grid grid-rows-[60px_210px_210px_1fr] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full w-full">
            <Actions
                className="order-1 row-span-1 md:col-span-2"
                onSelectPortfolio={handleSelectPortfolio}
                onClickAddInvestment={openAddInvestmentModal}
            />
            <PortfolioEvolution
                className="row-span-2 order-2 h-full md:col-span-2 lg:order-3"
                isLoading={loading}
            />
            <AssetsComposition
                className="row-span-2 order-3 md:row-span-3 lg:row-span-2 lg:order-2"
                size={size}
                isLoading={loading}
            />
            <AssetsDistribution className="row-span-1 order-4" />
            <LatestInvestments
                isLoading={loading}
                className="row-span-2 order-5"
                withIcon={withIcon}
                size={size}
            />
            <PortfolioPositions className="row-span-2 order-6 md:col-span-2" />

            <AddInvestmentModal
                isOpen={isModalOpen}
                onClose={closeAddInvestmentModal}
                // onSubmit={handleAddInvestment}
            />
        </div>
    )
}

export default Dashboard
