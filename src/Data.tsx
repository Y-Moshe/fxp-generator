import * as yup from 'yup';

export const DECLARATION_WEEKLY_CHALLENGES = 'declarationWeeklyChallenges',
    PM_WINNER       = 'pmWinner',
    PM_NICK         = 'pmNick',
    PM_SUBNICK_TEXT = 'pmSubnickText',
    PM_SUBNICK_IMG  = 'pmSubnickImg',
    PM_CHAMP        = 'pmChamp',
    PM_FXP_POINTS   = 'pmFxpPoints';

const basicInputs = [
    {
        label: 'שם הפורום',
        name: 'forumName',
        type: 'text',
        validationSchema: yup.string().min(3, 'קצר מידי')
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
        label: 'קישור לאתגר',
        name: 'challengeLink',
        type: 'text',
        validationSchema: yup.string()
            .matches(/^(https:\/\/www.fxp.co.il)\/.+/, { message: 'יש להזין קישור תקין' })
    }
];

export const inputs: any = {
    [ DECLARATION_WEEKLY_CHALLENGES ]: [
        {
            ...basicInputs[0]
        },
        {
            label: 'ניק המשקיען',
            name: 'investorName',
            text: 'text',
            validationSchema: yup.string().min(3, 'קצר מידי')
        },
        {
            label: 'זוכה אשכול',
            name: 'postWinner',
            text: 'text',
            validationSchema: yup.string().min(3, 'קצר מידי')
        },
        {
            label: 'לינק לאשכול',
            name: 'postLink',
            text: 'text',
            validationSchema: yup
                .string()
                .matches(/^(https:\/\/www.fxp.co.il)\/.+/, { message: 'יש להזין קישור תקין' })
        },
        {
            label: 'שם האשכול',
            name: 'postName',
            text: 'text',
            validationSchema: yup
                .string()
                .min(3, 'קצר מידי')
        }
    ],
    [ PM_WINNER ]: [],
    [ PM_NICK ]: [
        ...basicInputs
    ],
    [ PM_SUBNICK_TEXT ]: [
        ...basicInputs,
        {
            label: 'ימים / נקודות',
            name: 'daysAndPoints',
            type: 'number',
            validationSchema: yup.number()
        }
    ],
    [ PM_SUBNICK_IMG ]: [
        ...basicInputs,
        {
            label: 'ימים / נקודות',
            name: 'daysAndPoints',
            type: 'number',
            validationSchema: yup.number()
        }
    ],
    [ PM_CHAMP ]: [
        ...basicInputs
    ],
    [ PM_FXP_POINTS ]: [
        ...basicInputs,
        {
            label: 'ימים / נקודות',
            name: 'daysAndPoints',
            type: 'number',
            validationSchema: yup.number()
        }
    ]
};

export default inputs;