import type { Asset } from '../types/assets.types'
import { AssetIcon } from './AssetIcon'

const ListOfAssets = ({ assets }: { assets: Asset[] }) => {
    return (
        <ul className="bg-white p-4 rounded-md shadow-md w-1/2">
            {assets.length === 0 && <li>No hay activos</li>}
            {assets.map((asset) => (
                <li
                    key={asset.symbol}
                    className="flex items-center justify-between border-b border-gray-200 pb-4 text-xs"
                >
                    <div className="flex items-center justify-between gap-2" id="asset-name">
                        <div className="w-6 h-6 rounded-4xl overflow-hidden">
                            <AssetIcon symbol={asset.symbol} size={24} />
                        </div>
                        <div className="flex flex-col ">
                            <section className="">{asset.name}</section>
                            <section className="text-gray-400">{asset.symbol}</section>
                        </div>
                    </div>
                    <div className="ml-auto">
                        <section id="asset-category">{asset.category.name}</section>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default ListOfAssets
