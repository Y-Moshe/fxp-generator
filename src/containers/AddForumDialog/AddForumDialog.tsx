import React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    makeStyles,
    CircularProgress
} from '@material-ui/core';
import { Formik } from 'formik';
import * as yup from 'yup';

import Input from '../../components/UI/Input/Input';
import inputs, { DECLARATION_WEEKLY_CHALLENGES } from '../../Data';
import { addForum } from '../../API';
import SnackAlert from '../../components/UI/SnackAlert/SnackAlert';

const useStyles = makeStyles((theme) => ({
  spinner: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    '& > * + *': {
      margin: theme.spacing(2),
    },
  },
}));

const formInputs = [
  { ...inputs[ DECLARATION_WEEKLY_CHALLENGES ][0] },
  { ...inputs[ DECLARATION_WEEKLY_CHALLENGES ][1] }
];

interface AddForumDialogProps {
  onNewForumAdded: (forum: any) => void;
  forums: any[];
}

export default function AddForumDialog(props: AddForumDialogProps) {
  const [isLoading, setIsLoading] = React.useState( false );
  const [open, setOpen] = React.useState( false );
  const [alert, setAlert] = React.useState<any>(null);

  const classes = useStyles();

  const handleClickOpen = () => setOpen( true );

  const handleClose = () => setOpen( false );

  /**
   * Checking if a forum with the same name is exists
   * @param values { forumName, forumImg }
   */
  const checkExistence = ( values: any ) => {
    return !props.forums.every((forum: any) => (forum.forumName !== values.forumName));
  }

  const handleSubmission = ( values: any ) => {
    if (checkExistence( values ) === true) {
      setAlert({
        message: `הפורום ${ values.forumName } כבר קיים!`,
        status: 'warning'
      });
      return;
    }

    setIsLoading( true );

    addForum( values )
      .then(() => {
        props.onNewForumAdded( values );
        setAlert({
          message: `הפורום ${ values.forumName } נוסף בהצלחה!`,
          status: 'success'
        });
      })
      .catch(err => {
        setAlert({
          message: 'אירעה שגיאה, ראה console.log',
          status: 'error'
        });
        console.log(err);
      }).finally(() => setIsLoading( false ));
  };

  return (
    <div style = {{ display: 'flex' }}>
      <Button
        color   = "primary"
        variant = "contained"
        style   = {{ margin: '5px auto' }}
        onClick = { handleClickOpen }>הוסף פורום למאגר</Button>
      {alert ?
        <SnackAlert
          isOpen  = { alert !== null }
          message = { alert.message }
          status  = { alert.status }
          onClose = { () => setAlert( null ) } /> : null}
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
                          disabled = { !isValid || isValidating || !dirty || isLoading }
                          style    = {{
                              width: '100%',
                              marginTop: 10
                          }}>
                          הוסף
                      </Button>
                      {
                        isLoading ?
                        <div
                            hidden    = { isLoading }
                            className = { classes.spinner }>
                          <CircularProgress />
                        </div> :
                        <Button
                            type    = "button"
                            onClick = { handleReset }
                            style   = {{
                                width: '100%',
                                marginTop: 10
                            }}>
                            אפס הכל
                        </Button>
                      }
                      <Button
                          type     = "button"
                          disabled = { isLoading }
                          onClick  = { handleClose }
                          style    = {{
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
