import { useMemo } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button } from '@material-ui/core';

import inputs from '../../Data';
import { getHtmlTemplate, getFormatDate } from '../../API';
import Input from '../../components/UI/Input/Input';
import { UserSettings } from '../Header/Header';

interface TemplateProps {
    userSettings: UserSettings | {};
    template: string;
    autoCompleteOptions: any[];
    onSubmit: ( htmlCode: string ) => void;
    onReset: () => void;
}

export default function Template( props: TemplateProps ) {
    /**
     * Basically, what we doing here is creating an initial state and validation schema for Formik
     * By looping throws our 'inputs' we defined on Data.tsx !
     * The state and the validation schema, will be re-created, or re-computed only when
     * a different "props.template" was select, and only when the state is really different.
     * "The magic of useMemo" :)
     */
    const { initialValues, validationSchema } = useMemo( () => {
        const initObj = {};
        const schemaObj = {};

        (inputs[ props.template ] as []).forEach( (inp: any, i) => {
            // @ts-ignore
            initObj[ inp.name ] = '';
            
            // Applying default value.
            if (inp.name === 'currentRank') {
                // @ts-ignore
                initObj[ inp.name ] = 'unRanked';
            }
            
            if ( inp.name === 'privateName' ) {
                // @ts-ignore
                initObj[ inp.name ] = props.userSettings?.privateName;
            }
            // @ts-ignore
            schemaObj[ inp.name ] = inputs[ props.template ][ i ].validationSchema;
        });

        const vSchema = yup.object().shape({
            ...schemaObj
        });

        return { initialValues: initObj, validationSchema: vSchema };
    }, [ props.template, props.userSettings ]);

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

    return (
        <Formik
            validationSchema = { validationSchema }
            onSubmit         = { handleSubmission }
            initialValues    = {{ ...initialValues }} >
            {({
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
                setValues
            }) => (
            <form
                onSubmit = { handleSubmit }
                style    = {{
                    padding: 10,
                    backgroundColor: 'var(--bg-light)'
                }}>
                {
                    (inputs[ props.template ] as [])?.map( ({ name, label, type, options, radios }) =>
                        <Input 
                            type                = { type }
                            key                 = { name }
                            name                = { name }
                            label               = { label }
                            onChange            = { handleChange }
                            onBlur              = { handleBlur }
                            hint                = { touched[name] && errors[name] ? errors[name] : '' }
                            error               = { errors[name] ? true : false }
                            value               = { values[name] }
                            autoCompleteOptions = { props.autoCompleteOptions }
                            selectOptions       = { options }
                            radioOptions        = { radios }
                            setValues           = { setValues } />
                    )
                }
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
            )}
      </Formik>
    );
}
