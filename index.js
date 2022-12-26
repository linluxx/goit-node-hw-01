const {
  addContact,
  removeContact,
  listContacts,
  getContactById,
} = require("./contacts");
const { Command } = require("commander");
const program = new Command();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log("invoke list");
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const current = await getContactById(id);
      console.log(current);
      break;

    case "add":
      await addContact(name, email, phone);
      const newContactsList = await listContacts();
      console.log(
        `Contact : ${name}, ${email}, ${phone} was successfully added`
      );
      console.table(newContactsList);
      break;

    case "remove":
      await removeContact(id);
      console.log(`Contact with id ${id} was removed`);

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);
