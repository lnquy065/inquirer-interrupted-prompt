import observe from "inquirer/lib/utils/events.js";
import inquirer from "inquirer";
import PromptConstructor = inquirer.prompts.PromptConstructor;

const rejectIfInterrupted = (event, hotkey, reject) => {
    let isReject = false;
    if (hotkey) {
        const hotkeys = hotkey.split('+')
        if (hotkeys.length === 2) {
            const [specKey, key] = hotkeys
            isReject = event.key[specKey] && event.key.name === key
        } else {
            if (event.key.name === hotkey) isReject = true
        }
    }
    if (isReject) {
         reject(InterruptedPrompt.EVENT_INTERRUPTED)
    }
}


/**
 * Create an interrupted prompt from any Prompt from inquirer or its plugins
 */
const from = (promptBase: PromptConstructor): PromptConstructor => {
    class InterruptedPrompt extends promptBase {
        run() {
            const interruptedKeyName = this['opt'].interruptedKeyName || this['opt'].interruptedKeyname || 'escape'
            return new Promise((resolve, reject) => {
                const events = observe(this['rl']);
                events.keypress.pipe().forEach(e => rejectIfInterrupted(e, interruptedKeyName, reject));
                super.run().then(resolve, reject);
            })
        }
    }
    return InterruptedPrompt;
};

/**
 * Override all default inquirer prompts to interrupted prompts
 */
const replaceAllDefaults = (inquirer) => {
    Object.keys(inquirer.prompt.prompts).forEach((key) => {
        inquirer.prompt.prompts[key] = InterruptedPrompt.from(
            inquirer.prompt.prompts[key]
        );
    });
}

const InterruptedPrompt = {
    EVENT_INTERRUPTED: 'EVENT_INTERRUPTED',
    from,
    /**
     * @deprecated
     */
    replaceAllDefaults,
    fromAll: replaceAllDefaults
}


export default InterruptedPrompt;
