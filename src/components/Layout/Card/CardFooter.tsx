import { tv } from 'tailwind-variants'
import { ICardProps } from "./CardRoot";

const card = tv({
  base: 'rounded-b-md border-t-2 border-gray-200 dark:border-neutral-600 px-6 py-3 dark:text-neutral-50'
})

const CardFooter = ({ children, className, ...rest }: ICardProps) => {
    return (
        <div className={card({className})} {...rest}>{children}</div>
    )
}

export default CardFooter;
