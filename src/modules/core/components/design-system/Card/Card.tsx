// eslint-disable-next-line simple-import-sort/imports
import {
    CardBody as CardBodyHeroUI,
    CardHeader as CardHeaderHeroUI,
    Card as CardHeroUI,
} from '@heroui/react'
import type { TextSize } from '../../../types/core.types'
import CardTitle from './CardTitle'

interface CardProps {
    className?: string
    children: React.ReactNode
    title?: string
    extra?: React.ReactNode
    size?: TextSize
}

const Card = ({ className, children, title, extra, size }: CardProps) => {
    return (
        <CardHeroUI className={`px-2  text-${size} ${className}`} shadow="sm" radius="sm">
            {title && (
                <CardHeaderHeroUI className="justify-between items-start">
                    <CardTitle title={title} />
                    {extra && extra}
                </CardHeaderHeroUI>
            )}
            <CardBodyHeroUI>{children}</CardBodyHeroUI>
        </CardHeroUI>
    )
}

export default Card
