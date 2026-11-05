export const StatGrid = ({ stats }: { stats: { label: string; value: string }[] }) => {
    return (
        <dl
            className="grid divide-x border"
            style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
        >
            {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1 px-4 py-3">
                    <dt className="text-xs text-muted-foreground uppercase">{stat.label}</dt>
                    <dd className="text-base font-medium">{stat.value}</dd>
                </div>
            ))}
        </dl>
    );
};
