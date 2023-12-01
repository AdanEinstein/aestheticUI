
import { tv } from 'tailwind-variants'
import { INavbarProps } from './NavbarRoot'

export interface INavbarContainerProps extends INavbarProps {
    title?: string
    subtitle?: string
    currentUser?: string,
}

const navbar = tv({
    base: 'flex flex-col items-end',
})

const NavbarContainer = ({
    title,
    subtitle,
    children,
    className,
    currentUser,
    ...rest
}: INavbarContainerProps) => {
    return (
        <div className={navbar({ className })} {...rest}>
            <div className="text-md font-medium">{title}</div>
            <div className="text-sm font-regular">
                {!!currentUser ? `Usuário: ${currentUser}` : subtitle}
            </div>
            {children}
        </div>
    )
}

export default NavbarContainer
