import type { TTarget } from "@/types/models";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { FilterSelect } from "@/components/screens/dashboard/targets/show/uptime/history/filter-select";
import { DatePicker } from "@/components/screens/dashboard/targets/show/uptime/history/date-picker";

import { RunsTable } from "./runs-table";

const resultOptions = [
    { value: "all", label: "All" },
    { value: "succeeded", label: "Succeeded" },
    { value: "failed", label: "Failed" },
];

export const HistoryTab = ({ target }: { target: TTarget }) => {
    const [result, setResult] = useState("all");
    const [from, setFrom] = useState<Date>();
    const [to, setTo] = useState<Date>();

    return (
        <Card className="py-0">
            <CardContent className="grid gap-4 border-b py-4 sm:grid-cols-3">
                <FilterSelect
                    label="Result"
                    items={resultOptions}
                    value={result}
                    onChange={setResult}
                />
                <DatePicker label="Ended at (from)" value={from} onChange={setFrom} />
                <DatePicker label="Ended at (to)" value={to} onChange={setTo} />
            </CardContent>
            <RunsTable endpoint={target.label ?? target.endpoint} />
        </Card>
    );
};
