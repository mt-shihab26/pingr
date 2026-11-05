import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
} from "@/components/ui/code-block";

const command = `$ PINGR_TOKEN="your API token"
$ curl -X POST "https://pingr.app/api/checks/1253048/request-run" \\
    -H "Authorization: Bearer $PINGR_TOKEN" \\
    -H "Accept: application/json" \\
    -H "Content-Type: application/json"`;

export const ApiTipCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">API tip</CardTitle>
                <CardDescription>
                    Add this API command to your deploy script and we'll crawl your site to check
                    for broken links immediately after every deploy.
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
