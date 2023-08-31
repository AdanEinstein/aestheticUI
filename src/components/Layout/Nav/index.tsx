'use client'
import { MenuItem } from '@mui/material'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import { ComponentProps, ComponentType, MouseEvent, useState } from 'react'
import { tv } from 'tailwind-variants'
import { NavItem } from '@/@types/sitemap'

export interface INavProps extends ComponentProps<'div'> {
    sitemap: NavItem[]
    linkWrapper?: ComponentType<ComponentProps<'a'>>
}

const nav = tv({
    base: 'flex flex-row',
})

const Nav = ({ className, sitemap, linkWrapper: Link }: INavProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div className={nav({ className })}>
            {sitemap.map((item: NavItem) => (
                <div key={item.id}>
                    <Button
                        id="basic-button"
                        style={{ color: '#FFF', fontWeight: 'bold' }}
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={!!item?.link ? () => item.handleLink(item) : handleClick}
                    >
                        {item.name}
                    </Button>
                    {!!item.items?.length && (
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {item.items?.map((el) => (
                                <MenuItem key={el.id} onClick={handleClose}>
                                    {!!Link ? (
                                        <Link href={el.link()}>{el.label}</Link>
                                    ) : (
                                        <a href={el.link()}>{el.label}</a>
                                    )}
                                </MenuItem>
                            ))}
                        </Menu>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Nav
