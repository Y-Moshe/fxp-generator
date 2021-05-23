import { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    makeStyles,
    CircularProgress
} from '@material-ui/core';
import { Formik } from 'formik';
import * as yup from 'yup';

import Input from '../../components/UI/Input/Input';
import { inputs as inputsConf, DECLARATION_WEEKLY_CHALLENGES } from '../../Data';
import { addForum, updateForum, deleteForum } from '../../API';
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
  { ...inputsConf[ DECLARATION_WEEKLY_CHALLENGES ][0] },
  { ...inputsConf[ DECLARATION_WEEKLY_CHALLENGES ][1] }
];

interface ManipulateForumDialogProps {
  onForumManipulated: (operation: string, forum: any) => void;
  forums: any[];
}

export default function ManipulateForumDialog(props: ManipulateForumDialogProps) {
  const [operation, setOperation] = useState( '' );
  const [isLoading, setIsLoading] = useState( false );
  const [open, setOpen] = useState( false );
  const [alert, setAlert] = useState<any>(null);

  // operation options, 'POST', 'PATCH', 'DELETE'
  const options = [
    { label: 'הוסף', value: 'POST' },
    { label: 'עדכן', value: 'PATCH' },
    { label: 'מחק',  value: 'DELETE' }
  ];

  /**
   * Get the relevant title based on `operation` selected, default: empty( '' )
   * @returns The title.
   */
  const getTitle = () => (options.find(opt => opt.value === operation)?.label || 'בחר אופצייה');

  const classes = useStyles();

  const openDialog = () => setOpen( true );

  const closeDialog = () => setOpen( false );

  /**
   * Checking if a forum with the same name exists
   * @param values forumName
   * @returns Boolean
   */
  const isExists = ( forumName: any ) => {
    return !props.forums.every((forum: any) => (forum.forumName !== forumName));
  }

  const handleSubmission = ( values: any ) => {
    const { forumName } = values;
    let request: any;
    let keyword = '';

    switch (operation) {
      case 'POST':
        if (isExists( forumName )) {
          setAlert({
            message: `הפורום ${ forumName } כבר קיים!`,
            status: 'warning'
          });
          return;
        }
        request = addForum( values );
        keyword = 'נוסף';
        break;
      case 'PATCH':
        request = updateForum( values.id, values );
        keyword = 'עודכן';
        break;
      case 'DELETE':
          const answer = window.confirm(`האם אתה בטוח שברצונך למחוק את הפורום ${forumName}?`);
          if (!answer) {
            return;
          }

          if (props.forums.find(f => f.id === values.id) === undefined) {
            setAlert({
              message: `הפורום ${ forumName } כבר לא קיים!`,
              status: 'warning'
            });
            return;
          }

          request = deleteForum( values.id );
          keyword = 'נמחק';
        break;
    }

    setIsLoading( true );

    request
      .then(() => {
        props.onForumManipulated( operation, values );
        setAlert({
          message: `הפורום ${forumName} ${keyword} בהצלחה!`,
          status: 'success'
        });
      })
      .catch((err: any) => {
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
        onClick = { openDialog }>הוסף, עדכן, או מחק פורום</Button>
      <Dialog
        open    = { open }
        onClose = { closeDialog } >
        <DialogTitle id="form-dialog-title">{ getTitle() }</DialogTitle>

        <div style = {{ width: '70%', margin: '5px auto' }}>
          <Input
            type                = "select"
            name                = "operation"
            label               = "בחר אופצייה"
            onChange            = { (e: any) => setOperation(e.target.value) }
            value               = { operation }
            selectOptions       = { options } />
        </div>
        
        <DialogContent>
          <div>
              <h4>אופן השימוש: ראשית יש לבחור אופצייה ועקבו:</h4>

              <ul>
                <li>הוספה: אין צורך בלחיצה, פשוט מלאו את הפרטים</li>
                <li>עדכון: יש לבחור את הפורום ע"י לחיצה בתפריט - חובה, ולאחר מכן לשנות נתונים</li>
                <li>למחיקה: בחר את הפורום ע"י לחיצה בתפריט - חובה</li>
              </ul>
          </div>

          <Formik
                onSubmit         = { handleSubmission }
                validationSchema = { yup.object().shape({
                  forumName: formInputs[0].validationSchema,
                  forumImg: formInputs[1].validationSchema
                }) }
                initialValues    = {{
                  forumName: '',
                  forumImg: ''
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
                    <div style = {{ margin: 25 }}>
                      {
                          operation && (formInputs as [])?.map( ({ name, label, type, options }) =>
                              <Input 
                                  disabled              = { operation === 'DELETE' && name === 'forumImg' }
                                  type                = { type }
                                  key                 = { name }
                                  name                = { name }
                                  label               = { label }
                                  onChange            = { handleChange }
                                  onBlur              = { handleBlur }
                                  hint                = { touched[name] && errors[name] ? errors[name] : '' }
                                  error               = { errors[name] ? true : false }
                                  value               = { values[name] }
                                  autoCompleteOptions = { props.forums }
                                  selectOptions       = { options }
                                  setValues           = { setValues } />
                          )
                      }
                    </div>
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
                          בצע
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
                          onClick  = { closeDialog }
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
      {alert ?
        <SnackAlert
          isOpen  = { alert !== null }
          message = { alert.message }
          status  = { alert.status }
          onClose = { () => setAlert( null ) } /> : null}
    </div>
  );
}
