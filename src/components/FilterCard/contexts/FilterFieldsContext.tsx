import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  PropsWithChildren,
  ReactNode,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react'
import FilterModal from './FilterModal'
import { IModalAttributes } from '../../../components/BasicModal'

export interface FilterField {
  label?: ReactNode
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
  handleKeyUpSearch: (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
  ) => void
  addField: (field: FilterField) => void
  removeField: (field: string) => void
  setColumns: (columns: any[]) => void
  setFilterModalTitle: Dispatch<SetStateAction<ReactNode>>
}

const FilterFieldsContext = createContext<IFilterFields>({} as IFilterFields)

export const FilterFieldsProvider = ({ children }: PropsWithChildren) => {
  const filterModalRef = useRef<IModalAttributes>(null)
  const [fields, setFields] = useState<FilterField[]>([])
  const [columns, setColumns] = useState<any[]>([])
  const [search, setSearch] = useState<string[]>([''])
  const [filterModalTitle, setFilterModalTitle] = useState<ReactNode>()

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

  const handleKeyUpSearch = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
  ) => {
    index
      ? setSearch((prev) => {
          const newSearch = [...prev]
          newSearch[index] = e.currentTarget.value
          return newSearch
        })
      : setSearch([e.currentTarget.value])
  }

  const addField = (field: FilterField) => {
    setSearch((prev) => [...prev, ''])
    setFields((prev) => {
      if (field.value == '0' || field.value == '') {
        return prev
      } else if (prev.find((el) => el.value === field.value)) {
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
        handleKeyUpSearch,
        setFilterModalTitle,
        removeField,
        setColumns,
        search,
      }}
    >
      <FilterModal title={filterModalTitle} columns={columns} ref={filterModalRef} />
      {children}
    </FilterFieldsContext.Provider>
  )
}

export const useFilterFields = () => useContext(FilterFieldsContext)
