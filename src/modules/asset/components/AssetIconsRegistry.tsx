import type { AssetSymbol } from '../types/assets.types'
import {
    AppleIcon,
    GrupoFinancieroGaliciaIcon,
    InvescoQQQTrustIcon,
    IRSAIcon,
    MercadoLibreIcon,
    MicrosoftIcon,
    PampaEnergiaIcon,
    SP500Icon,
    TeslaIcon,
    YPFIcon,
} from './AssetIcons'

export const ASSET_ICON_REGISTRY: Record<
    AssetSymbol,
    React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
    MELI: MercadoLibreIcon,
    AAPL: AppleIcon,
    MSFT: MicrosoftIcon,
    SPY: SP500Icon,
    QQQ: InvescoQQQTrustIcon,
    TSLA: TeslaIcon,
    YPF: YPFIcon,
    IRSA: IRSAIcon,
    PAMP: PampaEnergiaIcon,
    GAL: GrupoFinancieroGaliciaIcon,
}
