import inquirer from "inquirer";
import PromptConstructor = inquirer.prompts.PromptConstructor;
declare const InterruptedPrompt: {
    EVENT_INTERRUPTED: string;
    from: (promptBase: PromptConstructor) => PromptConstructor;
    /**
     * @deprecated
     */
    replaceAllDefaults: (inquirer: any) => void;
    fromAll: (inquirer: any) => void;
};
export default InterruptedPrompt;
