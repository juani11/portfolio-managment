interface CardTitleProps {
    title: string
    className?: string
}

const CardTitle = ({ title, className }: CardTitleProps) => {
    return <small className={`text-default-400 text-sm ${className}`}>{title}</small>
}

export default CardTitle
