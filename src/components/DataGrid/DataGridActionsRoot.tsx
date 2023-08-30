import { PropsWithChildren } from "react";
import DataGridProvider from "./contexts/DataGridContext";
import { GridRenderCellParams, GridTreeNodeWithRender, GridValidRowModel } from "@mui/x-data-grid";
import { tv } from "tailwind-variants";

export interface IDataGridActionsRoot<T extends GridValidRowModel> {
  className?: string
  params: GridRenderCellParams<T, any, any, GridTreeNodeWithRender>
}

const dataGridActionsRoot = tv({
  base: 'flex'
})

export default function DataGridActionsRoot<T extends GridValidRowModel>({children, params, className}: PropsWithChildren<IDataGridActionsRoot<T>>){
  return (
    <DataGridProvider params={params}>
      <div className={dataGridActionsRoot({className})}>
        {children}
      </div>
    </DataGridProvider>
  )
}