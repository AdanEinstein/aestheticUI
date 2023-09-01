
import { FormControl, FormHelperText, InputLabel, Select as Sel, SelectProps } from '@mui/material'
import { ForwardedRef, PropsWithChildren, forwardRef } from 'react'

export interface ISelectProps extends PropsWithChildren<SelectProps> {
    label: string
    isError?: boolean
    errorMessage?: string
    variant?: 'standard' | 'outlined' | 'filled'
}

function Select(
    {
        isError = false,
        errorMessage = '',
        variant = 'standard',
        label,
        children,
        ...rest
    }: ISelectProps,
    ref: ForwardedRef<HTMLSelectElement>,
) {
    return (
        <FormControl variant={variant} error={isError}>
            <InputLabel>{label}</InputLabel>
            <Sel label={label} {...rest} ref={ref}>
                {children}
            </Sel>
            <FormHelperText>{errorMessage}</FormHelperText>
        </FormControl>
    )
}

export default forwardRef(Select)
