// import axios from 'axios';

import {
    DECLARATION_WEEKLY_CHALLENGES,
    PM_WINNER,
    PM_NICK,
    PM_SUBNICK_TEXT,
    PM_SUBNICK_IMG,
    PM_CHAMP,
    PM_FXP_POINTS
} from './Data'

export function getHtmlTemplate( template: string, values: any ) {
    let template2Return = '';

    switch ( template ) {
        case DECLARATION_WEEKLY_CHALLENGES:
            template2Return = htmlTemplates[ DECLARATION_WEEKLY_CHALLENGES ]( values );
            break;
        case PM_WINNER:
            
            break;
        case PM_NICK:
            
            break;
        case PM_SUBNICK_TEXT:
            
            break;
        case PM_SUBNICK_IMG:
            
            break;
        case PM_CHAMP:
            
            break;
        case PM_FXP_POINTS:
            
            break;
    
        default:
            template2Return = 'no template!';
            break;
    }

    return template2Return;
};

/** Variables must be identical to the 'name' prop of inputs from ./Data.tsx */
const htmlTemplates = {
    [ DECLARATION_WEEKLY_CHALLENGES ]: ({ date, investorName, postWinner, postLink, postName }: any) =>
    `
        [CENTER][IMG]https://images.weserv.nl/?url=i.imgur.com/DPZXQRv.png[/IMG]
        [FONT=tahoma]
        [IMG]https://images.weserv.nl/?url=i.imgur.com/s1ZEiwI.png[/IMG]
        [COLOR=#008080][SIZE=4][B]משקיען ואשכול השבוע - בניית אתרים כללי[/B][/SIZE][/COLOR]

        [B]גולשים יקרים!
        כמדי שבוע, יבחר המשתמש אשר השקיע ובלט מבין שאר הגולשים ואשכול מושקע ו/או שעניין את הגולשים.[/B]
        [U][B]אז, קבלו את משקיען ואשכול השבוע לתאריך [COLOR=#008080]${ date }[/COLOR] בפורום בניית אתרים כללי:

        [IMG]https://images.weserv.nl/?url=i.imgur.com/49v3iQt.png[/IMG]
        ${ investorName ? `[SUB][IMG]https://images.weserv.nl/?url=i.imgur.com/ThPiUoI.png[/IMG][/SUB][/B][/U][SIZE=5][B][URL="https://www.fxp.co.il/member.php?username=${ investorName }"][COLOR=#daa520][SUP][U]${ investorName }[/U][/SUP][/COLOR][/URL][/B][/SIZE][SUB][U][B][IMG]https://images.weserv.nl/?url=i.imgur.com/ThPiUoI.png[/IMG]` : '' }
        [/B][/U][/SUB][IMG]https://images.weserv.nl/?url=i.imgur.com/Rb4j5af.png[/IMG]
        ${ postWinner ? `[U][B][IMG]https://images.weserv.nl/?url=i.imgur.com/ThPiUoI.png[/IMG][/B][/U][SIZE=5][B][URL="https://www.fxp.co.il/member.php?username=${ postWinner }"][COLOR=#daa520][SUP][U]${ postWinner }[/U][/SUP][/COLOR][/URL][/B][/SIZE][U][B][SUB][IMG]https://images.weserv.nl/?url=i.imgur.com/ThPiUoI.png[/IMG][/SUB][/B][/U]
        [/FONT]
        [FONT=tahoma][SUB][SIZE=2][COLOR=#daa520][U][B]אשר פתח את האשכול:[/B][/U] [/COLOR][/SIZE][/SUB][/FONT][B][SIZE=3][COLOR=#daa520]"[URL="${ postLink }"]${ postName }[/URL]"[/COLOR][/SIZE][/B][FONT=tahoma][COLOR=#333333]
        ---------[/COLOR]` : '' }

        ${ investorName ? `[SIZE=2][B][URL="https://www.fxp.co.il/member.php?username=${investorName}"][COLOR=#008080]${investorName}[/COLOR][/URL][/B][/SIZE]` : '' } ${ investorName && postWinner ? 'ו-' : '' }[B]${postWinner ? `[SIZE=2][URL="https://www.fxp.co.il/member.php?username=${postWinner}"][COLOR=#008080]${postWinner}[/COLOR][/URL][/SIZE]` : ''}, ${investorName && postWinner ? 'זוכים' : 'זוכה'} בלא פחות מ- 7 ימי ווינר ${investorName && postWinner ? 'כל אחד' : ''}.[/B][/FONT]
        [FONT=tahoma][SUB][SIZE=2][COLOR=#008080][SIZE=3][B]מזל טוב ובהצלחה בשבוע הבא לכולם!
        [/B][/SIZE][/COLOR]
        [/SIZE][/SUB][COLOR=#333333]---------

        [/COLOR][B]בברכה,
        הנהלת פורום בניית אתרים כללי.
        :flowers:
        [/B][/FONT][IMG]https://images.weserv.nl/?url=i.imgur.com/DPZXQRv.png[/IMG]
        [/CENTER]
    `,
    [ PM_WINNER ]: () => ``,
    [ PM_NICK ]: () => ``,
    [ PM_SUBNICK_TEXT ]: () => ``,
    [ PM_SUBNICK_IMG ]: () => ``,
    [ PM_CHAMP ]: () => ``,
    [ PM_FXP_POINTS ]: () => ``
}
