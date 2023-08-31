'use client'
import {
    ChangeEvent,
    PropsWithChildren,
    RefObject,
    createContext,
    useContext,
    useRef,
    useState,
} from 'react'
import { GridColDef } from '@mui/x-data-grid'
import FilterModal from './FilterModal'
import { useSnackbar } from 'notistack'
import { IModalAttributes } from '@/components/BasicModal'

export interface FilterField {
    label?: string
    value: string
}

interface IFilterFields {
    fields: FilterField[]
    filterModalRef: RefObject<IModalAttributes>
    search: string[]
    handleChangeSearch: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index?: number,
    ) => void
    addField: (field: FilterField) => void
    removeField: (field: string) => void
    setColumns: (columns: GridColDef[]) => void
}

const FilterFieldsContext = createContext<IFilterFields>({} as IFilterFields)

export const FilterFieldsProvider = ({ children }: PropsWithChildren) => {
    const filterModalRef = useRef<IModalAttributes>(null)
    const [fields, setFields] = useState<FilterField[]>([])
    const [columns, setColumns] = useState<GridColDef[]>([])
    const [search, setSearch] = useState<string[]>([''])

    const { enqueueSnackbar } = useSnackbar()

    const handleChangeSearch = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index?: number,
    ) => {
        index
            ? setSearch((prev) => {
                  const newSearch = [...prev]
                  newSearch[index] = e.target.value
                  return newSearch
              })
            : setSearch([e.target.value])
    }

    const addField = (field: FilterField) => {
        setSearch((prev) => [...prev, ''])
        setFields((prev) => {
            if (field.value == '0' || field.value == '') {
                enqueueSnackbar('Selecione um campo válido!', { variant: 'info' })
                return prev
            } else if (prev.find((el) => el.value === field.value)) {
                enqueueSnackbar('Campo já selecionado!', { variant: 'error' })
                return prev
            }
            return [...prev, field]
        })
    }

    const removeField = (field: string) => {
        setFields((prev) => {
            return prev.filter((el, i) => {
                if (el.value !== field) {
                    return true
                }
                setSearch((prevSearch) => prevSearch.filter((_, index) => index !== i))
                return false
            })
        })
    }

    return (
        <FilterFieldsContext.Provider
            value={{
                fields,
                filterModalRef,
                addField,
                handleChangeSearch,
                removeField,
                setColumns,
                search,
            }}
        >
            <FilterModal title="Filtrar Campos" columns={columns} ref={filterModalRef} />
            {children}
        </FilterFieldsContext.Provider>
    )
}

export const useFilterFields = () => useContext(FilterFieldsContext)
