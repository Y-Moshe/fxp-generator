import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

export interface SnackAlertProps {
    message: string;
    status: 'error' | 'info' | 'success' | 'warning';
    onClose?: () => void;
}

export default function SnackAlert(props: SnackAlertProps) {
    return (
        <Snackbar
            anchorOrigin = {{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open             = { props.message ? true : false }
            onClose          = { props.onClose }
            autoHideDuration = { 3000 } >
            <Alert
                onClose  = { props.onClose }
                severity = { props.status }>
                { props.message }
            </Alert>
        </Snackbar>
    )
}
