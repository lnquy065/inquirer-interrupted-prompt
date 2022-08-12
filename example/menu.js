import inquirer from 'inquirer';
import InterruptedPrompt from '../index.js';

InterruptedPrompt.replaceAllDefaults(inquirer);

main();

async function main() {
    while (true) {
        console.clear();
        try {
            const answer = await renderMainMenu()
            switch (answer.mainMenu) {
                case 'search':
                    await inquirer.prompt([{
                        type: 'input',
                        name: 'searchFileName',
                        message: 'Input file name'
                    }])
                    break
                case 'create':
                    await inquirer.prompt([{
                        type: 'input',
                        name: 'createFileName',
                        message: 'Input new file name'
                    }])
                    break
                case 'edit':
                    await inquirer.prompt([{
                        type: 'input',
                        name: 'editFileName',
                        message: 'Input edit file name'
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
                short: 'Search - Press <Esc> to back to main menu!'
            },
            {
                value: 'create',
                name: 'Create new file',
                short: 'Create - Press <Esc> to back to main menu!'
            },
            {
                value: 'edit',
                name: 'Edit file',
                short: 'Edit - Press <Esc> to back to main menu!'
            }
            ]
        }
    ])
}
