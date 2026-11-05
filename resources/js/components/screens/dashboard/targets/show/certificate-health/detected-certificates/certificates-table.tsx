import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const certificates = [
    {
        firstDetectedAt: { date: "2026-10-29 10:56:44", relative: "1 week ago" },
        issuer: { name: "WE1", organization: "Google Trust Services" },
        validFrom: { date: "2026-09-22 02:04", relative: "1 month ago" },
        validUntil: { date: "2026-12-21 03:04", relative: "1 month from now" },
        domains: [
            "developershihab.com",
            "tic-tac-toe.developershihab.com",
            "*.tic-tac-toe.developershihab.com",
        ],
    },
];

const DateCell = ({ date, relative }: { date: string; relative: string }) => (
    <div className="flex flex-col">
        <span className="font-mono tabular-nums">{date}</span>
        <span className="text-muted-foreground">{relative}</span>
    </div>
);

export const CertificatesTable = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="pl-4">First detected at</TableHead>
                    <TableHead>Issuer</TableHead>
                    <TableHead>Valid from</TableHead>
                    <TableHead>Valid until</TableHead>
                    <TableHead className="pr-4">Covers domains</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {certificates.map((certificate) => (
                    <TableRow key={certificate.firstDetectedAt.date} className="align-top">
                        <TableCell className="pl-4">
                            <DateCell {...certificate.firstDetectedAt} />
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-col">
                                <span className="font-medium">{certificate.issuer.name}</span>
                                <span className="text-muted-foreground">
                                    {certificate.issuer.organization}
                                </span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <DateCell {...certificate.validFrom} />
                        </TableCell>
                        <TableCell>
                            <DateCell {...certificate.validUntil} />
                        </TableCell>
                        <TableCell className="pr-4 whitespace-normal">
                            {certificate.domains.join(", ")}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
