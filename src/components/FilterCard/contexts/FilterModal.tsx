
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { ForwardRefRenderFunction, forwardRef } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import { useFilterFields } from './FilterFieldsContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card } from '../../Layout/Card'
import BasicModal, { IModalAttributes } from '../../BasicModal'

export interface IFilterModalProps {
    title: string
    columns: GridColDef[]
}

const schema = z.object({
    campos: z.string(),
})

const FilterModal: ForwardRefRenderFunction<IModalAttributes, IFilterModalProps> = (
    { title, columns },
    ref,
) => {
    const { addField } = useFilterFields()
    const { register, getValues } = useForm({
        resolver: zodResolver(schema),
    })

    return (
        <BasicModal ref={ref}>
            <Card.Root>
                <Card.Header>{title}</Card.Header>
                <Card.Body>
                    <Grid container spacing={2}>
                        <Grid item md={10} xs={12}>
                            <FormControl className="w-full">
                                <InputLabel>Selecione os campos</InputLabel>
                                <Select
                                    id="campos"
                                    className="w-full"
                                    variant="standard"
                                    {...register('campos')}
                                >
                                    {columns.map((col) => {
                                        return (
                                            col.field != 'actions' && (
                                                <MenuItem key={col.field} value={col.field}>
                                                    {col.headerName}
                                                </MenuItem>
                                            )
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={2} xs={12}>
                            <Button
                                fullWidth
                                endIcon={<FilterAltIcon fontSize="medium" />}
                                onClick={() => {
                                    addField({
                                        label: columns.filter(
                                            (col) => col.field == String(getValues('campos')),
                                        )[0]?.headerName,
                                        value: String(getValues('campos')),
                                    })
                                }}
                            >
                                Adicionar
                            </Button>
                        </Grid>
                    </Grid>
                </Card.Body>
            </Card.Root>
        </BasicModal>
    )
}

export default forwardRef(FilterModal)
