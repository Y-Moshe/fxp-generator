import React from 'react';

export default function Header() {
    return (
        <header>
            <h1 style = {{ textAlign: 'center' }}>FxP Generator - כלי לייצור קוד להכרזות והודעות פרטיות -
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
