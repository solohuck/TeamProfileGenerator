const manager = require("./lib/manager");
const intern = require("./lib/intern");
const engineer = require("./lib/engineer");
const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");

const outputHtml = path.join(outputDist, "output.html");
const outputDist = path.resolve(__dirname, "dist");

const render = require('./lib/htmlRen');

const member = [];

function start() {
    managerQuery()
}

function managerQuery() {
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

function engineerQuery() {
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
      .then((val) => {
        const Engineer = new engineer(val.name, val.id, val.email, val.github);
        console.table(Engineer);
        member.push(Engineer);
        addMember();
      });
}

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
          engineerQuery();
        } else if (val.addMem === "intern") {
          internQuery();
        } else {
          createFile();
        }
      });
}


function internQuery() {
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
      .then((val) => {
        const Intern = new intern(val.name, val.id, val.email, val.school);
        console.table(Intern)
        member.push(Intern);
        addMember();
      });
 }

 function createFile() {
    if (!fs.existsSync(outputDist)) {
      fs.mkdirSync(outputDist);
    } else {
  
      fs.writeFileSync(outputHtml, render(Member), "UTF-8");
      console.log("File created in the output folder");
    }
    
}
  

 start();