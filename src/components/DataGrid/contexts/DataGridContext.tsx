import BasicModal from '@/components/BasicModal'
import { IModalAttributes } from '@/components/BasicModal'
import { GridRenderCellParams, GridTreeNodeWithRender, GridValidRowModel } from '@mui/x-data-grid'
import {
    Dispatch,
    PropsWithChildren,
    ReactNode,
    RefObject,
    SetStateAction,
    createContext,
    useContext,
    useRef,
    useState,
} from 'react'

export interface IDataGridProvider<T extends GridValidRowModel> {
    params: GridRenderCellParams<T, any, any, GridTreeNodeWithRender>
}

export interface IDataGridContext<T extends GridValidRowModel> {
    params: GridRenderCellParams<T, any, any, GridTreeNodeWithRender>
    setComponentDelete: Dispatch<SetStateAction<ReactNode>>
    setComponentEdit: Dispatch<SetStateAction<ReactNode>>
    modalDeleteRef: RefObject<IModalAttributes>
    modalEditRef: RefObject<IModalAttributes>
}

const DataGridContext = createContext({} as IDataGridContext<any>)

export default function DataGridProvider<T extends GridValidRowModel>({
    children,
    params,
}: PropsWithChildren<IDataGridProvider<T>>) {
    const modalDeleteRef = useRef<IModalAttributes>(null)
    const modalEditRef = useRef<IModalAttributes>(null)
    const [componentDelete, setComponentDelete] = useState<ReactNode>()
    const [componentEdit, setComponentEdit] = useState<ReactNode>()

    return (
        <DataGridContext.Provider
            value={{ params, setComponentDelete, setComponentEdit, modalDeleteRef, modalEditRef }}
        >
            {children}
            <BasicModal ref={modalDeleteRef}>{componentDelete}</BasicModal>
            <BasicModal ref={modalEditRef}>{componentEdit}</BasicModal>
        </DataGridContext.Provider>
    )
}

export const useDataGrid = () => useContext(DataGridContext)
