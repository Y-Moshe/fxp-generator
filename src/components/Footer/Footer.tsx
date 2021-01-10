import React from 'react'

export default function Footer() {
    const date = new Date().toLocaleDateString('en-GB');

    return (
        <footer>
           <h5>
                Copyright <sup _ngcontent-gdc-c3="">©</sup> 10/1/2021 - {date}
               <a
                style={{ marginLeft: 5 }}
                href="https://www.fxp.co.il/member.php?u=924810"
                target="_blank"
                rel="noreferrer">Y_Moshe</a> נוצר על ידי
            </h5>
        </footer>
    )
}
