import { ASSET_METADATA } from './modules/asset/constants/assets.ts'
import type { AssetSymbol, Asset as AssetType } from './modules/asset/types/assets.types.ts'
import Dashboard from './modules/dashboard/components/Dashboard.tsx'

const adapterAssets = (): AssetType[] => {
    const assetsEntries = Object.entries(ASSET_METADATA)
    return assetsEntries.map(([symbol, data]) => ({
        symbol: symbol as AssetSymbol,
        name: data.name,
        category: data.category,
    }))
}

function App() {
    const assets = adapterAssets()

    return (
        <main className="min-h-screen lg:w-6xl mx-2 lg:mx-auto flex items-center justify-center py-14">
            <Dashboard />
        </main>
    )
}

export default App
