import {
    StandardTextFieldProps,
    TextField,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel,
    Switch
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

interface InputProps extends StandardTextFieldProps {
    value: any;
    hint?: string;
    name: string;
    setValues?: any;
    onChange: any;
    autoCompleteOptions?: any;
    selectOptions?: any[];
    radioOptions?: any[];
    icon?: any;
    checkedIcon?: any;
}

export default function Input( props: InputProps ) {
    const handleAutoCompleteSelect: any = ( value: any ) => {
        props.setValues(( values: any ) => ({
            ...values,
            ...value
        }));
    };
    let jsx2Return: any;

    switch ( props.type ) {
        case 'autocomplete':
            jsx2Return = (
                <Autocomplete
                    fullWidth
                    freeSolo
                    options        = { props.autoCompleteOptions }
                    getOptionLabel = { ( forum: any ) => forum.forumName }
                    onChange       = { ( e, value ) => handleAutoCompleteSelect( value ) }
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
            break;
        case 'select':
            jsx2Return = (
                <FormControl fullWidth>
                    <InputLabel id = { props.name + '-label' }> { props.label } </InputLabel>
                    <Select
                        labelId  = { props.name + '-label' }
                        name     = { props.name }
                        value    = { props.value }
                        onChange = { props.onChange } >
                        {
                            // @ts-ignore
                            props.selectOptions.map( ({ label, value }) => (
                                <MenuItem
                                    key   = {value}
                                    value = {value} > {label} </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            );
            break;
        case 'radio':
            jsx2Return = (
                <FormControl style = {{ margin: 10 }}>
                    <FormLabel>{ props.label }</FormLabel>
                    <RadioGroup
                        aria-label = { props.name }
                        name       = { props.name }
                        value      = { props.value }
                        onChange   = { props.onChange } >
                        {
                            // @ts-ignore
                            props.radioOptions.map( ({ label, value }) => (
                                <FormControlLabel
                                    key   = { value }
                                    value   = { value }
                                    label   = { label }
                                    control = { <Radio color = "primary" /> } />
                            ))
                        }
                    </RadioGroup>
                </FormControl>
            );
            break;
        case 'switch':
            jsx2Return = (
                <FormControl fullWidth>
                    <Switch
                        color       = { props.color }
                        checked     = { props.value }
                        onChange    = { props.onChange }
                        name        = { props.name }
                        icon        = { props.icon }
                        checkedIcon = { props.checkedIcon } />
                </FormControl>
            );
            break;
    
        default:
            jsx2Return = (<>
                <TextField
                    disabled   = { props.disabled }
                    type       = { props.type }
                    name       = { props.name }
                    label      = { props.label }
                    onChange   = { props.onChange }
                    onBlur     = { props.onBlur }
                    helperText = { props.hint }
                    error      = { props.error }
                    value      = { props.value }
                    fullWidth />
                    {
                        props.value && !props.error && props.name === 'forumImg' ?
                        <div style = {{ display: 'flex', margin: 10 }}>
                           <img
                            src    = { props.value }
                            alt    = "Preview"
                            style  = {{
                                margin: 'auto',
                                boxShadow: '0 0 8px grey',
                                maxHeight: 100
                            }} /> 
                        </div> : null
                    }
            </>);
            break;
    }

    return jsx2Return;
}
