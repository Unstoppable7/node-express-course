const fullName = require("./04-names");
const printPersonalInformation = require("./05-utils");
const data = require("./06-alternative-flavor");


let people = [];
people.push(fullName);
people.push(data.person);
people.push(data.anotherPerson);

printPersonalInformation(people);

require("./07-mind-grenade");
