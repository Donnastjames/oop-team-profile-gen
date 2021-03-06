// Packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');

const usedEmployeeNames = [];
const usedEmployeeIds = [];
const usedEmployeeEmails = [];
const usedGithubProfiles = [];

const validateEmployeeName = employeeName => {
  if (typeof employeeName !== "string" || !employeeName.trim()) {
    return `Expected 'employeeName' to contain valid characters, but was: "${employeeName}"`;
  }

  if (usedEmployeeNames.includes(employeeName.trim().toLowerCase())) {
    return `This name "${employeeName}" has already been used!`;
  }

  return true;
}

const validateEmployeeId = employeeId => {
  if (typeof employeeId !== "string" || !employeeId.trim()) {
    return `Expected 'employeeId' to contain valid characters, but was: "${employeeId}"`;
  }

  if (usedEmployeeIds.includes(employeeId.trim().toLowerCase())) {
    return `This employeeId="${employeeId}" has already been used!`;
  }

  return true;
}

// https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
const validEmailRegex = /^\S+@\S+\.\S+$/;

const validateEmployeeEmail = employeeEmail => {
  if (typeof employeeEmail !== "string" || !validEmailRegex.test(employeeEmail)) {
    return `Expected 'employeeEmail' to be a valid e-mail address, but was: "${employeeEmail}"`;
  }

  if (usedEmployeeEmails.includes(employeeEmail.toLowerCase())) {
    return `This e-mail address "${employeeEmail}" has already been used!`;
  }

  return true;
}

const validateManagerOfficeNumber = officeNumber => {
  if (typeof officeNumber !== "string" && typeof officeNumber !== "number") {
    return `Expected 'officeNumber' to contain characters or numbers, but was: "${officeNumber}"`;
  }

  if (typeof officeNumber === "string" && !officeNumber.trim()) {
    return `officeNumber is invalid: "${officeNumber}"`;
  }

  if (typeof officeNumber === "number" && officeNumber < 0) {
    return `officeNumber is invalid: ${officeNumber}`;
  }

  return true;
}

const validateEngineerGithub = engineerGithub => {
  if (typeof engineerGithub !== "string" || !engineerGithub.trim()) {
    return `Expected 'engineerGithub' profile to contain characters, but was: "${engineerGithub}"`;
  }

  if (usedGithubProfiles.includes(engineerGithub.trim().toLowerCase())) {
    return `This github profile "${engineerGithub}" has already been used!`;
  }

  return true;
}

const validateInternSchool = internSchool => {
  if (typeof internSchool !== "string" || !internSchool.trim()) {
    return `Expected 'internSchool' to contain characters, but was: "${internSchool}"`;
  }

  return true;
}

// Array of questions for user input
const managerQuestions = [
  {
    type: 'input',
    name: 'managerName',
    message: `What is the team manager's name:`,
    validate: validateEmployeeName,
  },
  {
    type: 'input',
    name: 'managerId',
    message: `What is the team manager's employee ID:`,
    validate: validateEmployeeId,
  },
  {
    type: 'input',
    name: 'managerEmail',
    message: `What is the team manager's email address:`,
    validate: validateEmployeeEmail,
  },
  {
    type: 'input',
    name: 'managerOfficeNumber',
    message: `What is the team manager's office number:`,
    validate: validateManagerOfficeNumber,
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
    validate: validateEmployeeName,
  },
  {
    type: 'input',
    name: 'engineerId',
    message: `What is the engineer's employee Id:`,
    validate: validateEmployeeId,
  },
  {
    type: 'input',
    name: 'engineerEmail',
    message: `What is the engineer's email address:`,
    validate: validateEmployeeEmail,
  },
  {
    type: 'input',
    name: 'engineerGithub',
    message: `What is the engineer's GitHub profile:`,
    validate: validateEngineerGithub,
  },
];

const internQuestions = [
  {
    type: 'input',
    name: 'internName',
    message: `What is the intern's name:`,
    validate: validateEmployeeName,
  },
  {
    type: 'input',
    name: 'internId',
    message: `What is the intern's employee Id:`,
    validate: validateEmployeeId,
  },
  {
    type: 'input',
    name: 'internEmail',
    message: `What is the intern's email address:`,
    validate: validateEmployeeEmail,
  },
  {
    type: 'input',
    name: 'internSchool',
    message: `What is the intern's school:`,
    validate: validateInternSchool,
  },
];

