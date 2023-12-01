import { ReactNode } from "react"

export type NavItem =
    | {
          name: string | ReactNode
          link?: never
          handleLink?: never
          items: Record<string, NavItem>
      }
    | {
          name: string | ReactNode
          link?: never
          items?: never
          handleLink: (param: NavItem) => void | Promise<void>
      }
    | {
          name: string | ReactNode
          items?: never
          handleLink?: never
          link: (end?: string) => string
      }

interface INav extends Record<string, NavItem> {}
