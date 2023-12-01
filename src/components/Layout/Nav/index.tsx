import { Box, MenuItem } from '@mui/material'
import Button, { ButtonProps } from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { ComponentProps, ComponentType, useRef, useState } from 'react'
import { tv } from 'tailwind-variants'
import { INav, NavItem } from '../../../@types/sitemap'
import MenuIcon from '@mui/icons-material/Menu'

export interface INavProps extends ComponentProps<'div'> {
  sitemap: INav
  activeOnMouseOver?: boolean
  linkWrapper?: ComponentType<ComponentProps<'a'>>
  ItemsProps?: ButtonProps
}

const nav = tv({
  base: 'flex flex-row',
})

const Item = ({
  item,
  linkWrapper: Link,
  hasItems,
  ItemsProps,
  activeOnMouseOver
}: { item: NavItem; hasItems?: boolean } & Pick<
  INavProps,
  'linkWrapper' | 'ItemsProps' | 'activeOnMouseOver'
>) => {
  const anchorRef = useRef<HTMLButtonElement>(null)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)

  const handleAnchor = () => {
    setAnchorEl(anchorRef.current)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleActions = (item: NavItem) => {
    return () => {
      if ('handleLink' in item && !!item.handleLink) {
        item.handleLink(item)
      } else {
        handleAnchor()
      }
    }
  }

  return (
    <>
      <Button
        ref={anchorRef}
        style={
          !!ItemsProps && !!ItemsProps.style
            ? ItemsProps.style
            : { fontWeight: 'bold', color: 'white', textTransform: 'none' }
        }
        onClick={handleActions(item)}
        endIcon={hasItems && <KeyboardArrowRight />}
        onMouseOver={activeOnMouseOver ? handleAnchor : () => {}}
        {...ItemsProps}
      >
        {item.name}
      </Button>
      {!!item.items && (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={
            !!ItemsProps
              ? { horizontal: 'right', vertical: 'top' }
              : { horizontal: 'left', vertical: 'bottom' }
          }
          anchorReference="anchorEl"
          open={open}
          onClose={handleClose}
          MenuListProps={{
            onMouseLeave: handleClose,
          }}
        >
          {Object.entries(item.items).map(([k, el]) => (
            <MenuItem key={k}>
              {!!Link && !!el.link ? (
                <Link href={el.link()}>
                  <Item
                    item={el}
                    linkWrapper={Link}
                    hasItems={!!el.items}
                    ItemsProps={
                      !!ItemsProps
                        ? ItemsProps
                        : {
                            style: { color: '#222', textTransform: 'none' },
                          }
                    }
                    activeOnMouseOver={activeOnMouseOver}
                  />
                </Link>
              ) : (
                <Item
                  item={el}
                  linkWrapper={Link}
                  hasItems={!!el.items}
                  ItemsProps={
                    !!ItemsProps
                      ? ItemsProps
                      : {
                          style: { color: '#222', textTransform: 'none' },
                        }
                  }
                  activeOnMouseOver={activeOnMouseOver}
                />
              )}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  )
}

const Nav = ({ className, sitemap, linkWrapper: Link, activeOnMouseOver = false }: INavProps) => {
  const wrapSitemap = {
    root: {
      name: <MenuIcon />,
      items: { ...sitemap },
    },
  }
  return (
    <div className={nav({ className })}>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {Object.entries(sitemap).map(([key, item]) => {
          return <Item key={key} item={item} linkWrapper={Link} activeOnMouseOver={activeOnMouseOver}/>
        })}
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        {Object.entries(wrapSitemap).map(([key, item]) => {
          return <Item key={key} item={item} linkWrapper={Link} activeOnMouseOver={activeOnMouseOver}/>
        })}
      </Box>
    </div>
  )
}

export default Nav
