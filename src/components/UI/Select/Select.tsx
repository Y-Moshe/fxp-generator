import React from 'react';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select as MSelect
} from '@material-ui/core';

import {
    DECLARATION_WEEKLY_CHALLENGES,
    PM_WINNER,
    PM_NICK,
    PM_SUBNICK_TEXT,
    PM_SUBNICK_IMG,
    PM_CHAMP,
    PM_FXP_POINTS
} from '../../../Data';

const options = [
    { title: 'הכרזה - משקיען ואשכול השבוע',                id: DECLARATION_WEEKLY_CHALLENGES },
    { title: 'הודעה פרטית - זכייה בווינר (משקיען/אשכול השבוע)', id: PM_WINNER },
    { title: 'הודעה פרטית - זכייה בשינוי ניק',                id: PM_NICK },
    { title: 'הודעה פרטית - זכייה בשינוי תת ניק טקסט',        id: PM_SUBNICK_TEXT },
    { title: 'הודעה פרטית - זכייה בשינוי תת ניק תמונה',        id: PM_SUBNICK_IMG },
    { title: 'הודעה פרטית - זכייה בנקודת צ׳אמפ',             id: PM_CHAMP },
    { title: 'הודעה פרטית - זכייה בנקודות FxP',              id: PM_FXP_POINTS }
];

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
