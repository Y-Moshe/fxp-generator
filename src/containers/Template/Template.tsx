import { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, useTheme } from '@material-ui/core';

import inputs, { PM_WINNER } from '../../Data';
import { getHtmlTemplate, getFormatDate } from '../../API';
import Input from '../../components/UI/Input/Input';
import { UserSettings } from '../Header/Header';
import { usePrevious } from '../../hooks';

interface TemplateProps {
    userSettings: UserSettings | {};
    template: string;
    autoCompleteOptions: any[];
    onSubmit: ( htmlCode: string ) => void;
    onReset: () => void;
}

export default function Template( props: TemplateProps ) {
    const { palette } = useTheme();
    /**
     * Basically, what we doing here is creating the initialState for Formik
     * By looping through all our `inputs` name declared at `Data.tsx` !
     * So all the inputs will be a controlled inputs, and `changing from controlled to uncontrollerd` never occurs
     * This behavior occurs once only
     */
    const initialValues = useMemo(() => {
        const initObj: any = {};
        for (const [ , inpObjects ] of Object.entries( inputs )) {
            for (const inpObj of inpObjects) {
                initObj[ inpObj.name ] = '';
            }
        }

        return initObj;
    }, []);

    /**
     * And what we doing here is re-initializing the validationSchema for Formik
     * By looping only through the relevant `inputs` declared at `Data.tsx` !
     * This behavior occurs whenever `props.template` is changing!
     */
    const validationSchema = useMemo(() => {
        const schemaObj: any = {};

        for (const inpObj of inputs[ props.template ]) {
            schemaObj[ inpObj.name ] = inpObj.validationSchema;
        }

        return yup.object().shape({ ...schemaObj });
    }, [ props.template ]);
    const [savedAutoSelected, setSavedAutoSelected] = useState( {} );

    const handleSubmission = ( values: any ) => {
        const htmlTemplate = getHtmlTemplate( props.template, {
            ...values,
            date: getFormatDate()
        });

        props.onSubmit( htmlTemplate );
    };

    const handleReset = ( resetForm: Function ) => {
        resetForm({ ...initialValues });

        props.onReset();
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmission
    });

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        isValid,
        isValidating,
        dirty,
        setValues,
        setFieldValue
    } = formik;

    useEffect(() => {
        const { privateName } = props.userSettings as UserSettings;
        setFieldValue( 'privateName', privateName );

    }, [ props.userSettings, setFieldValue ]);

    const prevTemplate = usePrevious( props.template );
    useEffect(() => {
        // re-setting if user passed from PM_WINNER to any other template
        if ( prevTemplate === PM_WINNER ) {
            setFieldValue( 'challengeLink', '' );
            setFieldValue( 'challengeName', '' );
        }

        // if forumName was selected before, apply auto setting.
        if ( props.template === PM_WINNER ) {
            handleAutoCompleteChange( savedAutoSelected );
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ props.template, setFieldValue ]);
    
    const handleAutoCompleteChange = ( value: any ) => {
        if ( !value ) {
            return;
        }
        setSavedAutoSelected({ ...value });
        
        let { challengeLink, id, ...selectedValue } = value;

        if ( props.template === PM_WINNER ) {
            selectedValue = {
                ...value,
                challengeName: 'משקיען / אשכול השבוע'
            };
        }
        
        setValues(( values: any ) => ({
            ...values,
            ...selectedValue
        }));
    };

    return (
        <form
            onSubmit = { handleSubmit }
            style    = {{
                padding: 10,
                backgroundColor: palette.type === 'light' ? palette.grey[200] : palette.grey[500]
            }}>
            {(inputs[ props.template ]).map( ({ name, label, type, options, radios }) =>
                <Input 
                    type                 = { type }
                    key                  = { name }
                    name                 = { name }
                    label                = { label }
                    onChange             = { handleChange }
                    onBlur               = { handleBlur }
                    onAutoCompleteChange = { handleAutoCompleteChange }
                    hint                 = { touched[name] && errors[name] ? errors[name] : '' }
                    error                = { touched[name] && errors[name] ? true : false }
                    value                = { values[name] }
                    autoCompleteOptions  = { props.autoCompleteOptions }
                    selectOptions        = { options }
                    radioOptions         = { radios } />
            )}
            <div>
                <Button
                    type     = "submit"
                    variant  = "contained"
                    color    = "primary"
                    disabled = { !isValid || isValidating || !dirty }
                    style    = {{
                        width: '100%',
                        marginTop: 10
                    }}>
                    בצע
                </Button>
                <Button
                    type    = "button"
                    onClick = { () => handleReset( resetForm ) }
                    style   = {{
                        width: '100%',
                        marginTop: 10
                    }}>
                    אפס הכל
                </Button>
            </div>
        </form>
    );
}
