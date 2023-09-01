
import { tv } from 'tailwind-variants'
import { ICardProps } from './CardRoot'

const card = tv({
    base: 'px-6 py-3',
})
const CardBody = ({ children, className, ...rest }: ICardProps) => {
    return (
        <div className={card({ className })} {...rest}>
            {children}
        </div>
    )
}

export default CardBody
