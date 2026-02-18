import { Button } from '@heroui/react'
import { useState } from 'react'

import { AreaChartIcon } from '../../core/components/design-system/Icons'
import AssetsComposition from './AssetsComposition'
import EmptyState from './EmptyState'
import LatestInvestments from './LatestInvestments'

const Dashboard = () => {
    const [loading, setLoading] = useState(false)
    const [withIcon, setWithIcon] = useState(true)
    const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg'>('xs')

    return (
        <div className="grid grid-rows-[60px_210px_210px_1fr] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full w-full">
            <section className="order-1 row-span-1 md:col-span-2">
                <h1 className="text-2xl font-bold">Dashboard Actions</h1>
            </section>

            <section className="row-span-2 order-2 h-full md:col-span-2 lg:order-3">
                <EmptyState
                    title="No assets"
                    description="You don\'t have any assets yet"
                    icon={<AreaChartIcon size={40} />}
                >
                    <Button color="primary" size="sm">
                        Add Asset
                    </Button>
                </EmptyState>{' '}
            </section>
            <AssetsComposition
                className="row-span-2 order-3 md:row-span-3 lg:row-span-2 lg:order-2"
                size={size}
            />

            <section className="row-span-1 order-4">AssetsDistribution</section>
            <LatestInvestments
                isLoading={loading}
                className="row-span-2 order-5"
                withIcon={withIcon}
                size={size}
            />
            <section className="row-span-2 order-6 md:col-span-2">PortfolioPositions</section>
        </div>
    )
}

export default Dashboard
