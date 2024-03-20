import { observer } from "mobx-react"
import { useNavigate, useParams } from "react-router-dom"
import { MdOutlinePhone, MdPersonOutline, MdOutlineEmail } from "react-icons/md"
import { useState } from "react"
import { toast } from "react-toastify"
import store from "../../store"

interface Props {}

const Edit = (props: Props) => {
  const params = useParams()
  const navigate = useNavigate()
  const contact = store.findContact(params.id!)
  const [name, setName] = useState(contact!.name)
  const [number, setNumber] = useState(contact!.number)
  const [email, setEmail] = useState(contact!.email)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = () => {
    console.log("Inside the method")
    if (!name.trim()) {
      console.log("Name : ", name)
      setErrorMessage("Name is required")
      toast.error("Name is required", {
        position: "top-center",
        autoClose: 1500,
        theme: "dark",
      })
      return
    }

    // Checking if both number and email are missing
    if (!number.trim() && !email.trim()) {
      console.log("Number : ", number)
      console.log("Email : ", email)
      setErrorMessage("Number/Email is required")
      toast.error("Either number or email is required", {
        position: "top-center",
        autoClose: 1500,
        theme: "dark",
      })
      return
    }
    store.updateContact(contact!.id, {
      name,
      number,
      email,
      id: contact!.id,
      photo: contact!.photo,
    })
    setTimeout(() => {
      navigate("/")
    }, 1000) // 1 second delay
  }

  return (
    <div className="px-8 pt-10 md:pt-4">
      <form
        className="max-w-[520px]"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <div className="flex gap-4 my-8 w-full items-center">
          <MdPersonOutline size={28} className="opacity-[0.56]" />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-b w-full focus:outline-none leading-8"
            placeholder="Name"
          />
        </div>

        <div className="flex gap-4 my-8 w-full items-center">
          <MdOutlinePhone size={28} className="opacity-[0.56]" />
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="border-b w-full focus:outline-none leading-8"
            placeholder="Phone Number"
          />
        </div>

        <div className="flex gap-4 my-8 w-full items-center">
          <MdOutlineEmail size={28} className="opacity-[0.56]" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b w-full focus:outline-none leading-8"
            placeholder="Email Address"
          />
        </div>

        <div className="">
          <button
            type="submit"
            disabled={
              name === contact?.name &&
              number === contact?.number &&
              email === contact?.email
            }
            className="h-10 bg-blue-500 text-white px-8 rounded disabled:grayscale"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default observer(Edit)
