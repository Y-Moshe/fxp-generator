import React from 'react';

export default function Footer() {
    const date = new Date().toLocaleDateString();

    return (
        <footer>
           <h5>
               <span>נוצר על ידי</span>
               <span>
                    Copyright <sup _ngcontent-gdc-c3="">©</sup> 10/1/2021 - { date }
                    <a
                        style={{ margin: 5 }}
                        href="https://www.fxp.co.il/member.php?u=924810"
                        target="_blank"
                        rel="noreferrer">Y_Moshe</a> 
               </span>
            </h5>
        </footer>
    );
}
