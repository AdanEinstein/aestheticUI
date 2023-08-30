import {  } from 'react'
import { INavbarProps } from './NavbarRoot'
import { tv } from 'tailwind-variants'

const navbar = tv({
  base: 'flex flex-grow items-center justify-start'
})

const NavbarContent = ({ children, className, ...rest }: INavbarProps) => {
  return (
    <div className={navbar({className})} {...rest}>{children}</div>
  )
}

export default NavbarContent