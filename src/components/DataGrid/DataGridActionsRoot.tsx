import { PropsWithChildren } from 'react'
import DataGridProvider from './contexts/DataGridContext'
import { tv } from 'tailwind-variants'
import { Row } from '@tanstack/react-table'

export interface IDataGridActionsRoot<T = any> {
  className?: string
  params: Row<T>
}

const dataGridActionsRoot = tv({
  base: 'flex',
})

export default function DataGridActionsRoot<T>({
  children,
  params,
  className,
}: PropsWithChildren<IDataGridActionsRoot<T>>) {
  return (
    <DataGridProvider params={params}>
      <div className={dataGridActionsRoot({ className })}>{children}</div>
    </DataGridProvider>
  )
}
