'use client'
import { Autocomplete, AutocompleteProps, ChipTypeMap, FormControl, FormHelperText} from "@mui/material";
import { ForwardedRef, forwardRef } from "react";

export interface ISelectAutoCompleteProps<T,
    Multiple extends boolean | undefined = false,
    DisableClearable extends boolean | undefined = false,
    FreeSolo extends boolean | undefined = false,
    ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent> {
    isError?: boolean
    errorMessage?: string
    variant?: 'standard' | 'outlined' | 'filled'
}

function SelectAutoComplete<T>({ isError = false, errorMessage = '', variant = "standard", ...rest }: ISelectAutoCompleteProps<T>, ref: ForwardedRef<HTMLSelectElement>) {
    return (
        <FormControl variant={variant}
            error={isError}
        >
            <Autocomplete
                ref={ref}
                {...rest}
            />
            <FormHelperText>{errorMessage}</FormHelperText>
        </FormControl>
    )
}

export default forwardRef(SelectAutoComplete)