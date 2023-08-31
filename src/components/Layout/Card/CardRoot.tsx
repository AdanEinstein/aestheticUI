import { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'

export type ICardProps = ComponentProps<'div'>

const card = tv({
    base: 'w-full block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700',
})

const CardRoot = ({ children, className, ...rest }: ICardProps) => {
    return (
        <div className={card({ className })} {...rest}>
            {children}
        </div>
    )
}

export default CardRoot
