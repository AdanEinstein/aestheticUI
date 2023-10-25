
import { IconButton, IconButtonProps } from '@mui/material'
import { PropsWithChildren, ReactNode, useCallback } from 'react'
import { tv } from 'tailwind-variants'
import EditIcon from '@mui/icons-material/Edit'
import { useDataGrid } from './contexts/DataGridContext'

export interface IDataGridActionsEditProps extends IconButtonProps {
    className?: string
    icon?: ReactNode
}

const dataGridActionsEdit = tv({
    base: 'bg-blue-500',
})

export default function DataGridActionsEdit({
    className,
    color = 'info',
    icon = <EditIcon />,
    children,
    ...rest
}: PropsWithChildren<IDataGridActionsEditProps>) {
    const { modalEditRef, setComponentEdit } = useDataGrid()

    const openModal = useCallback(() => {
        setComponentEdit(children)
        modalEditRef.current?.openModal()
    }, [setComponentEdit, modalEditRef, children])

    return (
        <>
            <IconButton
                className={dataGridActionsEdit({ className })}
                color={color}
                onClick={openModal}
                {...rest}
            >
                {icon}
            </IconButton>
            {children}
        </>
    )
}
