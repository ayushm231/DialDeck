import { observer } from "mobx-react"
import store from "../../store"
import ContactCard from "./card"

interface Props {}

const tableHeaders = [
  { key: "name", label: "Name" },
  { key: "phoneNumber", label: "Phone Number" },
  { key: "emailAddress", label: "Email Address" },
]

const ContactsList = (props: Props) => {
  return (
    <div className="relative px-4 pt-10 md:pt-4">
      <table className="w-full border-separate">
        <thead className="sticky top-16 z-10 bg-white border-b">
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header.key}
                className="w-1/3 text-left font-normal py-5 border-b px-4"
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <div className="my-2 mt-4">
          <p className="uppercase text-xs font-medium opacity-[0.56] px-4">
            Contacts ({store.contactCount})
          </p>
        </div>
        <tbody>
          {store.filteredContacts.map((contact) => (
            <ContactCard
              id={contact.id}
              name={contact.name}
              number={contact.number}
              email={contact.email}
              photo={contact.photo}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default observer(ContactsList)
