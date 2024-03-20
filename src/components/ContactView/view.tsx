import { useParams } from "react-router-dom"
import { MdOutlinePhone, MdOutlineEmail } from "react-icons/md"
import store from "../../store"

interface Props {}

const View = (props: Props) => {
  const params = useParams()
  const contact = store.findContact(params.id!)

  return (
    <div className="border p-4 flex flex-col gap-4 max-w-[520px] rounded-xl px-8 pt-10 md:pt-4">
      <h2 className="font-medium">Contact Details</h2>
      <div className="flex gap-1 items-center">
        <MdOutlinePhone className="opacity-[0.36]" size={24} />
        <a href={`tel:${contact?.number}`} className="text-blue-500">
          {contact?.number}
        </a>
      </div>
      <div className="flex gap-1 items-center">
        <MdOutlineEmail className="opacity-[0.36]" size={24} />
        <a href={`mailto:${contact?.email}`} className="text-blue-500">
          {contact?.email}
        </a>
      </div>
    </div>
  )
}

export default View
