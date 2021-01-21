# A Generate tool for [Fxp](https://www.fxp.co.il) common tasks.
URL: https://y-moshe.github.io/fxp-generator/

## Contribute Guide, How to add a new option
The main focus is at just 2 files, ```API.tsx, Data.tsx```.

## Step 1
let us start at Data.tsx, in order to add new option, u will need to add a new constant, and export it ofc.  
let's say we want to a "new one" option.
```
export const DEFINE_CATEGORY = (categoryNumber: number) => `category-${categoryNumber}`,
    DECLARATION_WEEKLY_CHALLENGES = 'declarationWeeklyChallenges',
    PM_WINNER                     = 'pmWinner',
    ...,
    NEW_ONE                       = 'newOne';
```
try to follow the syntax plz, clear code, easy to understood.
## Step 2
Add new option to the select options:
```
export const options = [
    { title: 'הכרזות',                                  id: DEFINE_CATEGORY(1) },
    { title: 'הכרזה - משקיען ואשכול השבוע',                id: DECLARATION_WEEKLY_CHALLENGES },
    { title: 'הודעה פרטית - זכייה בווינר (משקיען/אשכול השבוע)', id: PM_WINNER },
    ...,
    { title: 'אופצייה חדשה',                             id: NEW_ONE }
];
You can define a new category using the constant function DEFINE_CATEGORY(number)  
Just make sure u passed a unique number.
```
## Step 3
Add a new entry to the "inputs" constant
```
export const inputs: any = {
    [ DECLARATION_WEEKLY_CHALLENGES ]: [
        {
            ...basicInputs[0]
        },
        {
            label: 'ניק המשקיען',
            name: 'investorName',
            type: 'text',
            validationSchema: yup.string().min(3, 'קצר מידי')
        },
        ...
    ],
    [ PM_WINNER ]: [],
    ...,
    [ NEW_ONE ]: [
        {
            label: 'חדש',
            name: 'newOne',
            type: 'text',
            validationSchema: yup.string().min(3, 'קצר מידי').required('חובה למלא שדא זה!')
        }
    ]
};
```
There are 4 properties to implement.
```
label - simply text to display.
name - this should be english only, using camelCase, will be used as form input "name" attribute, and an "key" as for React identification.
type - The input type, can be "text", "select" or "autocomplete".
options - only if the "type" is a select, should be an array [ { title: string, value: string } ]
validationSchema - this is the validation schema for formik, uses yup package, u can defiend the validation for the input, more info can be found here: https://formik.org/docs/guides/validation.
```
In addional, there's ```basicInputs``` constant for common use cases, consider using it :)
NOTE: If u only want to add new option, with no inputs, just add empty array: ```[]```!
## Step 4
Go to ```API.tsx```, and find htmlTemplates object constant, and add new definition
```
const htmlTemplates = {
    [ DECLARATION_WEEKLY_CHALLENGES ]: ({ date, investorName, postWinner, postLink, postName }: any) => `...`,
    [ PM_WINNER ]: () => ``,
    ...,
    [ NEW_ONE ]: ({ newOne, date }) => `[B] new one Text: ${newOne}, at ${date} [/B]`
}
```
Use the "extract object syntax", to define which variables u gonna use, like i did at: ```DECLARATION_WEEKLY_CHALLENGES```  
Plz note that the value of it is an function that returns a generated string using the variables u defined.  
Pay attention to ```/** Variables must be identical to the 'name' prop of inputs from ./Data.tsx */```, in our case: ```newOne```  
NOTE: date variable will always available to use, will generate a string in the following format 'dd/mm/yyyy' of the current date ofc.
## Step 5, last one
Go back to ```Data.tsx```, and add yourself to contributors array that we looping at Footer component.
```
export const contributors = ['Y_Moshe', 'NewOne'];
```
That's it, thank you for contribute :).
