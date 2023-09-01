
import { Button, ButtonProps } from '@mui/material'
import { PropsWithChildren, ReactNode, useCallback } from 'react'
import { tv } from 'tailwind-variants'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import { useDataGrid } from './contexts/DataGridContext'

export interface IDataGridActionsDeleteProps extends ButtonProps {
    label: string
    className?: string
    variant?: 'text' | 'contained' | 'outlined'
    color?: 'error' | 'inherit' | 'primary' | 'secondary' | 'success' | 'info' | 'warning'
    endIcon?: ReactNode
}

const dataGridActionsDelete = tv({
    base: 'bg-red-500',
})

export default function DataGridActionsDelete({
    className,
    color = 'error',
    endIcon = <EventBusyIcon />,
    label,
    variant = 'contained',
    children,
    ...rest
}: PropsWithChildren<IDataGridActionsDeleteProps>) {
    const { modalDeleteRef, setComponentDelete } = useDataGrid()

    const openModal = useCallback(() => {
        setComponentDelete(children)
        modalDeleteRef.current?.openModal()
    }, [setComponentDelete, modalDeleteRef, children])

    return (
        <Button
            className={dataGridActionsDelete({ className })}
            variant={variant}
            color={color}
            endIcon={endIcon}
            onClick={openModal}
            {...rest}
        >
            {label}
        </Button>
    )
}
