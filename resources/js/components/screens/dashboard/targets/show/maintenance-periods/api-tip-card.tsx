import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
} from "@/components/ui/code-block";

const request = (
    targetId: string,
    action: string,
) => `$ curl -X POST https://pingr.app/api/targets/${targetId}/${action} \\
    -H "Authorization: Bearer $PINGR_TOKEN" \\
    -H "Accept: application/json" \\
    -H "Content-Type: application/json"`;

export const ApiTipCard = ({ targetId }: { targetId: string }) => {
    const command = [
        '$ PINGR_TOKEN="your API token"',
        request(targetId, "start-maintenance"),
        request(targetId, "stop-maintenance"),
    ].join("\n\n");

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">API tip</CardTitle>
                <CardDescription>
                    You can add a maintenance window using our API whenever you deploy your site and
                    stop the maintenance when your deployment is finished.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CodeBlock>
                    <CodeBlockActions>
                        <CodeBlockCopyButton value={command} />
                    </CodeBlockActions>
                    <CodeBlockContent>{command}</CodeBlockContent>
                </CodeBlock>
            </CardContent>
        </Card>
    );
};
