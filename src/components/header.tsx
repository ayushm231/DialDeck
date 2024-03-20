import { Link, useLocation, useNavigate } from "react-router-dom"
import { TiContacts } from "react-icons/ti"
import { AiOutlineUserAdd } from "react-icons/ai"
import SearchBar from "./search"
import { useEffect, useState } from "react"

interface Props {}

const Header = (props: Props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isButtonDisabled, setButtonDisabled] = useState(false)

  const createContact = () => {
    setButtonDisabled(true)
    setIsDropdownOpen(!isDropdownOpen)
    navigate("/add") // Navigating to the add contact page
  }
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
    console.log(isDropdownOpen)
  }

  useEffect(() => {
    // When the location changes to'/add', disbaling the button
    const disableButton = location.pathname === "/add"
    localStorage.setItem("isCreatingContact", String(disableButton))
    setButtonDisabled(disableButton)
  }, [location])

  //   useEffect(() => {
  //     const checkContactFlag = () => {
  //       const isCreatingContact = localStorage.getItem("isCreatingContact")
  //       console.log("Flag : ", isCreatingContact)
  //       setButtonDisabled(isCreatingContact === "true")
  //     }

  //     checkContactFlag()
  //     window.addEventListener("storage", checkContactFlag)
  //     return () => {
  //       window.removeEventListener("storage", checkContactFlag)
  //     }
  //   }, [])

  //   useEffect(() => {
  //     // Enabling button when navigating to home
  //     if (location.pathname === '/') {
  //       localStorage.setItem("isCreatingContact", "false"); // Setting flag to false when home is visited
  //       setButtonDisabled(false);
  //     }
  //   }, [location]);

  return (
    <header className="fixed w-full bg-gray-100 z-20 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center px-4 py-3 justify-between max-w-[1440px] m-auto">
        <Link to={"/"} className="flex px-8 py-3 items-center gap-3">
          {/* <Icon icon="streamline:phone-contact-phonebook-phonebook-phone-number-books-book" /> */}
          <TiContacts size="24" />
          <span className="text-gray-900 text-xl">DialDeck</span>
        </Link>
        <SearchBar />
        <div className="sm:hidden fixed top-3 right-1">
          <button
            onClick={createContact}
            disabled={isButtonDisabled}
            className={`p-3 rounded-full bg-gray-100 shadow-lg ${
              isButtonDisabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-md"
            } focus:outline-none focus:ring focus:ring-opacity-50`}
          >
            <AiOutlineUserAdd size="24" />
          </button>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            className={`btn m-1 items-center hidden md:flex px-4 py-2 border rounded-full shadow-sm ${
              isButtonDisabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow"
            } focus:outline-none focus:ring focus:ring-opacity-50`}
            onClick={toggleDropdown}
          >
            <AiOutlineUserAdd size="24" />
            <span className="font-medium text-sm lg:text-base hidden sm:block px-1.5">
              Create contact
            </span>
          </div>
          <ul
            tabIndex={0}
            className={`dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ${
              isDropdownOpen ? "block" : "hidden"
            }`}
          >
            <li>
              <a>Import from file</a>
            </li>
            <li>
              <a onClick={createContact}>Add new contact</a>
            </li>
          </ul>
        </div>
        {/* <button
          onClick={handleClick}
          disabled={isButtonDisabled}
          className={`items-center hidden md:flex px-4 py-2 border rounded-full shadow-sm ${
            isButtonDisabled ? "opacity-50 cursor-not-allowed" : "hover:shadow"
          } focus:outline-none focus:ring focus:ring-opacity-50`}
        >
          <AiOutlineUserAdd size="24" />
          <span className="font-medium text-sm lg:text-base hidden sm:block px-1.5">
            Create contact
          </span>
        </button> */}
      </div>
    </header>
  )
}

export default Header
