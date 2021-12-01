# FxP - Generator
A Generate tool used to generate [BBCode](https://en.wikipedia.org/wiki/BBCode) for [Fxp](https://www.fxp.co.il) common tasks.

Tool URL: https://ym-fxp-generator.netlify.app/

## Getting Started

    git clone https://github.com/Y-Moshe/fxp-generator.git
    cd fxp-generator
    yarn or npm install

First step to do after cloned, is to make a separated branch from master:
- `git checkout -b [branch-name]`, Then just:
- `yarn start or npm run start`

## Contribute Guide - New Option
The main focus is at just 2 files, `API.tsx, Data.tsx`.  
starting at `Data.tsx`, in order to add new option, u will need to add a new constant.  


1.  let's say we want to a "new one" option.
    ```
    export const DEFINE_CATEGORY = (categoryNumber: number) => `category-${categoryNumber}`,
        DECLARATION_WEEKLY_CHALLENGES = 'declarationWeeklyChallenges',
        PM_WINNER                     = 'pmWinner',
        ...,
        NEW_ONE                       = 'newOne';
    ```
    > (TIP) try to follow the syntax plz, clear code, easy to understood.
2.  Add new option to the select options:
    ```
    export const options = [
        { id: DEFINE_CATEGORY(1),            title: 'הכרזות' },
        { id: DECLARATION_WEEKLY_CHALLENGES, title: 'הכרזה - משקיען ואשכול השבוע' },
        { id: DEFINE_CATEGORY(2),            title: 'הודעות פרטיות' },
        ...,
        { id: NEW_ONE,                       title: 'אופצייה חדשה' }
    ];
    You can define a new category using the constant function DEFINE_CATEGORY(number)  
    Just make sure u passed a unique number.
    ```
    ---
3.  Add a new entry to the `inputs` constant, your will have `TS` IntelliSense / Autocomplete
    ```
    export const inputs: { [template: string]: InputType[] } = {
        [ DECLARATION_WEEKLY_CHALLENGES ]: [
            {
                ...basicInputs[0]
            },
            {
                label: 'ניק המשקיען',
                name: 'winnerName',
                type: 'text',
                validationSchema: yup.string().min(3, 'קצר מידי')
            },
            ...
        ],
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
    > In addional, there's `basicInputs` constant for common use cases, consider using it.
4.  Go to `API.tsx`, and find `htmlTemplates` object constant, and add new definition
    ```
    const htmlTemplates = {
        [ DECLARATION_WEEKLY_CHALLENGES ]: ({ date, winnerName, postWinner, postLink, postName }: any) => `...`,
        ...,
        [ NEW_ONE ]: ({ newOne, date }: any) => `[B] new one Text: ${newOne}, at ${date} [/B]`
    }
    ```
    Use the "extract object syntax"(`{ winnerName, ...etc } = templateData`), to define which variables u gonna use, like I did!
    `htmlTemplates[ template ]( templateData )`) returns a generated string(`BBCode`) using the variables u provided.  
    NOTE: `date` is passed always so you can use it, will be generate as a string in the following format 'dd.mm.yy'.
5.  (optional) Go back to `Data.tsx`, and add yourself to contributors array that we looping at Footer component.
    `export const contributors = ['Y_Moshe', 'NewOne'];`

After finished making ur changes / work, commit the changes and push ur branch to origin:  

    git push -u origin [branch-name]

That's it, thank you for contribute :).

---

## UI Componenets

#### `Input`

    interface InputProps extends StandardTextFieldProps(from `@material-ui` package) {
        name: string;
        value: any;
        onChange: ( ...args: any ) => void;
        hint?: any;
        autoCompleteOptions?: ForumData[];
        onAutoCompleteChange?: ( data: ForumData | any ) => void;
        selectOptions?: OptionType[];
        radioOptions?: OptionType[];
    }

Can render different types of input, can accept all properties `StandardTextFieldProps` can  
But note that not all of them will be used, depends on the input type.  
There are 4 diffrent type of Inputs in this app, `autocomplete`, `select`, `radio`, `text` - default.  
The following showing the `required` params for each type:

**Usage example**:

    <Input 
        type                 = "autocomplete" || "select" || "radio" || "text"
        name                 = "firstName"
        label                = "First Name"
        onChange             = { handleChange }
        onBlur               = { handleBlur }
        onAutoCompleteChange = { handleAutoCompleteChange } - required for type "autocomplete"
        hint                 = "like a error message"
        error                = { true or false }
        value                = "Moshe"
        autoCompleteOptions  = { ForumData[] } - required for type "autocomplete"
        selectOptions        = { OptionType[] } - required for type "select"
        radioOptions         = { OptionType[] } - required for type "radio" />

---

#### `SnackAlert`

    export interface SnackAlertProps {
        message: string;
        status: 'error' | 'info' | 'success' | 'warning';
        onClose?: () => void; // must be passed onces!
    }

Useful to display a message to the user, it uses Snackbar from the `@material-ui` package  
When displayed, its position is at the `bottom center` and will disappear after 3 seconds  
Its appearance controlled by the `message`, if there's a message it will be displayed!

**Usage example**:

    <SnackAlert
        message = "It Works!"
        status  = "success"
        onClose = { () => console.log('SnackAlert Closed')} />

---

#### `ImgPreview`

    interface ImgPreviewProps {
        imageURL: string;
    }

Image Preview, just as sounds, renders the image using `<img>` HTML tag  
Wrapped inside a `<div>` with `flex` CSS Property set while the `<img>` has a `margin: auto` for centering  
It also displays a nice spinner while the image is loading.

**Usage example**:

    <ImgPreview imageURL = "https://images.weserv.nl/?url=i.imgur.com/RraZVK6.png" />

## Custom Hooks

#### `usePrevious`

[Link](https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state)

    Will we see it in the React.js future?
