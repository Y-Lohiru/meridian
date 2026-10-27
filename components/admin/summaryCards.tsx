interface Details {
    title: string,
    value: string,
    colorClass: string
}

export default function SummaryCard({title, value, colorClass}: Details) {
    return (

        <div className={`border w-64 h-40 bg-${colorClass} font-sans font-semibold p-2.5`}>
            <span>{title}</span>
            <span>{value}</span>
            <span>Date</span>
        </div>
    )
}