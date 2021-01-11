import React, { useMemo } from 'react';
import { Formik } from 'formik';
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
    const initialValues = useMemo( () => {
        const obj = {};

        Object.keys( inputs ).forEach( key => {
            (inputs[ key ] as []).forEach( (inp: any) => {
                // @ts-ignore
                obj[ inp.name ] = '';
            });
        });
        
        return obj;
    }, []);
    
    const handleValidation = ( values: any ) => {
        const errors: any = {};
        // if (!values.forumName) {
        //   errors.forumName = 'Forum Required';
        // }

        return errors;
    };

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
            initialValues = { initialValues }
            validate      = { handleValidation }
            onSubmit      = { handleSubmission } >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                resetForm,
                isSubmitting
            }) => (
            <form
                onSubmit = { handleSubmit }
                style    = {{
                    padding: 10,
                    backgroundColor: '#f8f9fa'
                }}>
                {
                    (inputs[ props.template ] as [])?.map( ({ name: templateName, label }) => (
                        <TextField
                            type     = "text"
                            key      = { templateName }
                            name     = { templateName }
                            label    = { label }
                            onChange = { handleChange }
                            onBlur   = { handleBlur }
                            value    = { values[templateName] }
                            style    = {{ width: '100%' }} />
                    ))
                }
                {/* Can be used */}
                {/* { errors.email && touched.email && errors.email } */}

                {props.template ?
                <div>
                    <Button
                        type     = "submit"
                        variant  = "contained"
                        color    = "primary"
                        disabled = { isSubmitting }
                        style    = {{
                            width: '100%',
                            marginTop: 10
                        }}>
                        בצע
                    </Button>
                    <Button
                        type     = "button"
                        onClick  = { () => handleReset( resetForm ) }
                        style    = {{
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
