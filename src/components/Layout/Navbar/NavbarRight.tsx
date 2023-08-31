import {} from 'react'
import { INavbarProps } from './NavbarRoot'
import { tv } from 'tailwind-variants'

const navbar = tv({
    base: 'flex items-center text-white',
})

const NavbarRight = ({ children, className, ...rest }: INavbarProps) => {
    return (
        <div className={navbar({ className })} {...rest}>
            {children}
        </div>
    )
}

export default NavbarRight
