const inquirer = require('inquirer');
const inquirerPrompt = require('inquirer-autocomplete-prompt');
const InterruptedPrompt = require('../index')


// For all default prompts
InterruptedPrompt.replaceAllDefaults(inquirer)

// For plugin prompts
inquirer.registerPrompt('autocomplete', InterruptedPrompt.from(inquirerPrompt));

// Demo
console.log('Demo interrupted prompt, press <Esc> to interrupt the prompt')
inquirer
    .prompt([
        {
            type: 'input',
            name: 'intr-input',
            message: 'Interrupted input',
            interruptedKeyname: 'a'
        },
        {
            type: 'number',
            name: 'intr-number',
            message: 'Interrupted number'
        },
        {
            type: 'confirm',
            name: 'intr-confirm',
            message: 'Interrupted confirm'
        },
        {
            type: 'list',
            name: 'intr-list',
            message: 'Interrupted list',
            choices: ['Option 1', 'Option 2', 'Option 3']
        },
        {
            type: 'rawlist',
            name: 'intr-rawlist',
            message: 'Interrupted rawlist',
            choices: ['Option 1', 'Option 2', 'Option 3']
        },
        {
            type: 'expand',
            name: 'intr-expand',
            message: 'Interrupted expand',
            choices: [{
                key: 'y',
                name: 'Yes'
            },
            {
                key: 'n',
                name: 'No'
            }]
        },
        {
            type: 'checkbox',
            name: 'intr-checkbox',
            message: 'Interrupted checkbox',
            choices: ['Option 1', 'Option 2', 'Option 3']
        },
        {
            type: 'password',
            name: 'intr-password',
            message: 'Interrupted password',
            mask: '*'
        },
        {
            type: 'autocomplete',
            name: 'intr-autocomplete',
            message: 'Interrupted plugin autocomplete',
            source: () => ['Apple', 'Orange', 'Banana', 'Kiwi', 'Lichi', 'Grapefruit']
        },
        {
            type: 'input',
            name: 'intr-specific-input',
            message: 'Interrupted input with specific key'
        },
    ])
    .then((answers) => {
        console.log(answers)
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            if (error === InterruptedPrompt.EVENT_INTERRUPTED) {
                console.log('Prompt has been interrupted')
            }
        }
    });