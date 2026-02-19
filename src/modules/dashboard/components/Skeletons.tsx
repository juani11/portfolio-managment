import { Skeleton } from '@heroui/react'

const AssetSkeleton = ({
    height = 'h-2',
    width = 'w-30',
    withAvatar = false,
}: {
    height?: string
    width?: string
    withAvatar?: boolean
}) => {
    return (
        <div className="flex items-center gap-2">
            {withAvatar && <Skeleton className="flex rounded-full w-6 h-6" />}
            <div className="flex flex-col gap-2 items-start">
                <Skeleton className={`${height} ${width} rounded-lg`} />
                <Skeleton className={`${height} w-1/3 rounded-lg`} />
            </div>
        </div>
    )
}

export const LatestInvestmentsSkeleton = ({
    count = 5,
    labelHeight = 'h-2',
    progressHeight = 'h-2',
}: {
    count?: number
    labelHeight?: string
    progressHeight?: string
}) => {
    return (
        <div className="flex flex-col gap-4 py-2">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="flex justify-between items-center pb-2">
                    <AssetSkeleton height={labelHeight} withAvatar />
                    <div className="flex flex-col gap-2 items-start">
                        <Skeleton className={`${labelHeight} w-12 rounded-lg`} />
                        <Skeleton className={`${labelHeight} w-16 rounded-lg`} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export const AssetsCompositionSkeleton = ({
    count = 5,
    labelHeight = 'h-2',
    progressHeight = 'h-2',
    withAvatar = false,
}: {
    count?: number
    labelHeight?: string
    progressHeight?: string
    withAvatar?: boolean
}) => {
    return (
        <div className="flex flex-col gap-4 py-2">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="flex justify-between items-center pb-2">
                    <AssetSkeleton height={labelHeight} withAvatar={withAvatar} />
                    <Skeleton className={`${progressHeight} w-14 rounded-full`} />
                </div>
            ))}
        </div>
    )
}
