import type { TTarget } from "@/types/models";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { FilterSelect } from "./filter-select";
import { DatePicker } from "./date-picker";
import { RunsTable } from "./runs-table";

const checkOptions = [
    { value: "all", label: "All" },
    { value: "uptime", label: "Uptime" },
    { value: "performance", label: "Performance" },
];

const resultOptions = [
    { value: "all", label: "All" },
    { value: "succeeded", label: "Succeeded" },
    { value: "failed", label: "Failed" },
];

export const HistoryTab = ({ target }: { target: TTarget }) => {
    const [check, setCheck] = useState("all");
    const [result, setResult] = useState("all");
    const [from, setFrom] = useState<Date>();
    const [to, setTo] = useState<Date>();

    return (
        <Card className="py-0">
            <CardContent className="grid gap-4 border-b py-4 sm:grid-cols-2 lg:grid-cols-4">
                <FilterSelect
                    label="Check"
                    items={checkOptions}
                    value={check}
                    onChange={setCheck}
                />
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
