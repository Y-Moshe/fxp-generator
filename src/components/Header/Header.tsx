import React from 'react';

interface HeaderProps {
    onGClick: () => void;
}

export default function Header(props: HeaderProps) {
    return (
        <header>
            <h1 style = {{ textAlign: 'center' }}>FxP <span onClick = { props.onGClick }>G</span>enerator - כלי לייצור קוד להכרזות והודעות פרטיות -
                <a
                    style  = {{ margin: 5 }}
                    href   = "https://github.com/Y-Moshe/fxp-generator"
                    target = "_blank"
                    rel    = "noreferrer">
                    <img src = "https://i.imagesup.co/images2/fabe53eb72f9b6d3d47cd95aff31ffc45c2fdbf8.png" alt = "Github"/>
                </a>
            </h1>
        </header>
    );
}
