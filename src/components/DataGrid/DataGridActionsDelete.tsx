
import { IconButton, IconButtonProps } from '@mui/material'
import { PropsWithChildren, ReactNode, useCallback } from 'react'
import { tv } from 'tailwind-variants'
import { useDataGrid } from './contexts/DataGridContext'
import DeleteIcon from '@mui/icons-material/Delete'

export interface IDataGridActionsDeleteProps extends IconButtonProps {
    className?: string
    icon?: ReactNode
}

const dataGridActionsDelete = tv({
    base: 'bg-red-500',
})

export default function DataGridActionsDelete({
    className,
    color = 'error',
    icon = <DeleteIcon />,
    children,
    ...rest
}: PropsWithChildren<IDataGridActionsDeleteProps>) {
    const { modalDeleteRef, setComponentDelete } = useDataGrid()

    const openModal = useCallback(() => {
        setComponentDelete(children)
        modalDeleteRef.current?.openModal()
    }, [setComponentDelete, modalDeleteRef, children])

    return (
        <IconButton
            className={dataGridActionsDelete({ className })}
            color={color}
            onClick={openModal}
            {...rest}
        >
            {icon}
        </IconButton>
    )
}
