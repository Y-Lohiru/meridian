interface Details {
    title: string,
    value: string,
    colorClass: string
}

export default function SummaryCard({title, value, colorClass}: Details) {
    return (

        <div className={`border w-64 h-56 bg-${colorClass}`}>
            <span>{title}</span>
            <span>{value}</span>
            <span>Date</span>
        </div>
    )
}