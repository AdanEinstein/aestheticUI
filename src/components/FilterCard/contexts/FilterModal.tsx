import { Children, ForwardRefRenderFunction, ReactNode, forwardRef } from 'react'
import { useFilterFields } from './FilterFieldsContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card } from '../../Layout/Card'
import BasicModal, { IModalAttributes } from '../../BasicModal'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select'
import { Button } from 'src/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { Form, FormControl, FormField, FormItem } from 'src/components/ui/form'

export interface IFilterModalProps<T = {}> {
  title: ReactNode
  columns: ColumnDef<T>[]
}
const schema = z.object({
  campos: z.string(),
})

type SchemaType = z.infer<typeof schema>

const FilterModal: ForwardRefRenderFunction<IModalAttributes, IFilterModalProps> = (
  { title, columns },
  ref,
) => {
  const { addField } = useFilterFields()
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: SchemaType) => {
    const selectedColumn = columns.find(
      //@ts-ignore
      (col) => col.accessorKey === data.campos,
    )

    if (selectedColumn) {
      addField({
        //@ts-ignore
        label: selectedColumn.header(),
        value: data.campos,
      })
    }
  }

  return (
    <BasicModal ref={ref}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="campos"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione os campos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Campos</SelectLabel>
                        {Children.toArray(
                          columns.map(
                            (col) =>
                              //@ts-ignore
                              col.accessorKey != 'actions' && (
                                //@ts-ignore
                                <SelectItem value={col.accessorKey}>{col.header()}</SelectItem>
                              ),
                          ),
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Adicionar</Button>
        </form>
      </Form>
    </BasicModal>
  )
}

export default forwardRef(FilterModal)
