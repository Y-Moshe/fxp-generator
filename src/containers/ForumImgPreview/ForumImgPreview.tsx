import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';

interface ForumImgPreviewProps {
    imageURL: string;
}

export default function ForumImgPreview( props: ForumImgPreviewProps ) {
    const [isLoading, setIsLoading] = useState( true );

    useEffect(() => {
        setIsLoading( true );
    }, [ props.imageURL ])

    return (
        <div style = {{ display: 'flex', margin: 10 }}>
            <img
                hidden = { isLoading }
                onLoad = { () => setIsLoading( false ) }
                src    = { props.imageURL }
                alt    = "Preview"
                style  = {{
                    margin: 'auto',
                    boxShadow: '0 0 8px grey',
                    maxHeight: 100
                }} />
            { isLoading && <CircularProgress style = {{ margin: 'auto' }} /> }
        </div>
    )
}
