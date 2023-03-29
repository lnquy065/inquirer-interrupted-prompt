import inquirer from 'inquirer';
import InterruptedPrompt from 'inquirer-interrupted-prompt';
import inquirerFileTreeSelection from 'inquirer-file-tree-selection-prompt';
inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection)

InterruptedPrompt.fromAll(inquirer);



main();

async function main() {
    let answer = null
    while (answer !== 'exit') {
        console.clear();
        try {
            const menuResponse = await renderMainMenu()
            answer = menuResponse.mainMenu
            switch (answer) {
                case 'search':
                    await inquirer.prompt([{
                        type: 'input',
                        name: 'searchFileName',
                        message: 'Input file name',
                        interruptedKeyName: 'meta+f'
                    }])
                    break
                case 'create':
                    await inquirer.prompt([{
                        type: 'input',
                        name: 'createFileName',
                        message: 'Input new file name',
                        interruptedKeyName: 'shift+f'

                    }])
                    break
                case 'edit':
                    await inquirer.prompt([{
                        type: 'input',
                        name: 'editFileName',
                        message: 'Input edit file name',
                        interruptedKeyName: 'f'
                    }])
                    break
            }

        } catch (e) {

        }
    }
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
    ])
}
