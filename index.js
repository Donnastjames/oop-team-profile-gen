// Packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
// const generateEmployeeHtml = require('./src/generateEmployeeHtml');

// Array of questions for user input
const managerQuestions = [
  {
    type: 'input',
    name: 'managerName',
    message: `What is the team manager's name:`,
  },
  {
    type: 'input',
    name: 'managerEmployeeId',
    message: `What is the team manager's employee ID:`,
  },
  {
    type: 'input',
    name: 'managerEmailAddress',
    message: `What is the team manager's email address:`,
  },
  {
    type: 'input',
    name: 'managerOfficeNumber',
    message: `What is the team manager's office number:`,
  },
];

const loopQuestion = [
  {
    type: 'list',
    name: 'whatToDoNext',
    message: 'What would you like to do next?',
    choices: ['Add Engineer', 'Add Intern', 'Generate Team Profile'],
  }
];

const engineerQuestions = [
  {
    type: 'input',
    name: 'engineerName',
    message: `What is the engineer's name:`,
  },
  {
    type: 'input',
    name: 'engineerId',
    message: `What is the engineer's employee Id:`,
  },
  {
    type: 'input',
    name: 'engineerEmail',
    message: `What is the engineer's email address:`,
  },
  {
    type: 'input',
    name: 'engineerGithub',
    message: `What is the engineer's GitHub username:`,
  },
];

const internQuestions = [
  {
    type: 'input',
    name: 'internName',
    message: `What is the intern's name:`,
  },
  {
    type: 'input',
    name: 'internId',
    message: `What is the intern's employee Id:`,
  },
  {
    type: 'input',
    name: 'internEmail',
    message: `What is the intern's email address:`,
  },
  {
    type: 'input',
    name: 'internSchool',
    message: `What is the intern's school:`,
  },
];

// Create a function to write the Html file
function writeToFile(fileName, data) {
  fs.writeToFile(fileName, data, err =>
    err ? console.error(err) : console.log(`Successfully created "${filename}"`)
  );
}

// Create a function to initialize app
const init = async () => {
  const engineerAnswers = [];
  const internAnswers = [];

  const managerAnswer = await inquirer.prompt(managerQuestions);
  console.log('initialAnswer:', JSON.stringify(managerAnswer, null, 2));
  let loopAnswer;

  do {
    loopAnswer = await inquirer.prompt(loopQuestion);
    console.log('loopAnswer:', JSON.stringify(loopAnswer, null, 2));

    if (loopAnswer.whatToDoNext === 'Add Engineer') {
      const engineerAnswer = await inquirer.prompt(engineerQuestions);
      console.log('engineerAnswer:', JSON.stringify(engineerAnswer, null, 2));
      engineerAnswers.push(engineerAnswer);
      
    } else if (loopAnswer.whatToDoNext === 'Add Intern') {
      const internAnswer = await inquirer.prompt(internQuestions);
      console.log('internAnswer:', JSON.stringify(internAnswer, null, 2));
      internAnswers.push(internAnswer);
    }
  } while (loopAnswer.whatToDoNext !== 'Generate Team Profile');

  console.log('Ready to Generate Team Profile!');
  console.log('managerAnswer:\n', JSON.stringify(managerAnswer, null, 2));
  console.log('engineerAnswers:\n', JSON.stringify(engineerAnswers, null, 2));
  console.log('internAnswers:\n', JSON.stringify(internAnswers, null, 2));

  // promptUser()
  //   .then(data => writeToFile(data.fileName, generateEmployeeHtml(data)))
  //   .catch((err) => console.error(err));
};

// Function to initialize app
init()
  .then(() => console.log('All done!'))
  .catch(err => console.error(`We had an Error: "${err}"`));