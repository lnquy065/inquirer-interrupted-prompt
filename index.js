const observe = require('inquirer/lib/utils/events')

const rejectIfInterrupted = (event, hotkey, reject) => {
    if (event.key.name === hotkey) reject(InterruptedPrompt.EVENT_INTERRUPTED)
}

/**
 * Create a interrupted prompt from any Prompt from inquirer or its plugins
 * @param {PromptClass} basePrompt
 * @returns {InterruptedPrompt}
 */
const from = (basePrompt) => {
    class IntrPrompt extends basePrompt {
        run(cb) {
            const intrKeyName = this.opt.interruptedKeyName || this.opt.interruptedKeyname || 'escape'
            return new Promise((resolve, reject) => {
                const events = observe(this.rl);
                events.keypress.pipe().forEach(e => rejectIfInterrupted(e, intrKeyName, reject));
                super.run(cb).then(resolve, reject);
            })
        }
    }
    return IntrPrompt;
}

/**
 * Override all default inquirer prompts to interrupted prompts
 * @param {PromptClass} basePrompts
 * @returns {InterruptedPrompt}
 */
const replaceAllDefaults = inquirer => {
    inquirer.registerPrompt('list', InterruptedPrompt.from(require('inquirer/lib/prompts/list')));
    inquirer.registerPrompt('input', InterruptedPrompt.from(require('inquirer/lib/prompts/input')));
    inquirer.registerPrompt('number', InterruptedPrompt.from(require('inquirer/lib/prompts/number')));
    inquirer.registerPrompt('confirm', InterruptedPrompt.from(require('inquirer/lib/prompts/confirm')));
    inquirer.registerPrompt('rawlist', InterruptedPrompt.from(require('inquirer/lib/prompts/rawlist')));
    inquirer.registerPrompt('expand', InterruptedPrompt.from(require('inquirer/lib/prompts/expand')));
    inquirer.registerPrompt('checkbox', InterruptedPrompt.from(require('inquirer/lib/prompts/checkbox')));
    inquirer.registerPrompt('password', InterruptedPrompt.from(require('inquirer/lib/prompts/password')));
    inquirer.registerPrompt('editor', InterruptedPrompt.from(require('inquirer/lib/prompts/editor')));
}

const InterruptedPrompt = {
    EVENT_INTERRUPTED: 'EVENT_INTERRUPTED',
    from,
    replaceAllDefaults
}



module.exports = InterruptedPrompt