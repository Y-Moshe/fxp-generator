import React, { useMemo } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
    Button,
    TextField
} from '@material-ui/core';

import inputs from '../../../Data';
import { getHtmlTemplate } from '../../../API';

interface TemplateProps {
    template: string;
    onSubmit: ( htmlCode: string ) => void;
    onReset: () => void;
}

export default function Template( props: TemplateProps ) {
    const { initialValues, validationSchema } = useMemo( () => {
        const initObj = {};
        const schemaObj = {};
        
        (inputs[ props.template ] as []).forEach( (inp: any, i) => {
            // @ts-ignore
            initObj[ inp.name ] = '';
            // @ts-ignore
            schemaObj[ inp.name ] = inputs[ props.template ][ i ].validationSchema;
        });

        const vSchema = yup.object().shape({
            ...schemaObj
        });

        return { initialValues: initObj, validationSchema: vSchema };
    }, [ props.template ]);

    const handleSubmission = ( values: any ) => {
        const htmlTemplate = getHtmlTemplate( props.template, {
            ...values,
            date: new Date().toLocaleDateString()
        });

        props.onSubmit( htmlTemplate );
    };

    const handleReset = ( resetForm: Function ) => {
        resetForm({ ...initialValues });

        props.onReset();
    };

    return (
        <Formik
            initialValues    = { initialValues }
            validationSchema = { validationSchema }
            onSubmit         = { handleSubmission } >
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
                dirty
            }) => (
            <form
                onSubmit = { handleSubmit }
                style    = {{
                    padding: 10,
                    backgroundColor: '#f8f9fa'
                }}>
                {
                    (inputs[ props.template ] as [])?.map( ({ name, label, type }) => (
                        <TextField
                            type       = { type }
                            key        = { name }
                            name       = { name }
                            label      = { label }
                            onChange   = { handleChange }
                            onBlur     = { handleBlur }
                            helperText = { touched[name] && errors[name] ? errors[name] : '' }
                            error      = { errors[name] }
                            value      = { values[name] }
                            style      = {{ width: '100%' }} />
                    ))
                }

                {props.template ?
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
                </div> : null}
            </form>
            )}
      </Formik>
    );
}
