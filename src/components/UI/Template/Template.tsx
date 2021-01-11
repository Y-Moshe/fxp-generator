import React, { useMemo } from 'react';
import { Formik } from 'formik';
import {
    Button,
    TextField
} from '@material-ui/core'

import inputs from './inputs';

interface TemplateProps {
    template: string;
    onSubmit: (htmlCode: string) => string;
}

export default function Template(props: TemplateProps) {
    const initialValues = useMemo(() => {
        const obj = {};

        Object.keys(inputs).forEach(key => {
            (inputs[key] as []).forEach((inp: any) => {
                // @ts-ignore
                obj[inp.name] = '';
            });
        });
        
        return obj;
    }, []);
    
    const handleValidation = (values: any) => {
        const errors: any = {};
        if (!values.forumName) {
          errors.forumName = 'Forum Required';
        }

        return errors;
    };

    const handleSubmission = (values: any) => {
        console.log(values);
    };

    return (
        <Formik
            initialValues={initialValues}
            validate={handleValidation}
            onSubmit={handleSubmission} >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
            }) => (
            <form onSubmit={handleSubmit} style={{ padding: 10, backgroundColor: '#f8f9fa' }}>
                {
                    (inputs[props.template] as [])?.map(({ name, label }) => (
                        <TextField
                            type="text"
                            helperText="Incorrect entry."
                            key={name}
                            name={name}
                            label={label}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values[name]}
                            style={{ width: '100%' }} />
                    ))
                }
                {/* {errors.email && touched.email && errors.email} */}

                {props.template ?
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ width: '100%', marginTop: 10 }}
                        disabled={isSubmitting}>
                        בצע
                    </Button> : null}
            </form>
            )}
      </Formik>
    )
}
