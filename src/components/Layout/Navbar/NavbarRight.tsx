
import { ComponentProps, ReactNode } from 'react'
import { tv } from 'tailwind-variants'

export interface INavbarRightProps extends ComponentProps<'div'> {
    currentUser?: string,
    handleLogout?: () => Promise<void>
    icon?: ReactNode
}

const navbar = tv({
    base: 'flex items-center text-white',
})

const NavbarRight = ({ children, className, currentUser, handleLogout, icon, ...rest }: INavbarRightProps) => {
    return (
        <div className={navbar({ className })} {...rest}>
            {children}
            {
           !!currentUser &&
           <button
             style={{ color: "white" }}
             aria-label="logout" 
             onClick={handleLogout}
           >
             {icon}
           </button>
         }
        </div>
    )
}

export default NavbarRight
