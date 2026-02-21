interface EmptyStateProps {
    className?: string
    title: string
    description?: string
    icon?: React.ReactNode
}

type Props = React.PropsWithChildren<EmptyStateProps>

const EmptyState = ({ className, title, description, icon, children }: Props) => {
    return (
        <div
            className={`flex flex-col items-center justify-center gap-3 py-8 px-4 text-center h-full ${className}`}
            role="status"
            aria-label={title}
        >
            {icon && icon}
            <div className="flex flex-col gap-1">
                <p className="text-small font-bold text-default-700">{title}</p>
                {description && <p className="text-xs text-default-400 ">{description}</p>}
            </div>
            {children}
        </div>
    )
}

export default EmptyState
