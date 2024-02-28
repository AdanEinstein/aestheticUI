import { Children, ReactElement, ReactNode, useEffect, useState } from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { Button, Chip, Collapse, Grid, Stack, Tooltip } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { Card } from '../Layout/Card'
import Input from '../Forms/Input'
import { useFilterFields } from './contexts/FilterFieldsContext'
import { tv } from 'tailwind-variants'
import SearchIcon from '@mui/icons-material/Search'

type FilterTriggerType = 'onchange' | 'onenter'

export interface FilterCardRootProps<T extends object> {
  dataModel: GridColDef<T>[]
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

const FilterCardRoot = <T extends object>({
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
      <Tooltip
        open={open}
        title={
          filterTrigger == 'onchange'
            ? 'A filtragem é feita enquanto digita'
            : 'Pressione ENTER para filtrar'
        }
        arrow
      >
        {children}
      </Tooltip>
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
    setFilterModalTitle(!!titleModal ? titleModal : title)
  }, [setColumns, dataModel])

  return (
    <Card.Root className={filterCardRoot({ className })}>
      <Card.Header className="flex justify-between">
        <div className="flex md:flex-row flex-col md:items-center items-start justify-start gap-3">
          {title}
          {Children.toArray(
            fields.map((field) => (
              <Chip
                style={{ backgroundColor: '#FFF' }}
                // key={field.value}
                label={field.label}
                variant="filled"
                onDelete={() => removeField(field.value)}
              />
            )),
          )}
        </div>
        <div className="hover:bg-blue-300 rounded-lg p-1" onClick={() => setShow((prev) => !prev)}>
          <SearchIcon />
        </div>
      </Card.Header>
      <Collapse in={show}>
        <Card.Body className="flex flex-col gap-3">
          <Grid container spacing={2}>
            <Grid item lg={10} sm={8} xs={12}>
              {fields.length
                ? Children.toArray(
                    fields.map((field, index) =>
                      TooltipComponent(
                        <Input
                          className="w-full"
                          label={field.label || 'Filtro vazio'}
                          type="text"
                          id="pesquisa"
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
                        />,
                        showTooltip,
                        showTooltipState,
                        filterTrigger,
                      ),
                    ),
                  )
                : TooltipComponent(
                    <Input
                      className="w-full"
                      label="Pesquisa"
                      type="text"
                      id="pesquisa"
                      name="pesquisa"
                      placeholder="Termo de pesquisa"
                      onFocus={() => setShowTooltipState(true)}
                      onBlur={() => setShowTooltipState(false)}
                      onChange={(e) => filterTrigger == 'onchange' && handleChangeSearch(e)}
                      onKeyUp={(e) =>
                        filterTrigger == 'onenter' && e.code == 'Enter' && handleKeyUpSearch(e)
                      }
                    />,
                    showTooltip,
                    showTooltipState,
                    filterTrigger,
                  )}
            </Grid>
            <Grid item lg={2} sm={4} xs={12}>
              <Stack>
                <Button
                  size="large"
                  type="button"
                  variant="outlined"
                  onFocus={() => setShowTooltipState(true)}
                  onBlur={() => setShowTooltipState(false)}
                  endIcon={<FilterAltIcon />}
                  onClick={() => {
                    if (!!filterModalRef.current) filterModalRef.current.openModal()
                  }}
                >
                  Filtrar
                </Button>
              </Stack>
            </Grid>
          </Grid>
          {action}
        </Card.Body>
        {!!footer && <Card.Footer>{footer}</Card.Footer>}
      </Collapse>
    </Card.Root>
  )
}

export default FilterCardRoot
