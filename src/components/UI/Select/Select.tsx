import { ChangeEvent } from 'react';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select as MSelect
} from '@material-ui/core';

import { options } from '../../../Data';

interface SelectProps {
    onSelect: ( value: any ) => void;
    template: string;
}

export default function Select( props: SelectProps ) {
    const handleChange = ( e: ChangeEvent<any> ) => {
        const id = options.find( opt => opt.id === e.target.value )?.id;
    
        props.onSelect( id );
    };

    const options2Render = options.map( opt => (
        <MenuItem
            disabled = { opt.id.includes('category') }
            divider  = { opt.id.includes('category') }
            dir      = "rtl"
            key      = { opt.id }
            value    = { opt.id } > { opt.title }
        </MenuItem>
    ));

    return (
        <FormControl fullWidth>
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
