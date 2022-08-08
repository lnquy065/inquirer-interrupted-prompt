import observe from "inquirer/lib/utils/events.js";

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
};

/**
 * Override all default inquirer prompts to interrupted prompts
 * @param {PromptClass} basePrompts
 * @returns {InterruptedPrompt}
 */
const replaceAllDefaults = inquirer => {
  Object.keys(inquirer.prompt.prompts).forEach((key) => {
    inquirer.prompt.prompts[key] = InterruptedPrompt.from(
      inquirer.prompt.prompts[key]
    );
  });
}

const InterruptedPrompt = {
    EVENT_INTERRUPTED: 'EVENT_INTERRUPTED',
    from,
    replaceAllDefaults
}


export default InterruptedPrompt;
