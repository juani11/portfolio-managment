import { Button } from '@heroui/react'

const Dashboard = () => {
    return (
        <div className="grid grid-rows-[60px_210px_210px_1fr] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full w-full">
            <section className="order-1 row-span-1 md:col-span-2">
                <h1 className="text-2xl font-bold">Dashboard Actions</h1>
                <Button color="primary">Add Asset</Button>
            </section>

            <section className="row-span-2 order-2 h-full md:col-span-2 lg:order-3">
                Portfolio Evolution
            </section>

            <section className="row-span-2 order-3 md:row-span-3 lg:row-span-2 lg:order-2">
                AssetsComposition
            </section>
            <section className="row-span-1 order-4">AssetsDistribution</section>
            <section className="row-span-2 order-5">LatestInvestments</section>
            <section className="row-span-2 order-6 md:col-span-2">PortfolioPositions</section>
        </div>
    )
}

export default Dashboard
