import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';

interface ImgPreviewProps {
    imageURL: string;
}

export default function ImgPreview( props: ImgPreviewProps ) {
    const [isLoading, setIsLoading] = useState( true );

    useEffect(() => {
        setIsLoading( true );
    }, [ props.imageURL ])

    return (
        <div style = {{
            display: 'flex',
            margin: 10,
            height: 100
        }}>
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
