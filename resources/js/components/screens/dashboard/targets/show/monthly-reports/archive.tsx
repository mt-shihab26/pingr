import { FileText } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export const ArchiveTab = () => {
    return (
        <Card>
            <CardContent>
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <FileText />
                        </EmptyMedia>
                        <EmptyTitle>No monthly reports have been generated yet.</EmptyTitle>
                    </EmptyHeader>
                </Empty>
            </CardContent>
        </Card>
    );
};
