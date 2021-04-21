import * as yup from 'yup';

export const DEFINE_CATEGORY      = ( categoryNumber: number ) => `category-${categoryNumber}`,
    DECLARATION_WEEKLY_CHALLENGES = 'declarationWeeklyChallenges',
    DECLARATION_WEEKLY_RESPONSE   = 'declarationWeeklyResponse',
    PM_WINNER                     = 'pmWinner',
    PM_NICK                       = 'pmNick',
    PM_SUBNICK_TEXT               = 'pmSubnickText',
    PM_SUBNICK_IMG                = 'pmSubnickImg',
    PM_CHAMP                      = 'pmChamp',
    PM_FXP_POINTS                 = 'pmFxpPoints',
    GENERAL_WARNING               = 'generalWarning',
    SPAM_WARNING                  = 'spamWarning',
    IMPROPER_LANGUAGE_USE_WARNING = 'improperLanguageUse';

export const options = [
    { id: DEFINE_CATEGORY(1),            title: 'הכרזות' },
    { id: DECLARATION_WEEKLY_CHALLENGES, title: 'הכרזה - משקיען ואשכול השבוע' },
    { id: DECLARATION_WEEKLY_RESPONSE,   title: 'הכרזה - תגובת השבוע' },
    { id: DEFINE_CATEGORY(2),            title: 'הודעות פרטיות' },
    { id: PM_WINNER,                     title: 'הודעה פרטית - זכייה בווינר (משקיען/אשכול השבוע)' },
    { id: PM_NICK,                       title: 'הודעה פרטית - זכייה בשינוי ניק' },
    { id: PM_SUBNICK_TEXT,               title: 'הודעה פרטית - זכייה בשינוי תת ניק טקסט' },
    { id: PM_SUBNICK_IMG,                title: 'הודעה פרטית - זכייה בשינוי תת ניק תמונה' },
    { id: PM_CHAMP,                      title: 'הודעה פרטית - זכייה בנקודת צ׳אמפ' },
    { id: PM_FXP_POINTS,                 title: 'הודעה פרטית - זכייה בנקודות FxP' },
    { id: DEFINE_CATEGORY(3),            title: 'אזהרות' },
    { id: GENERAL_WARNING,               title: 'אזהרה - כללי' },
    { id: SPAM_WARNING,                  title: 'אזהרה - ספאם' },
    { id: IMPROPER_LANGUAGE_USE_WARNING, title: 'אזהרה - שימוש בשפה לא נאותה' }
];

const basicInputs = [
    {
        label: 'שם הפורום',
        name: 'forumName',
        type: 'autocomplete',
        validationSchema: yup.string().required('נא לציין פורום').min(3, 'קצר מידי')
    },
    {
        label: 'ניק הזוכה',
        name: 'winnerName',
        type: 'text',
        validationSchema: yup.string().min(3, 'קצר מידי')
    },
    {
        label: 'שמך הפרטי',
        name: 'privateName',
        type: 'text',
        validationSchema: yup.string().min(3, 'קצר מידי')
    },
    {
        label: 'שם האתגר',
        name: 'challengeName',
        type: 'text',
        validationSchema: yup.string().min(3, 'קצר מידי')
    },
    {
        label: 'קישור לאתגר',
        name: 'challengeLink',
        type: 'text',
        validationSchema: yup.string()
            .matches(/^(https:\/\/www.fxp.co.il)\/.+/, { message: 'יש להזין קישור תקין' })
    }
];

