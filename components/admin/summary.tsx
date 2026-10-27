import SummaryCard from "./summaryCards";

export default function SummarySection() {
    return (
        <div className="flex text-bra flex-row gap-3.5 rounded-full pt-2.5">
            <SummaryCard title="Revenue" value="$1000" colorClass="on-brand" />
            <SummaryCard title="Orders" value="100" colorClass="on-brand" />
            <SummaryCard title="Average Order" value="" colorClass="on-brand" />
            <SummaryCard title="Waiting to ship" value="" colorClass="brand" />
        </div>
    )
}

