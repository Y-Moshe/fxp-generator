import React from 'react';

import { contributors } from '../../Data';

export default function Footer() {
    const date = new Date().toLocaleDateString();

    const contributors2Render = contributors.map( name => (
        <a
            key    = { name }
            style  = {{ margin: 5 }}
            href   = { `https://www.fxp.co.il/member.php?username=${ name }` }
            target = "_blank"
            rel    = "noreferrer">{ name },</a>
    ));

    return (
        <footer>
           <h5>
               <span>נוצר על ידי</span>
               <span>
                    Copyright <sup>©</sup> 10/1/2021 - { date }
                    {contributors2Render}
               </span>
            </h5>
        </footer>
    );
}
