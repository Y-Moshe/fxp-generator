import React, { ChangeEvent } from 'react';
import {
    StandardTextFieldProps,
    TextField,
    FormControl,
    Select,
    MenuItem,
    InputLabel
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

interface InputProps extends StandardTextFieldProps {
    hint: string;
    name: string;
    setValues?: any;
    onChange: any;
    autoCompleteOptions?: any;
    selectOptions: any[];
}

export default function Input( props: InputProps ) {
    const handleAutoCompleteSelect: any = ( e: ChangeEvent<any>, value: any ) => {
        props.setValues(( values: any ) => ({
            ...values,
            ...value
        }));
    };

    if (props.type === 'autocomplete') {
        return (
            <Autocomplete
                fullWidth
                freeSolo
                options        = { props.autoCompleteOptions }
                getOptionLabel = { ( forum: any ) => forum.forumName }
                onChange       = { handleAutoCompleteSelect }
                renderInput    = { params =>
                <TextField
                    { ...params }
                    type       = "text"
                    name       = { props.name }
                    label      = { props.label }
                    helperText = { props.hint }
                    error      = { props.error }
                    onBlur     = { props.onBlur }
                    onChange   = { props.onChange }
                    value      = { props.value } />
            } />
        );
    } else if (props.type === 'select') {
        return (
            <FormControl fullWidth>
                <InputLabel id = { props.name + '-label' }> { props.label } </InputLabel>
                <Select
                    labelId  = { props.name + '-label' }
                    name     = { props.name }
                    value    = { props.value }
                    onChange = { props.onChange } >
                    {props.selectOptions
                        .map( ({ title, value }) => <MenuItem key={value} value = {value}> {title} </MenuItem> )}
                </Select>
            </FormControl>
        );
    }

    return (
        <TextField
            type       = { props.type }
            name       = { props.name }
            label      = { props.label }
            onChange   = { props.onChange }
            onBlur     = { props.onBlur }
            helperText = { props.hint }
            error      = { props.error }
            value      = { props.value }
            fullWidth />
    );
}
