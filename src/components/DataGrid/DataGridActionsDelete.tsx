
import { PropsWithChildren, ReactNode, useCallback } from 'react'
import { tv } from 'tailwind-variants'
import { useDataGrid } from './contexts/DataGridContext'

export interface IDataGridActionsDeleteProps {
    className?: string
    icon?: ReactNode
}

const dataGridActionsDelete = tv({
    base: 'bg-red-500',
})

export default function DataGridActionsDelete({
    className,
    children,
    icon,
    ...rest
}: PropsWithChildren<IDataGridActionsDeleteProps>) {
    const { modalDeleteRef, setComponentDelete } = useDataGrid()

    const openModal = useCallback(() => {
        setComponentDelete(children)
        if(!!modalDeleteRef.current) modalDeleteRef.current.handleOpen()
    }, [setComponentDelete, modalDeleteRef, children])

    return (
        <button
            className={dataGridActionsDelete({ className })}
            onClick={openModal}
            {...rest}
        >
            {icon}
        </button>
    )
}