// Create a function to initialize app
const init = async () => {
  const engineerAnswers = [];
  const internAnswers = [];

  const managerAnswer = await inquirer.prompt(managerQuestions);
  usedEmployeeNames.push(managerAnswer.managerName.trim().toLowerCase());
  usedEmployeeIds.push(managerAnswer.managerId.trim().toLowerCase());
  usedEmployeeEmails.push(managerAnswer.managerEmail.toLowerCase());

  let loopAnswer;

  do {
    loopAnswer = await inquirer.prompt(loopQuestion);

    if (loopAnswer.whatToDoNext === 'Add Engineer') {
      const engineerAnswer = await inquirer.prompt(engineerQuestions);
      engineerAnswers.push(engineerAnswer);
      usedEmployeeNames.push(engineerAnswer.engineerName.trim().toLowerCase());
      usedEmployeeIds.push(engineerAnswer.engineerId.trim().toLowerCase());
      usedEmployeeEmails.push(engineerAnswer.engineerEmail.toLowerCase());
      const githubProfile = engineerAnswer.engineerGithub.trim();
      if (!githubProfile.includes('/')) {
        // If there's no '/', assume only the github profile name was supplied ...
        engineerAnswer.engineerGithub = `https://github.com/${githubProfile}`;
      }
      usedGithubProfiles.push(engineerAnswer.engineerGithub.trim().toLowerCase());

    } else if (loopAnswer.whatToDoNext === 'Add Intern') {
      const internAnswer = await inquirer.prompt(internQuestions);
      internAnswers.push(internAnswer);
      usedEmployeeNames.push(internAnswer.internName.trim().toLowerCase());
      usedEmployeeIds.push(internAnswer.internId.trim().toLowerCase());
      usedEmployeeEmails.push(internAnswer.internEmail.toLowerCase());
    }
  } while (loopAnswer.whatToDoNext !== 'Generate Team Profile');

  const officeManager = new Manager(
    managerAnswer.managerName,
    managerAnswer.managerId,
    managerAnswer.managerEmail,
    managerAnswer.managerOfficeNumber,
  );
  
  const engineers = engineerAnswers.map(answer => new Engineer(
    answer.engineerName,
    answer.engineerId,
    answer.engineerEmail,
    answer.engineerGithub,
  ));

  const interns = internAnswers.map(answer => new Intern(
    answer.internName,
    answer.internId,
    answer.internEmail,
    answer.internSchool,
  ));

  return {
    officeManager,
    engineers,
    interns,
  };
};

// Function to generate the Html

function generateEmployeeHtml(data) {
  const { officeManager, engineers, interns } = data;

  let engineerCards = '';

  for (let i = 0; i < engineers.length; i++) {
    const engineerCard = `
            <div class="card bg-light mb3" style="max-width: 18rem;">
              <div class="card-header lead border-bottom-0" style="background: lightblue">${engineers[i].name}</div>
              <div class="card-header" style="background: lightblue">Engineer</div>
              <div class="card-body">
                <p class="card-text">ID: ${engineers[i].id}</p>
                <p class="card-text">Email address: 
                <a href="mailto:${engineers[i].email}" alt="email address">${engineers[i].email}</a>
                </p>
                <p class="card-text">GitHub: 
                <a href="${engineers[i].github}" target="_blank" rel="noopener noreferrer" alt="github">${engineers[i].github}</a>
                </p>
              </div>
            </div>
            <br>
`
    engineerCards += engineerCard;
  }

  let internCards = '';

  for (let i = 0; i < interns.length; i ++) {
    const internCard = `
            <div class="card bg-light mb3" style="max-width: 18rem;">
              <div class="card-header lead border-bottom-0" style="background: lightblue">${interns[i].name}</div>
              <div class="card-header" style="background: lightblue">Intern</div>
              <div class="card-body">
                <p class="card-text">ID: ${interns[i].id}</p>
                <p class="card-text">Email address: 
                <a href="mailto:${interns[i].email}" alt="email address">${interns[i].email}</a>
                </p>
                <p class="card-text">School: ${interns[i].school}</p>
                <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
              </div>
            </div>
            <br>
`
    internCards += internCard;
  }

  const generatedHtml =
  `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="./style.css">
    <title>OOP_Team_Profile_Generator</title>
  </head>
  <body>
  
    <header class="row mb-2 bg-secondary text-white" style="height: 100px">
      <div class="container-sm text-center">
        <h1 style="margin-top: revert">My Team</h1>
      </div>
    </header>
  
    <main>
      <div class="container">
        <div class="card-deck">
          <div class="col mb-3">
            <div class="card bg-light mb3" style="max-width: 18rem;">
              <div class="card-header lead border-bottom-0" style="background: lightblue">${officeManager.name}</div>
              <div class="card-header" style="background: lightblue">Manager</div>
              <div class="card-body">
                <p class="card-text">ID: ${officeManager.id}</p>
                <p class="card-text">Email address: 
                <a href="mailto:${officeManager.email}" alt="email address">${officeManager.email}</a>
                </p>
                <p class="card-text">Office Number: ${officeManager.officeNumber}</p>
                <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
              </div>
            </div>
          </div>
        
          <div class="col mb-3">
            ${engineerCards}
          </div>
  
          <div class="col mb-3">
            ${internCards}
          </div>
  
        </div>
      </div>
    </main>
        
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.1/umd/popper.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/js/bootstrap.min.js"></script>
    
  </body>
  </html>
  `;

  return generatedHtml;
}

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, err =>
      err ? console.error(err) : console.log(`Successfully created "${fileName}"`)
    );
}

// Function to initialize app
init()
  .then(data => writeToFile('./dist/index.html', generateEmployeeHtml(data)))
  .catch(err => console.error(err));
