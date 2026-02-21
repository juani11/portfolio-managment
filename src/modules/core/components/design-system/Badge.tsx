interface BadgeProps {
    children: React.ReactNode
    // color: string
    // variant: string
    // size: string
    className: string
    startContent: React.ReactNode
}

const Badge = ({ children, startContent, className }: BadgeProps) => {
    return (
        <span
            className={`flex items-center justify-center px-1.5 py-0.5 text-xs gap-1 ${className}`}
        >
            {startContent && startContent}
            {children}
        </span>
    )
}

export default Badge
