import { Card, CardDescription, CardHeader } from "@/components/ui/card";

import { CertificatesTable } from "./certificates-table";

export const DetectedCertificatesTab = () => {
    return (
        <Card className="pb-0">
            <CardHeader>
                <CardDescription>
                    This list shows all certificates that have been detected on this site.
                </CardDescription>
            </CardHeader>
            <CertificatesTable />
        </Card>
    );
};
