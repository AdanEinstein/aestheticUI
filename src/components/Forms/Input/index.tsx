
import { FormControl, FormHelperText, InputLabel, Input as Inp, InputProps } from '@mui/material'
import { ForwardedRef, forwardRef } from 'react'

export interface IInputProps extends InputProps {
    label: string
    isError?: boolean
    errorMessage?: string
    variant?: 'standard' | 'outlined' | 'filled'
}

function Input(
    { isError = false, errorMessage = '', variant = 'standard', label, ...rest }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>,
) {
    return (
        <FormControl error={isError} variant={variant} className={rest.className}>
            <InputLabel>{label}</InputLabel>
            <Inp {...rest} ref={ref} />
            <FormHelperText>{errorMessage}</FormHelperText>
        </FormControl>
    )
}

export default forwardRef(Input)
