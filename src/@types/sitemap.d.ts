export interface NavItemItem {
    id: number;
    label: string;
    link: (end?: string) => string;
}

export type NavItem = (
    | {
        id: number;
        name: string;
        items: NavItemItem[];
        link?: never;
    } | {
        id: number;
        name: string;
        link?: string;
        handleLink: (param: NavItem) => void | Promise<void>
        items?: never;
    });
