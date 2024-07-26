import { ComponentProps, ComponentType } from 'react';
import { INav, NavItem } from '../../../@types/sitemap'
import { MenuIcon } from 'lucide-react'
import { tv } from 'tailwind-variants'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu'

export interface INavProps extends ComponentProps<'div'> {
  sitemap: INav
  activeOnMouseOver?: boolean
  linkWrapper?: ComponentType<ComponentProps<'a'>>
}

const nav = tv({
  base: 'flex flex-row',
})

const Item = ({
  item,
  activeOnMouseOver
}: { item: NavItem } & Pick<INavProps, 'linkWrapper' | 'activeOnMouseOver'>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>{item.name}</button>
      </DropdownMenuTrigger>
      {!!item.items && (
        <DropdownMenuContent>
          {Object.entries(item.items).map(([k, el]) => (
            <DropdownMenuItem key={k}>
              <Item item={el} activeOnMouseOver={activeOnMouseOver} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
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
      <div>
        {Object.entries(sitemap).map(([key, item]) => {
          return (
            <Item key={key} item={item} linkWrapper={Link} activeOnMouseOver={activeOnMouseOver} />
          )
        })}
      </div>
      <div>
        {Object.entries(wrapSitemap).map(([key, item]) => {
          return (
            <Item key={key} item={item} linkWrapper={Link} activeOnMouseOver={activeOnMouseOver} />
          )
        })}
      </div>
    </div>
  )
}

export default Nav
