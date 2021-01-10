import React from 'react';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select as MSelect
} from '@material-ui/core';

import './Select.css';

const options = [
    { title: 'הכרזה - משקיען ואשכול השבוע',                id: 'declaration-weekly-challenges' },
    { title: 'הודעה פרטית - זכייה בווינר (משקיען/אשכול השבוע)', id: 'pm-winner' },
    { title: 'הודעה פרטית - זכייה בשינוי ניק',                id: 'pm-nick' },
    { title: 'הודעה פרטית - זכייה בשינוי תת ניק טקסט',        id: 'pm-subnick-text' },
    { title: 'הודעה פרטית - זכייה בשינוי תת ניק תמונה',        id: 'pm-subnick-img' },
    { title: 'הודעה פרטית - זכייה בנקודת צ׳אמפ',             id: 'pm-champ' },
    { title: 'הודעה פרטית - זכייה בנקודות FxP',              id: 'pm-fxp-points' }
];

interface SelectProps {
    onSelect: (value: any) => void;
    template: string;
}

export default function Select(props: SelectProps) {
    const handleChange = (e: React.ChangeEvent<any>) => {
        const id = options.find(opt => opt.id === e.target.value)?.id;
    
        props.onSelect(id);
    };

    const options2Render = options.map(opt => (
        <MenuItem
            dir="rtl"
            key={opt.id}
            value={opt.id}> {opt.title}
        </MenuItem>
    ));

    return (
        <FormControl style={{ width: '100%' }}>
          <InputLabel id="select-template-label">בחר אופצייה</InputLabel>
          <MSelect
            dir="rtl"
            labelId="select-template-label"
            id="demo-simple-select"
            value={props.template}
            onChange={handleChange}>
            {options2Render}
          </MSelect>
        </FormControl>
    )
}
