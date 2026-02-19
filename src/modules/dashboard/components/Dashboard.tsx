import { useState } from 'react'

import { ASSET_METADATA } from '../../asset/constants/assets'
import type { TextSize } from '../../core/types/core.types'
import { useInvestmentsStore } from '../states/investments.state'
import Actions from './Actions'
import AddInvestmentModal, { type FormState } from './AddInvestmentModal'
import AssetsComposition from './AssetsComposition'
import AssetsDistribution from './AssetsDistribution'
import LatestInvestments from './LatestInvestments'
import PortfolioEvolution from './PortfolioEvolution'
import PortfolioPositions from './PortfolioPostions'

const Dashboard = () => {
    const withIcon = true
    const size: TextSize = 'xs'

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
    const addInvestment = useInvestmentsStore((state) => state.addInvestment)

    const handleAddInvestment = (investmentData: FormState) => {
        console.log('Nueva inversión:', investmentData)

        // const date = formatter.format(investmentData.fechaCompra.toDate())
        // console.log('DATE DE LA INVERSION FORMATEADA!!', date)

        if (!investmentData.activo) {
            throw new Error('Debe seleccionar un activo')
        }

        const assetObject = ASSET_METADATA[investmentData.activo]
        addInvestment({
            id: window.crypto.randomUUID(),
            asset: { ...assetObject, symbol: investmentData.activo },
            amount: Number(investmentData.precioFinal),
            quantity: Number(investmentData.cantidad),
            date: new Date(),
            // date: formatter.format(investmentData.fechaCompra.toDate())
        })
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
                onSubmit={handleAddInvestment}
            />
        </div>
    )
}

export default Dashboard
