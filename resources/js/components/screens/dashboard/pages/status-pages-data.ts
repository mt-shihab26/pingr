export type TStatusPage = {
    id: string;
    name: string;
    slug: string;
    active: boolean;
    monitors: string[];
    customDomain: string | null;
    autoUpdates: boolean;
};

export const statusPages: TStatusPage[] = [
    {
        id: "11434",
        name: "Shihab",
        slug: "shihab",
        active: true,
        monitors: [],
        customDomain: null,
        autoUpdates: true,
    },
    {
        id: "11435",
        name: "Tic Tac Toe",
        slug: "tic-tac-toe",
        active: false,
        monitors: ["tic-tac-toe.developershihab.com"],
        customDomain: "status.developershihab.com",
        autoUpdates: false,
    },
];

export const findStatusPage = (id: string): TStatusPage =>
    statusPages.find((page) => page.id === id) ?? { ...statusPages[0], id };
