import {
    DECLARATION_WEEKLY_CHALLENGES,
    DECLARATION_WEEKLY_RESPONSE,
    PM_WINNER,
    PM_NICK,
    PM_SUBNICK_TEXT,
    PM_SUBNICK_IMG,
    PM_CHAMP,
    PM_FXP_POINTS,
    GENERAL_WARNING,
    SPAM_WARNING,
    IMPROPER_LANGUAGE_USE_WARNING
} from './Data';

import { forums } from './forums-data.json';

export interface ForumData {
    forumImg: string;
    forumName: string;
    challengeLink: string;
}

/**
 * Retrieve all forums available data from `forums-data.json`.
 * @returns ForumData[]
 */
export const getForumsList = () => {
    const results: ForumData[] = Object.keys( forums )
        // @ts-ignore
        .map( key => ({ ...forums[key], id: key }));
    
    return results;
}

/**
 * Will Generate as follows: dd.mm.yy, example: 05.02.20.
 * @returns date as string
 */
export const getFormatDate = () =>
    new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    }).replaceAll('/', '.');

/**
 * Get a generate template as a string using it's own template `data(values arg)`.
 * @param template which template, use the templates constants from `Data.tsx`
 * @param values templateData, should be the submitted values!
 * @returns the generated template with the relevant data
 */
export const getHtmlTemplate = ( template: string, values: any ) => {
    const templateData: any = {};

    // if values.prop is of type "string" use the .trim() function to remove any white spaces
    Object.keys( values ).forEach( key => {
        if (typeof values[ key ] === 'string') {
            templateData[ key ] = (values[ key ] as string).trim();
        } else {
            templateData[ key ] = values[ key ];
        }
    });

    // @ts-ignore
    return (htmlTemplates[ template ]( templateData ) as string);
}

const getRankNote = (currentRank: string) => {
    let text2Return = '';

    switch (currentRank) {
        case 'winner':
            text2Return = ' כיוון שאת/ה נוכח/ת כעת בדרגת ה־Winner, לא תקבל/י עכשיו את ימי הווינר, אך את/ה זכאי/ת להם, ותוכל/י לממשם באמצעות פתיחת אשכול ב[URL="https://www.fxp.co.il/forumdisplay.php?f=4723"]תת פורום פרסים[/URL] :)';
            break;
        case 'admin':
            text2Return = 'משום שאת/ה מנהל/ת, לא תקבל/י עכשיו את ימי הווינר, אך את/ה זכאי/ת להם, ותוכל/י לממשם באמצעות פתיחת אשכול ב[URL="https://www.fxp.co.il/forumdisplay.php?f=4723"]תת פורום פרסים[/URL] :)';
            break;
        case 'teammate':
            text2Return = 'כיוון שאת/ה חבר/ת צוות, לא תקבל/י עכשיו את ימי הווינר, אך את/ה זכאי/ת להם, ותוכל/י לממשם כיוון שאת/ה חבר/ת צוות, יש לך גישה להיכל התהילה, לכן לא תקבל/י עכשיו את ימי הווינר, אך את/ה זכאי/ת להם :)';
            break;
        //    unRanked
        default:
            text2Return = '';
            break;
    }

    return text2Return;
}

