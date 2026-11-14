import SummaryCard from "./summaryCards";

export default function SummarySection() {
    return (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-3.5">
            <SummaryCard title="Revenue" value="$1000" colorClass="on-brand" />
            <SummaryCard title="Orders" value="100" colorClass="on-brand" />
            <SummaryCard title="Average Order" value="$300" colorClass="on-brand" />
            <SummaryCard title="Waiting to ship" value="12" colorClass="brand" />
        </div>
    )
}

