var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from 'inquirer';
import InterruptedPrompt from 'inquirer-interrupted-prompt';
import inquirerFileTreeSelection from 'inquirer-file-tree-selection-prompt';
InterruptedPrompt.fromAll(inquirer);
const treeSelection = InterruptedPrompt.from(inquirerFileTreeSelection);
inquirer.registerPrompt('file-tree-selection', treeSelection);
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let answer = null;
        while (answer !== 'exit') {
            // console.clear();
            try {
                const menuResponse = yield renderMainMenu();
                answer = menuResponse.mainMenu;
                switch (answer) {
                    case 'search':
                        yield inquirer.prompt([{
                                type: 'input',
                                name: 'searchFileName',
                                message: 'Input file name',
                                interruptedKeyName: 'meta+f'
                            }]);
                        break;
                    case 'create':
                        yield inquirer.prompt([{
                                type: 'input',
                                name: 'createFileName',
                                message: 'Input new file name',
                                interruptedKeyName: 'shift+f'
                            }]);
                        break;
                    case 'edit':
                        yield inquirer.prompt([{
                                type: 'input',
                                name: 'editFileName',
                                message: 'Input edit file name',
                                interruptedKeyName: 'f'
                            }]);
                        break;
                }
            }
            catch (e) {
                console.log(e);
            }
        }
    });
}
function renderMainMenu() {
    console.log('=== File browser ===');
    return inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'Choose action',
            choices: [{
                    value: 'search',
                    name: 'Search file',
                    short: 'Search - Press <Alt + F> to back to main menu!'
                },
                {
                    value: 'create',
                    name: 'Create new file',
                    short: 'Create - Press <Shift + F> to back to main menu!'
                },
                {
                    value: 'edit',
                    name: 'Edit file',
                    short: 'Edit - Press <F> to back to main menu!'
                },
                {
                    value: 'exit',
                    name: 'Exit',
                }
            ]
        }
    ]);
}
//# sourceMappingURL=index.js.map