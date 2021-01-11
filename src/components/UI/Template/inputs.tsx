import {
    DECLARATION_WEEKLY_CHALLENGES,
    PM_WINNER,
    PM_NICK,
    PM_SUBNICK_TEXT,
    PM_SUBNICK_IMG,
    PM_CHAMP,
    PM_FXP_POINTS,
} from '../../../Data';

const basicInputs = [
    {
        label: 'שם הפורום',
        name: 'forumName'
    },
    {
        label: 'ניק הזוכה',
        name: 'winnerName'
    },
    {
        label: 'שמך הפרטי',
        name: 'privateName'
    },
    {
        label: 'קישור לאתגר',
        name: 'challengeLink'
    }
];

const inputs: any = {
    [DECLARATION_WEEKLY_CHALLENGES]: [
        {
            label: 'שם הפורום',
            name: 'forumName'
        },
        {
            label: 'ניק המשקיען',
            name: 'investorName'
        },
        {
            label: 'קישור לאשכול (הזוכה)',
            name: 'postLink'
        }
    ],
    [PM_WINNER]: [],
    [PM_NICK]: [
        ...basicInputs
    ],
    [PM_SUBNICK_TEXT]: [
        ...basicInputs,
        {
            label: 'ימים / נקודות',
            name: 'daysAndPoints'
        }
    ],
    [PM_SUBNICK_IMG]: [
        ...basicInputs,
        {
            label: 'ימים / נקודות',
            name: 'daysAndPoints'
        }
    ],
    [PM_CHAMP]: [
        ...basicInputs
    ],
    [PM_FXP_POINTS]: [
        ...basicInputs,
        {
            label: 'ימים / נקודות',
            name: 'daysAndPoints'
        }
    ]
};

export default inputs;
