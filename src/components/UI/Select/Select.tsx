import React from 'react';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select as MSelect
} from '@material-ui/core';

import { PM_WINNER, options } from '../../../Data';

interface SelectProps {
    onSelect: ( value: any ) => void;
    template: string;
}

export default function Select( props: SelectProps ) {
    const handleChange = ( e: React.ChangeEvent<any> ) => {
        const id = options.find( opt => opt.id === e.target.value )?.id;
    
        props.onSelect( id );
    };

    const options2Render = options.map( opt => (
        <MenuItem
            // Disabling PM_WINNER because was not yet implemented.
            disabled = { opt.id === PM_WINNER }
            dir      = "rtl"
            key      = { opt.id }
            value    = { opt.id } > { opt.title }
        </MenuItem>
    ));

    return (
        <FormControl style = {{ width: '100%' }}>
          <InputLabel id = "select-template-label"> בחר אופצייה </InputLabel>
          <MSelect
             dir      = "rtl"
             labelId  = "select-template-label"
             value    = { props.template }
             onChange = { handleChange } > { options2Render }
          </MSelect>
        </FormControl>
    )
}
