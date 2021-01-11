export const DECLARATION_WEEKLY_CHALLENGES = 'declarationWeeklyChallenges',
    PM_WINNER =       'pmWinner',
    PM_NICK =         'pmNick',
    PM_SUBNICK_TEXT = 'pmSubnickText',
    PM_SUBNICK_IMG =  'pmSubnickImg',
    PM_CHAMP =        'pmChamp',
    PM_FXP_POINTS =   'pmFxpPoints';

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