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

View demo menu code at: /src/example.js

# Installation

`npm install inquirer-interrupted-prompt --save`

or

`yarn add inquirer-interrupted-prompt`

_Note: As of version 9, [inquirer](https://github.com/SBoudrias/Inquirer.js) have moved to ES modules. Please, upgrade `inquirer-interrupted-prompt` to the latest version for full support. In addition, projects are using inquirer < 9 can use the latest version of this plugin as well_

# Usage

After importing the package, we need to register new interrupted prompts to `inquirer`.

_Note: Examples below are written in ESModule, you can use CommonJS as well_

## To turn all prompts to interrupted prompts

```javascript
import inquirer from "inquirer";
import InterruptedPrompt from "inquirer-interrupted-prompt";

InterruptedPrompt.fromAll(inquirer);
```

Now all **default inquirer prompts** and **its plugins** will be converted to interrupted form. You can reuse your code without changing anything:

```javascript
import inquirer from "inquirer";
import InterruptedPrompt from "inquirer-interrupted-prompt";
import autocompletePrompt from "inquirer-autocomplete-prompt"; // working with plugin as well

InterruptedPrompt.fromAll(inquirer);

inquirer
  .prompt([
    {
      type: "input",
      name: "intr-input",
      message: "Interrupted input",
    },
    {
      type: "number",
      name: "intr-number",
      message: "Interrupted number",
    },
  ])
  .then((answers) => {
    console.log(answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
    } else {
      if (error === InterruptedPrompt.EVENT_INTERRUPTED) {
        console.log("Prompt has been interrupted");
      }
    }
  });
```

## To turn a specific prompt to interrupted prompt

If you don't want to convert all prompts, you can use the `from` function to convert a specific prompt that you want.

```javascript
import inquirer from "inquirer";
import inquirerInputPrompt from "inquirer/lib/prompts/input";
import InterruptedPrompt from "inquirer-interrupted-prompt";

inquirer.registerPrompt("input", InterruptedPrompt.from(inquirerInputPrompt));
```

With plugin prompt

```javascript
import autocompletePrompt from "inquirer-autocomplete-prompt";
import InterruptedPrompt from "inquirer-interrupted-prompt";

inquirer.registerPrompt(
  "autocomplete",
  InterruptedPrompt.from(autocompletePrompt)
);
```

## Customize interrupted key

You can set any key name you want via `interruptedKeyName` in question option:

```javascript
inquirer
  .prompt([
    {
      type: "input",
      name: "intr-input",
      message: "Interrupted input with default <Esc> key",
    },
    {
      type: "input",
      name: "intr-input-2",
      message: "Interrupted input with <a> key",
      interruptedKeyName: "a",
    },
  ])
  .then((answers) => {
    console.log(answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
    } else {
      if (error === InterruptedPrompt.EVENT_INTERRUPTED) {
        console.log("Prompt has been interrupted");
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
      console.log("Prompt has been interrupted");
    }
  });
```

### Try - catch

```javascript
try {
  await inquirer.prompt([]);
} catch (error) {
  if (error === InterruptedPrompt.EVENT_INTERRUPTED) {
    console.log("Prompt has been interrupted");
  }
}
```

## License

MIT © [lnquy065](https://github.com/lnquy065)
