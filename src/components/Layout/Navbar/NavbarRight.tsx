
import { ComponentProps, ReactNode } from 'react'
import { tv } from 'tailwind-variants'
import { IconButton } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

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
           <IconButton
             style={{ color: "white" }}
             aria-label="logout" 
             size="large"
             onClick={handleLogout}
           >
             {icon || <LogoutIcon />}
           </IconButton>
         }
        </div>
    )
}

export default NavbarRight
