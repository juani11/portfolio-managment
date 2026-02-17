import ListOfAssets from './modules/asset/components/ListOfAssets.tsx'
import { ASSET_METADATA } from './modules/asset/constants/assets.ts'
import type { AssetSymbol, Asset as AssetType } from './modules/asset/types/assets.types.ts'

const adapterAssets = (): AssetType[] => {
    const assetsEntries = Object.entries(ASSET_METADATA)
    return assetsEntries.map(([symbol, data]) => ({
        symbol: symbol as AssetSymbol,
        name: data.name,
        category: data.category,
    }))
}

function App() {
    // const [assets, setAssets] = useState<AssetType[]>(adapterAssets)

    const assets = adapterAssets()

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <ListOfAssets assets={assets} />
        </div>
    )
}

export default App
