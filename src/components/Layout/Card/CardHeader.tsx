
import { ICardProps } from './CardRoot'
import { tv } from 'tailwind-variants'

const card = tv({
    base: 'rounded-t-md border-b-2 border-gray-200 dark:border-neutral-600 px-6 py-3 mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50',
})

const CardHeader = ({ children, className, ...rest }: ICardProps) => {
    return (
        <div className={card({ className })} {...rest}>
            {children}
        </div>
    )
}

export default CardHeader