const warningSelect = {
    label: 'אזהרה',
    name: 'warning',
    type: 'select',
    options: [
        {
            label: 'צהובה',
            value: 'yellow'
        },
        {
            label: 'אדומה',
            value: 'red'
        }
    ],
    validationSchema: yup.string().required('נא לבחור אזהרה')
};
/*
    {
        label: 'textLabel',
        name: 'inputName',
        type: 'text' | 'select' | 'autocomplete' | 'radio',
        validationSchema: yup.string().min(5, 'קצר מידי').required('נדרש למלא!').... and so on.
    }
*/
export const inputs: any = {
    [ DECLARATION_WEEKLY_CHALLENGES ]: [
        {
            ...basicInputs[0]
        },
        {
            label: 'תמונת הפורום (קישור)',
            name: 'forumImg',
            type: 'text',
            validationSchema: yup.string()
                                 .required('נא לציין קישור לתמונת הפורום')
                                 .min(3, 'קצר מידי')
                                 .matches(/^(http|https).+(\.png|\.jpg|\.jpeg)$/)
        },
        {
            label: 'ניק המשקיען',
            name: 'investorName',
            type: 'text',
            validationSchema: yup.string().min(3, 'קצר מידי')
        },
        {
            label: 'זוכה אשכול',
            name: 'postWinner',
            type: 'text',
            validationSchema: yup.string().min(3, 'קצר מידי')
        },
        {
            label: 'לינק לאשכול',
            name: 'postLink',
            type: 'text',
            validationSchema: yup.string()
                                 .matches(/^(https:\/\/www.fxp.co.il)\/.+/, { message: 'יש להזין קישור תקין' })
        },
        {
            label: 'שם האשכול',
            name: 'postName',
            type: 'text',
            validationSchema: yup.string().min(3, 'קצר מידי')
        }
    ],
    [ DECLARATION_WEEKLY_RESPONSE ]: [
        { ...basicInputs[0] },
        {
            label: 'תמונת הפורום (קישור)',
            name: 'forumImg',
            type: 'text',
            validationSchema: yup.string()
                                 .required('נא לציין קישור לתמונת הפורום').min(3, 'קצר מידי')
                                 .matches(/^(http|https).+(\.png|\.jpg|\.jpeg)$/)
        },
        { ...basicInputs[1] },
        {
            label: 'שם הסיפור / אשכול',
            name: 'storyName',
            type: 'text',
            validationSchema: yup.string()
                                 .required('נא לציין שם הסיפור / אשכול')
                                 .min(3, 'קצר מידי')
        },
        {
            label: 'קישור לשם הסיפור / אשכול',
            name: 'storyLink',
            type: 'text',
            validationSchema: yup.string()
                                 .required('נא לציין קישור לסיפור / אשכול')
                                 .matches(/^(https:\/\/www.fxp.co.il)\/.+/, { message: 'יש להזין קישור תקין' })
        }
    ],
    [ PM_WINNER ]: [
        ...basicInputs,
        {
            label: 'דרגה נוכחית של הזוכה',
            name: 'currentRank',
            type: 'radio',
            radios: [
                {
                    label: 'משתמש ללא דרגה',
                    value: 'unRanked'
                },
                {
                    label: 'משתמש ווינר',
                    value: 'winner'
                },
                {
                    label: 'מנהל/ת',
                    value: 'admin'
                },
                {
                    label: 'חבר/ת צוות',
                    value: 'teammate'
                }
            ]
        },
        {
            label: 'ימים',
            name: 'days',
            type: 'number',
            validationSchema: yup.number().required('נא לבחור ימים')
        }
    ],
    [ PM_NICK ]: [
        ...basicInputs
    ],
    [ PM_SUBNICK_TEXT ]: [
        ...basicInputs,
        {
            label: 'ימים',
            name: 'days',
            type: 'number',
            validationSchema: yup.number().required('נא לבחור ימים')
        }
    ],
    [ PM_SUBNICK_IMG ]: [
        ...basicInputs,
        {
            label: 'ימים',
            name: 'days',
            type: 'number',
            validationSchema: yup.number().required('נא לבחור ימים')
        }
    ],
    [ PM_CHAMP ]: [
        ...basicInputs
    ],
    [ PM_FXP_POINTS ]: [
        ...basicInputs,
        {
            label: 'נקודות',
            name: 'points',
            type: 'number',
            validationSchema: yup.number().required('נא לבחור נקודות')
        }
    ],
    [ GENERAL_WARNING ]: [
        {
            ...basicInputs[0]
        },
        {
            ...warningSelect
        },
        {
            label: 'סיבה',
            name: 'reason',
            type: 'text',
            validationSchema: yup.string().min(5, 'קצר מידי').required('נא לציין סיבה')
        }
    ],
    [ SPAM_WARNING ]: [
        {
            ...basicInputs[0]
        },
        {
            ...warningSelect
        }
    ],
    [ IMPROPER_LANGUAGE_USE_WARNING ]: [
        {
            ...basicInputs[0]
        },
        {
            ...warningSelect
        }
    ]
};

export const contributors = [ 'Y_Moshe', 'MultiApple', 'DeLucifer' ];

export default inputs;