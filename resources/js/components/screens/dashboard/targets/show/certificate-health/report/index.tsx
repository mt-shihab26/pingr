import { StatusAlert } from "./status-alert";
import { CertificateChecksCard } from "./certificate-checks-card";
import { CertificateDetailsCard } from "./certificate-details-card";
import { CertificateChainCard } from "./certificate-chain-card";

export const Report = () => {
    return (
        <div className="flex flex-col gap-4">
            <StatusAlert />
            <CertificateChecksCard />
            <CertificateDetailsCard />
            <CertificateChainCard />
        </div>
    );
};
