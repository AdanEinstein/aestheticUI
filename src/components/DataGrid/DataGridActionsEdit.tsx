
import { PropsWithChildren, ReactNode, useCallback } from 'react'
import { tv } from 'tailwind-variants'
import { useDataGrid } from './contexts/DataGridContext'

export interface IDataGridActionsEditProps {
    className?: string
    icon?: ReactNode
}

const dataGridActionsEdit = tv({
    base: 'bg-blue-500',
})

export default function DataGridActionsEdit({
    className,
    children,
    icon,
    ...rest
}: PropsWithChildren<IDataGridActionsEditProps>) {
    const { modalEditRef, setComponentEdit } = useDataGrid()

    const openModal = useCallback(() => {
        setComponentEdit(children)
        if(!!modalEditRef.current) modalEditRef.current.handleOpen()
    }, [setComponentEdit, modalEditRef, children])

    return (
        <button
            className={dataGridActionsEdit({ className })}
            onClick={openModal}
            {...rest}
        >
            {icon}
        </button>
    )
}
