import type { Asset } from '../../asset/types/assets.types'

export interface Investment {
    id: number
    asset: Asset
    amount: number
    quantity: number
    date: Date
}
export interface InvestmentState {
    investments: Investment[]
    addInvestment: (inv: Investment) => void
    removeInvestment: (id: number) => void
}
