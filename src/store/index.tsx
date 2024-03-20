import {
  action,
  autorun,
  computed,
  makeObservable,
  observable,
  set,
  toJS,
} from "mobx"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import contacts from "../contacts/contacts_file.json"

interface Contact {
  name: string
  number: string
  email: string
  id: string
  photo: string
}

const generateData = (contactsJson: any): Contact[] => {
  return contactsJson.map((contact, index) => ({
    name: `${contact["First Name"]} ${contact["Last Name"]}`,
    number: contact["Home Phone"],
    email: contact["E-mail Address"],
    id: `${index}`,
    photo: `https://ui-avatars.com/api/?name=${contact["First Name"]}+${contact["Last Name"]}&length=1&background=random&size=262`,
  }))
}

const saveStore = (_this: any) => {
  const storedJson = localStorage.getItem("phonebookStore")
  if (storedJson) {
    set(_this, JSON.parse(storedJson))
  }

  autorun(() => {
    const value = toJS(_this)
    localStorage.setItem("phonebookStore", JSON.stringify(value))
  })
}

class Store {
  public contacts
  public filterString = ""

  constructor() {
    makeObservable(this, {
      contacts: observable,
      filterString: observable,
      addContact: action,
      removeContact: action,
      updateContact: action,
      updateFilter: action,
      filteredContacts: computed,
    })

    this.contacts = generateData(contacts)
    saveStore(this)
  }

  // addContact = ({ firstName, lastName, number, email }: { firstName: string; lastName: string; number: string; email: string }) => {
  //     const name = `${firstName} ${lastName}`;
  //     this.contacts.push({
  //         name,
  //         number,
  //         email,
  //         photo: `https://ui-avatars.com/api/?name=${name}&length=1&background=random&size=262`,
  //         id: `${this.contacts.length + 1}`,
  //     });
  //     toast.success("Contact added");
  // }         // THIS IMPLEMENTATION DID NOT WORK

  addContact = ({
    name,
    number,
    email,
  }: {
    name: string
    number: string
    email: string
  }) => {
    this.contacts.push({
      name,
      number,
      email,
      photo: `https://ui-avatars.com/api/?name=${name}&length=1&background=random&size=262`,
      id: `${this.contacts.length + 1}`,
    })
    toast.success("Contact added successfully!")
  }

  removeContact = (id: string) => {
    this.contacts = this.contacts.filter((e) => e.id !== id)
    toast.success("Contact deleted successfully!")
  }

  findContact = (id: string) => {
    return this.contacts.find((e) => e.id === id)
  }

  updateContact = (id: string, payload: Contact) => {
    // Finding index
    let index = this.contacts.findIndex((e) => e.id === id)
    this.contacts[index] = payload
    toast.success("Contact updated successfully")
  }

  updateFilter = (filter: string) => {
    this.filterString = filter
  }

  get filteredContacts() {
    // Escaping special characters to remove any unwanted errors
    const escapedFilterString = this.filterString.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    )

    let filtered = this.contacts.filter(
      (contact) =>
        contact.name.match(new RegExp(escapedFilterString, "i")) ||
        contact.number.match(new RegExp(escapedFilterString, "i")) ||
        contact.email.match(new RegExp(escapedFilterString, "i"))
    )

    // Sorting in descending sequence of id
    filtered = filtered.sort((a, b) => (Number(a.id) > Number(b.id) ? 1 : -1))

    return filtered
  }

  // Did not work somehow

  // get filteredContacts() {
  //     let filtered = this.contacts.filter(contact =>
  //       ['name', 'number', 'email'].some(field =>
  //         contact[field].match(new RegExp(this.filterString, "i"))
  //       )
  //     );

  //     filtered = filtered.sort((a, b) => (Number(a.id) < Number(b.id) ? 1 : -1));

  //     return filtered;
  // }

  // escapeRegExp(string) {
  //   return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  // }

  // get filteredContacts() {
  //   const escapedFilterString = this.escapeRegExp(this.filterString);

  //   let filtered = this.contacts.filter(
  //     (contact) =>
  //       contact.name.match(new RegExp(escapedFilterString, "i")) ||
  //       contact.number.match(new RegExp(escapedFilterString, "i")) ||
  //       contact.email.match(new RegExp(escapedFilterString, "i"))
  //   )

  //   // If you want to sort by increasing id, you should compare with a > b for a descending sort.
  //   filtered = filtered.sort((a, b) => (Number(a.id) > Number(b.id) ? 1 : -1));

  //   return filtered;
  // }

  // get filteredContacts() {
  //   let filtered = this.contacts.filter(
  //     (contact) =>
  //       contact.name.match(new RegExp(this.filterString, "i")) ||
  //       contact.number.match(new RegExp(this.filterString, "i")) ||
  //       contact.email.match(new RegExp(this.filterString, "i"))
  //   )

  //   filtered = filtered.sort((a, b) => (Number(a.id) < Number(b.id) ? 1 : -1))  // Sorting in the increasing sequence of id
  //   return filtered
  // }    // I got error in the regex expression here when I type '('

  get contactCount() {
    return this.contacts.length
  }
}

export default new Store()
