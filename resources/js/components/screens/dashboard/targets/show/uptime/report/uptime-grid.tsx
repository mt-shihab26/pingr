export const UptimeGrid = ({ items }: { items: { label: string; uptime: string }[] }) => {
    return (
        <div className="grid grid-cols-2 divide-x divide-y border sm:grid-cols-4 lg:grid-cols-7">
            {items.map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1 p-4">
                    <span className="flex items-center gap-1.5 text-base font-medium tabular-nums">
                        <span className="size-2 rounded-full bg-emerald-500" />
                        {item.uptime}
                    </span>
                    <span className="text-muted-foreground">{item.label}</span>
                </div>
            ))}
        </div>
    );
};
