function printPersonalInformation(people){
  for(let i = 0; i < people.length; i++){
    console.log(`Person #${i+1}`);
    console.log(`Name: ${people[i].name}`);
    console.log(`Last Name: ${people[i].lastName}\n`);
  }
}

module.exports = printPersonalInformation;