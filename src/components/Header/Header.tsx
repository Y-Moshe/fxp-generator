import React from 'react';

import githubIcon from './github.svg'

export default function Header() {
    return (
        <header>
            <h1 style = {{ textAlign: 'center' }}>FxP Generator - כלי לייצור קוד להכרזות והודעות פרטיות -
                <a
                    style  = {{ margin: 5 }}
                    href   = "https://github.com/Y-Moshe/fxp-generator"
                    target = "_blank"
                    rel    = "noreferrer">
                    <img src = {githubIcon} alt = "Github"/>
                </a>
            </h1>
        </header>
    );
}
