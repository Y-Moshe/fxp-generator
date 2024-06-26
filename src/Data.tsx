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

export interface OptionType {
    label: string | JSX.Element;
    value: any;
    id: number;
}

export interface InputType {
    label: string;
    name: string;
    type: 'text' | 'select' | 'autocomplete' | 'radio' | 'number';
    validationSchema: yup.AnySchema;
    options?: OptionType[];
    radios?: OptionType[];
}

const basicInputs: InputType[] = [
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

const warningSelect: InputType = {
    label: 'אזהרה',
    name: 'warning',
    type: 'select',
    options: [
        {
            id: 1,
            label: 'צהובה',
            value: 'yellow'
        },
        {
            id: 2,
            label: 'אדומה',
            value: 'red'
        }
    ],
    validationSchema: yup.string().required('נא לבחור אזהרה')
};

export const inputs: { [template: string]: InputType[] } = {
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
                                 .matches(/^(http|https).+(\.png|\.jpg|\.jpeg)$/, 'קישור שגוי!')
        },
        {
            label: 'סטייל',
            name: 'style',
            type: 'select',
            options: [
                {
                    id: 1,
                    label: <img src = "https://i.imagesup.co/images2/84dc2f601852f01ca8bba4bd395a4d5756784812.png" alt = "default style" style = {{ maxHeight: 50 }} />,
                    value: {
                        winner: 'https://i.imagesup.co/images2/84dc2f601852f01ca8bba4bd395a4d5756784812.png',
                        poster: 'https://i.imagesup.co/images2/7fbf9fbeeecf126bbc52549eab92bfa859ef6981.png'
                    }
                },
                {
                    id: 2,
                    label: <img src = "https://i.imagesup.co/images2/79871b8685b53f86137c3808e7a086530d160367.png" alt = "second style" style = {{ maxHeight: 50 }} />,
                    value: {
                        winner: 'https://i.imagesup.co/images2/79871b8685b53f86137c3808e7a086530d160367.png',
                        poster: 'https://i.imagesup.co/images2/3eb74fb255eaac141f9bfb342769420f28f5fce2.png'
                    }
                },
                {
                    id: 3,
                    label: <img src = "https://i.imagesup.co/images2/a43c8509bd98afb74e9569731c87b0b49f147c5e.png" alt = "third style" style = {{ maxHeight: 50 }} />,
                    value: {
                        winner: 'https://i.imagesup.co/images2/a43c8509bd98afb74e9569731c87b0b49f147c5e.png',
                        poster: 'https://i.imagesup.co/images2/5cfd3f4412657d09d581fc8f192997fe73f997cf.png'
                    }
                },
                {
                    id: 4,
                    label: <img src = "https://i.imagesup.co/images2/80043f099016ebfc34c801eb6ff9eac409dd9173.png" alt = "fouth style" style = {{ maxHeight: 50 }} />,
                    value: {
                        winner: 'https://i.imagesup.co/images2/80043f099016ebfc34c801eb6ff9eac409dd9173.png',
                        poster: 'https://i.imagesup.co/images2/deeded2a2dc704989297e502b5fbc8310c4882f6.png'
                    }
                },
                {
                    id: 5,
                    label: <img src = "https://i.imagesup.co/images2/419a94e46311c1fd8d1d81ffd32fbc418ede2306.png" alt = "fifth style" style = {{ maxHeight: 50 }} />,
                    value: {
                        winner: 'https://i.imagesup.co/images2/419a94e46311c1fd8d1d81ffd32fbc418ede2306.png',
                        poster: 'https://i.imagesup.co/images2/5eae3afff0714268709570aa2e7cb9c890690762.png'
                    }
                }
            ],
            validationSchema: yup.object()
        },
        {
            label: 'ניק המשקיען',
            name: 'winnerName',
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
            validationSchema: yup.string().required(),
            radios: [
                {
                    id: 1,
                    label: 'משתמש ללא דרגה',
                    value: 'unRanked'
                },
                {
                    id: 2,
                    label: 'משתמש ווינר',
                    value: 'winner'
                },
                {
                    id: 3,
                    label: 'מנהל/ת',
                    value: 'admin'
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

export const contributors = [
    {
        userName: 'Y_Moshe',
        profileLink: 'https://www.fxp.co.il/member.php?u=924810'
    },
    {
        userName: 'MultiApple',
        profileLink: 'https://www.fxp.co.il/member.php?u=1026230'
    },
    {
        userName: 'DeLucifer',
        profileLink: 'https://www.fxp.co.il/member.php?u=750003'
    }
];

export default inputs;
