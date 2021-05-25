// Packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateEmployeeHtml = require('./src/generateEmployeeHtml');

// Array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'managerName',
    message: `What is your team manager's name:`,
  },
  {
    type: 'input',
    name: 'managerEmployeeId',
    message: `What is your team manager's employee ID:`,
  },
  {
    type: 'input',
    name: 'managerEmailAddress',
    message: `What is your manager's email address:`,
  },
  {
    type: 'input',
    name: 'managerOfficeNumber',
    message: `What is your manager's office number:`,
  },
  {
    type: 'checkbox',
    name: 'employeeType',
    message: 'Please select the type of employee you would like to add:',
    choices: ['engineer', 'intern'],
  },
  {
    type: 'iput',
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
  {
    type: 'iput',
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

const promptUser = () => {
  return inquirer.prompt(questions);
};

// Create a function to initialize app
const init = () => {
  promptUser()
    .then(data => writeToFile(data.fileName, generateEmployeeHtml(data)))
    .catch((err) => console.error(err));
};

// Function to initialize app
init();