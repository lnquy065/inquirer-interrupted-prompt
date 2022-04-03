# inquirer-interrupted-prompt

Allows turning any existing [inquirer](https://github.com/SBoudrias/Inquirer.js) and its plugin prompts into prompts that can be interrupted with a custom key.

![Menu demo](https://raw.githubusercontent.com/lnquy065/inquirer-interrupted-prompt/master/example/demo-menu.gif)

It works for menu and submenu programs. For example, we have an application that allows browsing and editing files:

```
==== File browser ====
  Search file
> Create new file
  Edit file
```
Now we will create new file by select the second option. A promts will be shown to ask the file name:

```
==== Create new file ====
? Input new file name:
```

Assuming we don't want to create a file anymore, we want to go back to the main menu. Now, with an interrupted prompt, we can easily go back by pressing the `Esc` key or whatever key you want.

One convenient thing is that you don't need to register for this type of prompt, you just need to convert existing inquirer and its plugin prompts to this format with just one function.

View demo menu code at: /example/menu.js


# Installation

`npm install inquirer-interrupted-prompt --save`

or

`yarn add inquirer-interrupted-prompt`

# Usage

After importing the package, we need to register new interrupted prompts to `inquirer`.

For full code, please view `example.js` file in `example` folder.

## Turn all default inquirer prompts to interrupted prompts

```javascript
const inquirer = require('inquirer');
const InterruptedPrompt = require('inquirer-interrupted-prompt');

InterruptedPrompt.replaceAllDefaults(inquirer);
```

Now all default prompts `input, number, confirm, list, rawlist, expand, checkbox, password, editor` are turned. Now you can reuse your code without changing anything:

```javascript
const inquirer = require('inquirer');
const InterruptedPrompt = require('inquirer-interrupted-prompt');

InterruptedPrompt.replaceAllDefaults(inquirer);

inquirer
    .prompt([
        {
            type: 'input',
            name: 'intr-input',
            message: 'Interrupted input'
        },
        {
            type: 'number',
            name: 'intr-number',
            message: 'Interrupted number'
        }
    ])
    .then((answers) => {
        console.log(answers)
    })
    .catch((error) => {
        if (error.isTtyError) {
           
        } else {
            if (error === InterruptedPrompt.EVENT_INTERRUPTED) {
                console.log('Prompt has been interrupted')
            }
        }
    });
```

## Turn an inquirer prompts or its plugin to interrupted prompts

If you don't want to turn all default prompt, you can use the `from` function to turn a specific prompt that you want.

```javascript
const inquirer = require('inquirer');
const inquirerInputPrompt = require('inquirer/lib/prompts/input');
const InterruptedPrompt = require('inquirer-interrupted-prompt')

inquirer.registerPrompt('input', InterruptedPrompt.from(inquirerInputPrompt));
```

Or with plugin prompts

```javascript
const autocompletePrompt = require('inquirer-autocomplete-prompt');
const InterruptedPrompt = require('inquirer-interrupted-prompt')

inquirer.registerPrompt('autocomplete', InterruptedPrompt.from(autocompletePrompt));
```

## Customize interrupted key

You can set any key name you want via `interruptedKeyname` in question option:

```javascript
inquirer
    .prompt([
        {
            type: 'input',
            name: 'intr-input',
            message: 'Interrupted input with default <Esc> key'
        },
        {
            type: 'input',
            name: 'intr-input-2',
            message: 'Interrupted input with <a> key',
            interruptedKeyname: 'a'
        },
    ]).then((answers) => {
        console.log(answers)
    })
    .catch((error) => {
        if (error.isTtyError) {
        } else {
            if (error === InterruptedPrompt.EVENT_INTERRUPTED) {
                console.log('Prompt has been interrupted')
            }
        }
    });
```
## Exception handler

If an interrupted event has been triggered, it will throw an exception. There are two ways you can do to handle the exception from interruption:

### Promise

```javascript
inquirer
    .prompt([])
    .then((answers) => {})
    .catch((error) => {
        if (error === InterruptedPrompt.EVENT_INTERRUPTED) {
            console.log('Prompt has been interrupted')
        }
    });
```

### Try - catch

```javascript
try {
    await inquirer.prompt([]);
} catch(error) {
    if (error === InterruptedPrompt.EVENT_INTERRUPTED) {
        console.log('Prompt has been interrupted')
    }
}
```

## License

MIT © [lnquy065](https://github.com/lnquy065)