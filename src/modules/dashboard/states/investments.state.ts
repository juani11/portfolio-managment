import { create } from 'zustand'

import { ASSET_METADATA } from '../../asset/constants/assets'
import type { Asset, AssetSymbol } from '../../asset/types/assets.types'

interface Investment {
    id: number
    asset: Asset
    amount: number
    quantity: number
    date: Date
}

const INITIAL_INVESTMENTS = [
    {
        id: 1,
        asset: { ...ASSET_METADATA.YPF, symbol: 'YPF' as AssetSymbol },
        amount: 300_000,
        quantity: 1,
        date: new Date('2025-01-18'),
    },
    {
        id: 2,
        asset: { ...ASSET_METADATA.GAL, symbol: 'GAL' as AssetSymbol },
        amount: 100_000,
        quantity: 1,
        date: new Date('2025-01-18'),
    },
]

interface InvestmentState {
    investments: Investment[]
    addInvestment: (inv: Investment) => void
    removeInvestment: (id: number) => void
}

export const useInvestmentsStore = create<InvestmentState>((set) => ({
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
