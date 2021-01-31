import React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core';
import { Formik } from 'formik';
import * as yup from 'yup';

import Input from '../../components/UI/Input/Input';
import inputs, { DECLARATION_WEEKLY_CHALLENGES } from '../../Data';
import { addForum } from '../../API';

const formInputs = [
  { ...inputs[ DECLARATION_WEEKLY_CHALLENGES ][0] },
  { ...inputs[ DECLARATION_WEEKLY_CHALLENGES ][1] }
];

export default function AddForumDialog() {
  const [open, setOpen] = React.useState( false );

  const handleClickOpen = () => setOpen( true );

  const handleClose = () => setOpen( false );

  const handleSubmission = ( values: any ) => {
    addForum( values )
      .then(() => {})
      .catch(err => console.log( err ))
  };

  return (
    <div style = {{ display: 'flex' }}>
      <Button
        color   = "primary"
        variant = "contained"
        style   = {{ margin: '5px auto' }}
        onClick = { handleClickOpen }>הוסף פורום למאגר</Button>
      <Dialog
        open    = { open }
        onClose = { handleClose } >
        <DialogTitle id="form-dialog-title">הוספת פורום למאגר</DialogTitle>
        
        <DialogContent>
          <DialogContentText>
            נא מלא את הפרטים הנדרשים על מנת להוסיף פורום חדש למאגר!
          </DialogContentText>
          <Formik
                onSubmit         = { handleSubmission }
                validationSchema = { yup.object().shape({
                  forumName: formInputs[0].validationSchema,
                  fourmImg: formInputs[1].validationSchema
                })}
                initialValues    = {{
                  forumName: '',
                  fourmImg: ''
                }} >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                    isValid,
                    isValidating,
                    dirty,
                    setValues
                }) => (
                <form
                    onSubmit = { handleSubmit }
                    style    = {{
                        padding: 10,
                        backgroundColor: '#f8f9fa'
                    }}>
                    {
                        (formInputs as [])?.map( ({ name, label, options }) =>
                            <Input 
                                type                = "text"
                                key                 = { name }
                                name                = { name }
                                label               = { label }
                                onChange            = { handleChange }
                                onBlur              = { handleBlur }
                                hint                = { touched[name] && errors[name] ? errors[name] : '' }
                                error               = { errors[name] ? true : false }
                                value               = { values[name] }
                                selectOptions       = { options }
                                setValues           = { setValues } />
                        )
                    }
                    <DialogActions>
                        <Button
                            type     = "submit"
                            variant  = "contained"
                            color    = "primary"
                            disabled = { !isValid || isValidating || !dirty }
                            style    = {{
                                width: '100%',
                                marginTop: 10
                            }}>
                            הוסף
                        </Button>
                        <Button
                            type    = "button"
                            onClick = { handleReset }
                            style   = {{
                                width: '100%',
                                marginTop: 10
                            }}>
                            אפס הכל
                        </Button>
                        <Button
                            type    = "button"
                            onClick = { handleClose }
                            style   = {{
                                width: '100%',
                                marginTop: 10
                            }}>
                            בטל
                        </Button>
                    </DialogActions>
                </form>
                )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
