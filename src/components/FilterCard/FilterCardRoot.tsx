import { Children, ReactElement, ReactNode, useEffect, useState } from 'react'
import { Card } from '../Layout/Card'
import { useFilterFields } from './contexts/FilterFieldsContext'
import { tv } from 'tailwind-variants'
import { Badge } from '../ui/badge'
import { Search } from 'lucide-react'
import { Collapsible } from '../ui/collapsible'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

type FilterTriggerType = 'onchange' | 'onenter'

export interface FilterCardRootProps<T> {
  dataModel: any[]
  title?: ReactNode
  titleModal?: ReactNode
  action?: ReactNode
  footer?: ReactNode
  className?: string
  filterTrigger?: FilterTriggerType
  showTooltip?: boolean
  TooltipComponent?: (
    children: ReactElement,
    showTooltip: boolean,
    open: boolean,
    filterTrigger?: FilterTriggerType,
  ) => ReactElement
}

const filterCardRoot = tv({
  base: '',
})

const FilterCardRoot = <T,>({
  dataModel,
  title,
  action,
  footer,
  className,
  titleModal,
  filterTrigger = 'onchange',
  showTooltip = false,
  TooltipComponent = (children, showTooltip, open, filterTrigger) =>
    showTooltip ? (
      <div>
        {children}
      </div>
    ) : (
      children
    ),
}: FilterCardRootProps<T>) => {
  const {
    fields,
    filterModalRef,
    removeField,
    setColumns,
    handleChangeSearch,
    handleKeyUpSearch,
    setFilterModalTitle,
  } = useFilterFields()
  const [show, setShow] = useState(true)
  const [showTooltipState, setShowTooltipState] = useState(false)

  useEffect(() => {
    setColumns(dataModel)
    setFilterModalTitle(titleModal ? titleModal : title)
  }, [setColumns, dataModel])

  return (
    <Card.Root className={filterCardRoot({ className })}>
      <Card.Header className="flex justify-between">
        <div className="flex md:flex-row flex-col md:items-center items-start justify-start gap-3">
          {title}
          {Children.toArray(
            fields.map((field) => (
              <Badge onClick={() => removeField(field.value)}>{field.label}</Badge>
            )),
          )}
        </div>
        <div onClick={() => setShow((prev) => !prev)}>
          <Search />
        </div>
      </Card.Header>
      <Collapsible open={show}>
        <Card.Body className="flex flex-col gap-3">
          {fields.length
            ? Children.toArray(
                fields.map((field, index) =>
                  TooltipComponent(
                    <div>
                      <Label>{field.label || 'Filtro vazio'}</Label>
                      <Input
                        className="w-full"
                        name={`pesquisa_${field.value}`}
                        placeholder="Termo de pesquisa"
                        onChange={(e) =>
                          filterTrigger == 'onchange' && handleChangeSearch(e, index)
                        }
                        onKeyUp={(e) =>
                          filterTrigger == 'onenter' &&
                          e.code == 'Enter' &&
                          handleKeyUpSearch(e, index)
                        }
                      />
                    </div>,
                    showTooltip,
                    showTooltipState,
                    filterTrigger,
                  ),
                ),
              )
            : TooltipComponent(
                <div>
                  <Label className='text-left'>Pesquisa</Label>
                  <Input
                    className="w-full"
                    name="pesquisa"
                    placeholder="Termo de pesquisa"
                    onFocus={() => setShowTooltipState(true)}
                    onBlur={() => setShowTooltipState(false)}
                    onChange={(e) => filterTrigger == 'onchange' && handleChangeSearch(e)}
                    onKeyUp={(e) =>
                      filterTrigger == 'onenter' && e.code == 'Enter' && handleKeyUpSearch(e)
                    }
                  />
                </div>,
                showTooltip,
                showTooltipState,
                filterTrigger,
              )}
          <Button
            onFocus={() => setShowTooltipState(true)}
            onBlur={() => setShowTooltipState(false)}
            onClick={() => {
              if (filterModalRef.current) filterModalRef.current.handleOpen()
            }}
          >
            Filtrar
          </Button>
          {action}
        </Card.Body>
        {!!footer && <Card.Footer>{footer}</Card.Footer>}
      </Collapsible>
    </Card.Root>
  )
}

export default FilterCardRoot
