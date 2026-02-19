import type { Asset } from '../../asset/types/assets.types'

export interface InvestmentPortfolio {
    key: number
    label: string
    description: string
}

export interface Investment {
    id: string
    asset: Asset
    amount: number
    quantity: number
    date: Date
}
export interface InvestmentState {
    investmentPortfolios: InvestmentPortfolio[]
    investments: Investment[]
    addInvestment: (inv: Investment) => void
    removeInvestment: (id: number) => void
}
