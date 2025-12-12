interface HeadingProps {
    title: string;
    description: string
}

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
    return (
        <div className="space-y-3">
            <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {title}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                {description}
            </p>
        </div>
    )
}