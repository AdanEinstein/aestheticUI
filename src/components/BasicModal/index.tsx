import {
    ForwardRefRenderFunction,
    PropsWithChildren,
    forwardRef,
    useImperativeHandle,
    useState,
} from 'react'
import Modal from '@mui/material/Modal'
import { tv } from 'tailwind-variants'

export interface IBasicModalProps extends PropsWithChildren {
    className?: string
}

export interface IModalAttributes {
    openModal: () => void
    closeModal: () => void
}

const basicModal = tv({
    base: 'absolute top-1/2 left-1/2 md:w-4/6 w-5/6 rounded-lg shadow-2xl',
})

const BasicModal: ForwardRefRenderFunction<IModalAttributes, IBasicModalProps> = (
    { children, className },
    ref,
) => {
    const [open, setOpen] = useState<boolean>(false)

    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    useImperativeHandle(ref, () => {
        return {
            openModal,
            closeModal,
        }
    })

    return (
        <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div
                className={basicModal({ className })}
                style={{
                    transform: 'translate(-50%, -50%)',
                }}
            >
                {children}
            </div>
        </Modal>
    )
}

export default forwardRef(BasicModal)
