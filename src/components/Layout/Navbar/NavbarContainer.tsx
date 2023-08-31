import {} from 'react'
import { tv } from 'tailwind-variants'
import { INavbarProps } from './NavbarRoot'

interface INavbarContainerProps extends INavbarProps {
    title?: string
    subtitle?: string
}

const navbar = tv({
    base: 'flex flex-col items-end',
})

const NavbarContainer = ({
    title,
    subtitle,
    children,
    className,
    ...rest
}: INavbarContainerProps) => {
    return (
        <div className={navbar({ className })} {...rest}>
            <div className="text-md font-medium md:block hidden">{title}</div>
            <div className="text-sm font-regular md:block hidden">{subtitle}</div>
            {children}
        </div>
    )
}

export default NavbarContainer
