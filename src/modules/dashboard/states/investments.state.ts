import { create } from 'zustand'

import type { Investment, InvestmentState } from '../types/investments.types'

const INITIAL_INVESTMENTS = [
    // {
    //     id: '1',
    //     asset: { ...ASSET_METADATA.YPF, symbol: 'YPF' as AssetSymbol },
    //     amount: 300_000,
    //     quantity: 1,
    //     date: new Date('2025-01-18'),
    // },
    // {
    //     id: '2',
    //     asset: { ...ASSET_METADATA.GAL, symbol: 'GAL' as AssetSymbol },
    //     amount: 100_000,
    //     quantity: 1,
    //     date: new Date('2025-01-18'),
    // },
]

const INITIAL_INVESTMENT_PORTFOLIOS = [
    { key: 1, label: 'CEDEARs', description: 'Portfolio 1 description' },
    { key: 2, label: 'Acciones', description: 'Portfolio 2 description' },
]

export const useInvestmentsStore = create<InvestmentState>((set) => ({
    investmentPortfolios: INITIAL_INVESTMENT_PORTFOLIOS,
    investments: INITIAL_INVESTMENTS,

    addInvestment: (newInvestment: Investment) =>
        set((s) => ({
            investments: [...s.investments, newInvestment],
        })),
    removeInvestment: (idToRemove: number) =>
        set((s) => ({
            investments: s.investments.filter((investment) => investment.id !== idToRemove),
        })),
}))
