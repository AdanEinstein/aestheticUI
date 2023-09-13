export interface NavItemItem {
    label: string
    link: (end?: string) => string
}

export type NavItem =
    | {
          name: string
          items: Record<string, NavItemItem>
          link?: never
      }
    | {
          name: string
          link?: string
          handleLink: (param: NavItem) => void | Promise<void>
          items?: never
      }

interface INav extends Record<string, NavItem>{}