const manager = require("./lib/manager");
const intern = require("./lib/intern");
const engineer = require("./lib/engineer");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const outputDist = path.resolve(__dirname, "dist");
const outputHtml = path.join(outputDist, "output.html");

const render = require('./lib/htmlRen');

const member = [];

function start() {
    managerPrompt()
}
// questions prompt for the manager position 
function managerPrompt() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message:"manager's name?",
            },

            {
                type: "input",
                name: "officeNumber",
                message: "manager's office number:",
            },

            {
                type: "input",
                name: "id",
                message: "manager's id number:",
            },

            {
                type: "input",
                name: "email",
                message: "manager's email address:",
            },
        ])

        .then((val) => {
            const Manager = new manager(
              val.name,
              val.id,
              val.email,
              val.officeNumber
            );
            console.table(Manager);
            member.push(Manager);
            addMember();
          });
}
// question prompt for the engineer position 
function engineerPrompt() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "engineer's name?",
        },
        {
          type: "input",
          name: "email",
          message: "engineer's email address:",
        },
        {
          type: "input",
          name: "id",
          message: "engineer's id number:",
        },
        {
          type: "input",
          name: "github",
          message: "engineer's gitHub username?",
        },
      ])
      // returns a promise 
      .then((val) => {
        const Engineer = new engineer(val.name, val.id, val.email, val.github);
        console.table(Engineer);
        member.push(Engineer);
        addMember();
      });
}
// prompt asking to add an engineer or intern 
// the type: allows you to use the arrow keys to pick an option 
function addMember() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "addMem",
          message: "Add an engineer or intern?",
          choices: ["engineer", "intern", "no"],
        },
      ])
      .then((val) => {
        if (val.addMem === "engineer") {
          engineerPrompt();
        } else if (val.addMem === "intern") {
          internPrompt();
        } else {
          makeHtmlFile();
        }
      });
}

// questions for intern prompt 
function internPrompt() {
    inquirer
      .prompt([

        {
            type: "input",
            name: "id",
            message: "intern's id number:",
        },
        {
          type: "input",
          name: "name",
          message: "intern's name?",
        },
        {
          type: "input",
          name: "email",
          message: "intern's email address:",
        },
        {
          type: "input",
          name: "school",
          message: "intern's past/current school?",
        },
      ])
      // returns a promise
      .then((val) => {
        const Intern = new intern(val.name, val.id, val.email, val.school);
        console.table(Intern)
        member.push(Intern);
        addMember();
      });
 }

 function makeHtmlFile() {
    if (!fs.existsSync(outputDist)) {
      fs.mkdirSync(outputDist);
    } else {
  
      fs.writeFileSync(outputHtml, render(member), "UTF-8");
      console.log("File is ready! Go to 'output.html' ");
    }
    
}
  

 start();