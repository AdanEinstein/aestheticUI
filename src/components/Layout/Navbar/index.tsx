
import NavbarContainer from './NavbarContainer'
import NavbarContent from './NavbarContent'
import NavbarRight from './NavbarRight'
import NavbarRoot from './NavbarRoot'

export const Navbar = {
    Root: NavbarRoot,
    Content: NavbarContent,
    Right: NavbarRight,
    Container: NavbarContainer,
}

export type { INavbarProps } from './NavbarRoot'
export type { INavbarRightProps } from './NavbarRight'
export type { INavbarContainerProps } from './NavbarContainer'
