import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

interface MessageProps {
    isOpen: boolean | undefined;
    message: string;
    status: 'error' | 'info' | 'success' | 'warning';
    onClose: () => void;
}

export default function SnackAlert(props: MessageProps) {
    return (
        <Snackbar
            anchorOrigin = {{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open             = { props.isOpen }
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
