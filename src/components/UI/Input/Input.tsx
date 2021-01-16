import React, { ChangeEvent } from 'react';
import { StandardTextFieldProps, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import getForumDisplayQSerach from '../../../API';

interface InputProps extends StandardTextFieldProps {
    hint: string;
    name: string;
    options?: any[];
    setValues?: any;
    values?: any;
}

export default function Input(props: InputProps) {
    const handleUpdateOptions = ( setValues: Function, values: any, e: React.ChangeEvent<any>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
        getForumDisplayQSerach( e.target.value )
            .then(response => {
                const options = response.data || [];

                setValues(({
                    ...values,
                    options
                }));
            }).catch (error => console.log( error ));
    };

    if (props.name === 'forumName') {
    return <Autocomplete
        style          = {{ width: '100%' }}
        options        = { props.values.options }
        getOptionLabel = { ( option: any ) => option }
        value          = { props.value }
        onSelect       = { ( e: ChangeEvent<any> ) => props.setValues({ ...props.values, [props.name]: e.target.value }) }
        renderInput    = { params =>
            <TextField
                { ...params }
                type       = { props.type }
                name       = { props.name }
                label      = { props.label }
                helperText = { props.hint }
                error      = { props.error }
                value      = { props.value }
                onBlur     = { props.onBlur }
                onChange   = { ( e: ChangeEvent<any> ) => handleUpdateOptions( props.setValues, props.values, e ) } />
        } />;
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
