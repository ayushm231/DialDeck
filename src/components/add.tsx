import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { IoMdArrowBack } from "react-icons/io"
import { MdOutlinePhone, MdPersonOutline, MdOutlineEmail } from "react-icons/md"
import store from "../store"

interface Props {}

const Add = (props: Props) => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const clearContactFlag = () => {
    localStorage.removeItem("isCreatingContact")
  }

  const handleBackClick = () => {
    console.log("Flag : ", localStorage.getItem("isCreatingContact"))
    clearContactFlag()
    console.log("Cleared from add")
    navigate(-1)
  }

  const handleSubmit = () => {
    console.log("Inside the method")
    if (!name.trim()) {
      console.log("Name : ", name)
      setErrorMessage("Name is required")
      return
    }

    // Check if both number and email are missing
    if (!number.trim() && !email.trim()) {
      console.log("Number : ", number)
      console.log("Email : ", email)
      setErrorMessage("Number/Email is required")
      return
    }

    store.addContact({ name, number, email })
    setName("")
    setNumber("")
    setEmail("")
    clearContactFlag()
    navigate("/")
  }

  return (
    <div className="px-8 pt-10 md:pt-4">
      <h1 className="mb-6 text-lg font-medium">Add New Contact</h1>
      <div className="flex justify-between flex-col sm:flex-row">
        <div className="flex gap-8 flex-col sm:flex-row">
          <div className="flex gap-8">
            <div className="pt-2">
              <button onClick={handleBackClick}>
                <IoMdArrowBack size={28} />
              </button>
            </div>
            <img
              className="rounded-full w-44 h-44"
              src={
                name
                  ? `https://ui-avatars.com/api/?name=${name[0]}&length=1&background=random&size=262`
                  : "https://ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
              }
            />
          </div>
        </div>
      </div>
      <hr className="my-8" />
      <div>
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
              placeholder="Phone number"
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
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <div>
            <button
              type="submit"
              disabled={!name.trim() || (!number.trim() && !email.trim())}
              className="h-10 bg-blue-500 text-white px-8 rounded disabled:grayscale"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Add
