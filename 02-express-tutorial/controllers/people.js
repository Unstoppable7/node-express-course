let { people } = require("../data");

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const addPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide a name" });
  }
  people.push({ id: people.length + 1, name: name });
  res.status(201).json({ success: true, name: name});
};

const getPerson = (req, res) => {
  const { id } = req.params;

  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `Person with id ${id} not found` });
  }
  res.status(200).json({ success: true, person: person });
};

const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `Person with id ${id} not found` });
  }
  person.name = name;
  res
    .status(200)
    .json({ success: true, msg: `Person with id ${id} had been updated` });
};

const deletePerson = (req, res) => {
  const { id } = req.params;
  const person = people.find((person) => person.id === Number(id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `Person with id ${id} not found` });
  }
  people = people.filter((person) => person.id !== Number(id));
  return res
    .status(200)
    .json({ success: true, msg: `Person with id ${id} had been deleted` });
};

module.exports = {
  getPeople,
  addPerson,
  getPerson,
  updatePerson,
  deletePerson
};