/** each `templateData` must be identical to it's own 'name' inputs prop declared at `Data.tsx` */
const htmlTemplates = {
    [ DECLARATION_WEEKLY_CHALLENGES ]: ({ date, forumName, forumImg, winnerName, postWinner, style, postLink, postName }: any) =>
    `
        [CENTER][SIZE=3][FONT=tahoma]
        [IMG]https://images.weserv.nl/?url=i.imgur.com/DPZXQRv.png[/IMG]
        [IMG]${ encodeURI( forumImg ) }[/IMG]
        [SIZE=4][B][COLOR=#008080]משקיען ואשכול השבוע - ${ forumName }[/COLOR]
        [/B][/SIZE]
        גולשים יקרים!
        כמדי שבוע, יבחר המשתמש אשר השקיע ובלט מבין שאר הגולשים ואשכול מושקע ו/או שעניין את הגולשים.
        [U]אז, קבלו את משקיען ואשכול השבוע לתאריך [B][COLOR=#008080]${ date }[/COLOR][/B] בפורום ${ forumName }:[/U]

        [IMG]${ style.winner }[/IMG]
        ${ winnerName ? `[IMG]https://images.weserv.nl/?url=i.imgur.com/ThPiUoI.png[/IMG][U][B][SIZE=5][URL="https://www.fxp.co.il/member.php?username=${ encodeURI( winnerName ) }"][COLOR=#daa520]${ winnerName }[/COLOR][/URL][/SIZE][/B][/U][IMG]https://images.weserv.nl/?url=i.imgur.com/ThPiUoI.png[/IMG]`
            : '[COLOR=#daa520][B][SIZE=3]לא נמצא משקיען[/SIZE][/B][/COLOR]' }

        [IMG]${ style.poster }[/IMG]
        ${ postWinner ?
        `
            [IMG]https://images.weserv.nl/?url=i.imgur.com/ThPiUoI.png[/IMG][U][B][URL="https://www.fxp.co.il/member.php?username=${ encodeURI( postWinner ) }"][COLOR=#daa520][SIZE=5]${ postWinner }[/SIZE][/COLOR][/URL][/B][/U][IMG]https://images.weserv.nl/?url=i.imgur.com/ThPiUoI.png[/IMG]

            [U][B][COLOR=#daa520]אשר פתח את האשכול[/COLOR][/B][/U]: [URL="${ encodeURI( postLink ) }"][SIZE=4]"[B]${ postName }[/B]"[/SIZE][/URL]
        ` : '[COLOR=#daa520][B][SIZE=3]לא נמצא אשכול[/SIZE][/B][/COLOR]'}
        ---------
        ${ winnerName || postWinner ?
        `
            ${ winnerName ? `[U][B][URL="https://www.fxp.co.il/member.php?username=${ encodeURI( winnerName ) }"][COLOR=#008080]${ winnerName }[/COLOR][/URL][/B][/U]` : '' }${ winnerName && postWinner ? ' ו-' : '' }${ postWinner ? `[U][B][URL="https://www.fxp.co.il/member.php?username=${ encodeURI( postWinner ) }"][COLOR=#008080]${ postWinner }[/COLOR][/URL][/B][/U]` : '' }, ${ winnerName && postWinner ? 'זוכים בלא פחות מ- 7 ימי ווינר כל אחד' : 'זוכה בלא פחות מ- 7 ימי ווינר' }.
            [B][COLOR=#008080]מזל טוב ובהצלחה בשבוע הבא לכולם![/COLOR][/B]
            ---------
        ` : '' }

        בברכה,
        הנהלת פורום ${ forumName }
        [IMG]https://static.fcdn.co.il/smilies2/flowers.gif[/IMG].
        [IMG]https://images.weserv.nl/?url=i.imgur.com/DPZXQRv.png[/IMG]
        [/FONT][/SIZE][/CENTER]
    `,
    [ DECLARATION_WEEKLY_RESPONSE ]: ({ date, forumName, forumImg, winnerName, storyName, storyLink }: any) =>
    `
        [CENTER][SIZE=3][FONT=tahoma]
        [IMG]https://images.weserv.nl/?url=i.imgur.com/DPZXQRv.png[/IMG]
        [IMG]${ encodeURI( forumImg ) }[/IMG]

        [SIZE=4][B][COLOR=#008080]תגובת השבוע בפורום - ${ forumName }[/COLOR][/B][/SIZE]

        גולשים יקרים!
        כמדי שבוע, יבחר תגובה אשר הושקעה ובלטה מבין שאר התגובות בפורום
        [U]אז, קבלו את תגובת השבוע לתאריך [B][COLOR=#008080]${ date }[/COLOR][/B] בפורום ${ forumName }:[/U]

        השבוע נבחרה תגובתו של [URL="https://www.fxp.co.il/member.php?username=${ encodeURI( winnerName ) }"][COLOR=#daa520][B]${winnerName}[/B][/COLOR][/URL] שהגיב בסיפורה של "[URL="${storyLink}"][B]${storyName}[/B][/URL]"

        [URL="https://www.fxp.co.il/member.php?username=${ encodeURI( winnerName ) }"][COLOR=#daa520][B]${winnerName}[/B][/COLOR][/URL] זוכה בלא פחות מ- 7 ימי ווינר
        [B][COLOR=#008080]מזל טוב ובהצלחה בשבוע הבא לכולם![/COLOR][/B]

        בברכה,
        הנהלת פורום ${ forumName }
        [IMG]https://static.fcdn.co.il/smilies2/flowers.gif[/IMG].
        [IMG]https://images.weserv.nl/?url=i.imgur.com/DPZXQRv.png[/IMG]
        [/FONT][/SIZE][/CENTER]
    `,
    [ PM_WINNER ]: ({ forumName, winnerName, privateName, challengeName, challengeLink, days, currentRank }: any) =>
    `
        ברכותיי, ${ winnerName }!
        זכית באתגר [URL="${ encodeURI( challengeLink ) }"]"${ challengeName }"[/URL] ב${ forumName }, דבר המעניק לך [COLOR=#2bb1e2][B]${ days } ימי Winner[/B][/COLOR].
        
        [U][B]מהי דרגת ה־Winner?[/B][/U]
        דרגה זו ניתנת למשתמש אשר זכה באתגר אחד או יותר ברחבי האתר. דרגה זו ניתנת לזמן מוגבל (בהתאם לאתגר) ומקנה למשתמש הזוכה צבע שם משתמש בצבע תכלת וסמל של הדרגה ליד כינויו, תת ניק מעוצב של "FxP Winner" וגישה לפורום "[U][I][B][URL="https://www.fxp.co.il/forumdisplay.php?f=576"][COLOR=#43c6db]היכל התהילה[/COLOR][/URL][/B][/I][/U]".
        [B]ווינר/ית חדש/ה? אין לכם/ן שמץ מהו [U][I][URL="https://www.fxp.co.il/forumdisplay.php?f=576"][COLOR=#43C6DB]פורום היכל התהילה[/COLOR][/URL][/I][/U]? [I][URL="https://www.fxp.co.il/showthread.php?t=2758803&p=119477099#post119477099"][U]לחצו כאן[/U][/URL][/I] לקבלת הסבר מלא על פורום היכל התהילה![/B]
        
        ${ getRankNote( currentRank ) }

        את/ה מוזמנ/ת להיכנס לפורום [U][I][B][URL="https://www.fxp.co.il/forumdisplay.php?f=576"][COLOR=#43c6db]היכל התהילה[/COLOR][/URL][/B][/I][/U] ולהנות! :)
        
        בברכה, ${ privateName }.
        מנהל/ת ${ forumName }.    
    `,
    [ PM_NICK ]: ({ forumName, winnerName, privateName, challengeName, challengeLink }: any) =>
    `
        ברכותיי, ${ winnerName }!
        זכית באתגר [URL="${ encodeURI( challengeLink ) }"]"${ challengeName }"[/URL] ב${ forumName }, דבר המעניק לך [B][COLOR=#008000]שינוי ניק[/COLOR][/B].
        
        
        [U][B]מהו שינוי ניק?[/B][/U]
        משתמש אשר זכה באתגר אחד או יותר ברחבי האתר וקיבל שינוי ניק, רשאי לשנות את ניק המשתמש שלו (שם המשתמש) לכל ניק פנוי שירצה.
        כיצד בודקים האם הניק פנוי? כותבים אותו במקום ה־"X" שבקישור [U][I][B][URL="https://www.fxp.co.il/member.php?username=X"]הזה[/URL][/B][/I][/U], ובודקים אם קיים פרופיל כזה או לא; אם לא – הניק פנוי, אם כן – הניק תפוס.
        בכדי לממש את שינוי הניק, יש לפתוח אשכול ב[U][I][B][URL="https://www.fxp.co.il/forumdisplay.php?f=4723"]תת פורום פרסים[/URL][/B][/I][/U], על־פי [U][I][B][URL="https://www.fxp.co.il/showthread.php?t=10946798"]הטופס המתאים[/URL][/B][/I][/U].
        [B]שימ/י לב – ניתן לממש את שינוי הניק תוך מקסימום חודשיים לאחר הזכייה.[/B]
        
        
        בברכה, ${ privateName }.
        מנהל/ת ${ forumName }.       
    `,
    [ PM_SUBNICK_TEXT ]: ({ forumName, winnerName, privateName, challengeName, challengeLink, days }: any) =>
    `
        ברכותיי, ${ winnerName }!
        זכית באתגר "[URL="${ encodeURI( challengeLink ) }"]${ challengeName }"[/URL] ב${ forumName }, דבר המעניק לך [B][COLOR=#ff0000]שינוי תת־ניק טקסט ל־${ days } ימים[/COLOR][/B].
        
        
        [U][B]מהו שינוי תת־ניק?[/B][/U]
        תת־ניק זוהי השורה מתחת לשם המשתמש שלך (המציינת בדר"כ את דרגת המשתמש).
        כאשר משתמש זוכה בשינוי תת־ניק, הוא יכול לבקש לשנות את תת־הניק שלו לטקסט (אלא אם זכה בשינוי תת־ניק לתמונה) לבחירתו. את שינוי תת־הניק תוכלו לבקש בפורום [U][I][B][URL="https://www.fxp.co.il/forumdisplay.php?f=4723"]פרסים[/URL][/B][/I][/U].
        
        
        בברכה, ${ privateName }.
        מנהל/ת ${ forumName }.    
    `,
    [ PM_SUBNICK_IMG ]: ({ forumName, winnerName, privateName, challengeName, challengeLink, days }: any) =>
    `
        ברכותיי, ${ winnerName }!
        זכית באתגר [URL="${ encodeURI( challengeLink ) }"]"${ challengeName }"[/URL] ב${ forumName }, דבר המעניק לך [B][COLOR=#ff0000]שינוי תת־ניק תמונה ל־${ days } ימים[/COLOR][/B].
        
        [U][B]מהו שינוי תת־ניק?[/B][/U]
        תת־ניק זוהי השורה מתחת לשם המשתמש שלך (המציינת בדר"כ את דרגת המשתמש).
        כאשר משתמש זוכה בשינוי תת־ניק, הוא יכול לבקש לשנות את תת־הניק שלו לטקסט (אלא אם זכה בשינוי תת־ניק לתמונה) לבחירתו. את שינוי תת־הניק תוכלו לבקש בפורום [U][I][B][URL="https://www.fxp.co.il/forumdisplay.php?f=4723"]פרסים[/URL][/B][/I][/U].
        
        בברכה, ${ privateName }.
        מנהל/ת ${ forumName }.    
    `,
    [ PM_CHAMP ]: ({ forumName, winnerName, privateName, challengeName, challengeLink }: any) =>
    `
        ברכותיי, ${ winnerName }!
        זכית באתגר "[URL="${ encodeURI( challengeLink ) }"]${ challengeName }"[/URL] ב${ forumName }, דבר המעניק לך [B][COLOR=#daa520]נקודה לצ'אמפ[/COLOR][/B].
        
        
        [U][B]מהי נקודה לצ'אמפ?[/B][/U]
        משתמש אשר זכה באתגר אחד או יותר ברחבי האתר וקיבל נקודה לצ'אמפ, אינו זכאי לפרס או לדרגה כלשהם, אך אם הוא צובר 8 נקודות לצ'אמפ, הוא מקבל את דרגת ה־[B][COLOR=#daa520]Fxp Champ[/COLOR][/B] הנחשקת.
        במידה ואתם זכאים ל־8 נקודות צ'אמפ ומעלה (ניתן לברר את זכאותכם בפורום [U][I][B][URL="https://www.fxp.co.il/forumdisplay.php?f=4723"]פרסים[/URL][/B][/I][/U]), תוכלו לבקש להפעיל את הדרגה בפורום [U][I][B][URL="https://www.fxp.co.il/forumdisplay.php?f=4723"]פרסים[/URL][/B][/I][/U].
        פרטים נוספים על דרגת ה־[B][COLOR=#daa520]Fxp Champ[/COLOR][/B] תוכל/י למצוא [U][I][B][URL="https://www.fxp.co.il/showthread.php?t=860344"]כאן[/URL][/B][/I][/U].
        
        
        בברכה, ${ privateName }.
        מנהל/ת ${ forumName }.    
    `,
    [ PM_FXP_POINTS ]: ({ forumName, winnerName, privateName, challengeName, challengeLink, points }: any) =>
    `
        ברכותיי, ${ winnerName }!
        זכית באתגר [URL="${ encodeURI( challengeLink ) }"]"${ challengeName }"[/URL] ב${ forumName }, דבר המעניק לך [B][COLOR=yellowgreen]${ points } נקודות FxP[/COLOR][/B].
        
        [U][B]מהן נקודות FxP?[/B][/U]
        נקודות FxP הן נקודות אשר ניתן להשיג ברחבי האתר, באתגרים ופעילויות שונות.
        הדרך הראשית להשגת נקודות FxP היא דרך פורום [U][I][B][URL="https://www.fxp.co.il/forumdisplay.php?f=576"][COLOR=#43c6db]היכל התהילה[/COLOR][/URL][/B][/I][/U]. הנקודות מצטברות בזכאות של כל משתמש ואפשר לחסוך אותן.
        באמצעות נקודות FxP ניתן לרכוש פרסים שונים כדוגמת ימי Winner, שינויי ניק, תת־ניק ועוד. 
        השימוש בנקודות FxP נעשה דרך תת הפורום [B][I][U][URL="https://www.fxp.co.il/forumdisplay.php?f=4723"]פרסים[/URL][/U][/I][/B], בו ניתן לשאול כמה נקודות FxP ברשותכם ולרכוש פרסים שווים מ[U][I][B][URL="https://www.fxp.co.il/showthread.php?t=15814667"]חנות הפרסים[/URL][/B][/I][/U].
        
        
        בברכה, ${ privateName }.
        מנהל/ת ${ forumName }.    
    `,
    [ GENERAL_WARNING ]: ({ forumName, warning, reason }: any) =>
    `
        משתמש יקר,
        קיבלת אזהרה ${ warning === 'yellow' ? '[COLOR=#ffd700][B]צהובה[/B][/COLOR]' : '[B][COLOR=#ff0000]אדומה[/COLOR][/B]' } בעקבות [COLOR=#008000][B]${ reason }[/B][/COLOR].
        על-מנת להימנע מאזהרות נוספות גם בעתיד, אנא קרא בקפידה את חוקי הפורום.
        הנך רשאי לערער על אזהרה זו, על ידי הגשת ערעור בתת-פורום תלונות בהתאם לטופס המתאים בנעוץ.
        בברכה,
        הנהלת פורום ${ forumName }.
    `,
    [ SPAM_WARNING ]: ({ forumName, warning }: any) =>
    `
        משתמש יקר,
        קיבלת אזהרה ${ warning === 'yellow' ? '[COLOR=#ffd700][B]צהובה[/B][/COLOR]' : '[B][COLOR=#ff0000]אדומה[/COLOR][/B]' } בעקבות פרסום ספאם.
        על-מנת להימנע מאזהרות נוספות גם בעתיד, אנא קרא בקפידה את חוקי הפורום.
        הנך רשאי לערער על אזהרה זו, על ידי הגשת ערעור בתת-פורום תלונות בהתאם לטופס המתאים בנעוץ.
        בברכה,
        הנהלת פורום ${ forumName }.
    `,
    [ IMPROPER_LANGUAGE_USE_WARNING ]: ({ forumName, warning }: any) =>
    `
        משתמש יקר,
        קיבלת אזהרה ${ warning === 'yellow' ? '[COLOR=#ffd700][B]צהובה[/B][/COLOR]' : '[B][COLOR=#ff0000]אדומה[/COLOR][/B]' } בעקבות שימוש בשפה לא נאותה, כזו שמטרתה לאיים, להעליב, לבזות, להטריד וכו..
        על-מנת להימנע מאזהרות נוספות גם בעתיד, אנא קרא בקפידה את חוקי הפורום.
        הנך רשאי לערער על אזהרה זו, על ידי הגשת ערעור בתת-פורום תלונות בהתאם לטופס המתאים בנעוץ.
        בברכה,
        הנהלת פורום ${ forumName }.
    `
};
