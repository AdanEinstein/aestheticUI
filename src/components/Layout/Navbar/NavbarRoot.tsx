
import { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'

export type INavbarProps = ComponentProps<'div'>

const navbar = tv({
    base: 'z-30 h-16 w-full flex items-center justify-start box-border px-8 pb-2 bg-primary',
})

const NavbarRoot = ({ children, className, ...rest }: INavbarProps) => {
    return (
        <div className={navbar({ className })} {...rest}>
            {children}
        </div>
    )
}

export default NavbarRoot
