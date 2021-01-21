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

import getForumDisplayQSerach from '../../../API';

interface InputProps extends StandardTextFieldProps {
    hint: string;
    name: string;
    setValues?: any;
    values?: any;
    onChange: any;
    autoCompleteOptions: any[];
    selectOptions: any[];
}

export default function Input(props: InputProps) {
    const handleUpdateOptions = ( setValues: Function, values: any, e: React.ChangeEvent<any>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
        getForumDisplayQSerach( e.target.value )
            .then(response => {
                const autoCompleteOptions = response.data || [];

                setValues(({
                    ...values,
                    autoCompleteOptions
                }));
            }).catch (error => console.log( error ));
    };

    if (props.type === 'autocomplete') {
    return <Autocomplete
        style          = {{ width: '100%' }}
        options        = { props.values.autoCompleteOptions }
        getOptionLabel = { ( option: any ) => option }
        value          = { props.value }
        onSelect       = { ( e: ChangeEvent<any> ) => props.setValues({ ...props.values, [props.name]: e.target.value }) }
        renderInput    = { params =>
            <TextField
                { ...params }
                type       = "text"
                name       = { props.name }
                label      = { props.label }
                helperText = { props.hint }
                error      = { props.error }
                value      = { props.value }
                onBlur     = { props.onBlur }
                onChange   = { ( e: ChangeEvent<any> ) => handleUpdateOptions( props.setValues, props.values, e ) } />
        } />;
    } else if (props.type === 'select') {
        return (
            <FormControl style = {{ width: '100%' }}>
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
            style      = {{ width: '100%' }} />
    )
}
