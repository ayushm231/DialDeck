import { observer } from "mobx-react"
import { useLocation } from "react-router-dom"
import { MdClose, MdOutlineSearch } from "react-icons/md"
import store from "../store"

interface Props {}

const SearchBar = (props: Props) => {
  const location = useLocation()

  // Determining if the search bar should be enabled based on the current pathname
  const isSearchBarEnabled = location.pathname === "/"
  const searchBarBaseClass = "flex items-center rounded-lg px-5 gap-3 relative right-4"
  const searchBarEnabledClass =
    "bg-gray-100 focus-within:bg-white focus-within:shadow-md transition-all duration-500 ease-in-out"
  const searchBarDisabledClass = "opacity-50 cursor-not-allowed"

  const searchBarClass = `${searchBarBaseClass} ${
    isSearchBarEnabled ? searchBarEnabledClass : searchBarDisabledClass
  }`

  return (
    <div className="px-8">
      <form onSubmit={(e) => e.preventDefault()} className={searchBarClass}>
        <MdOutlineSearch className="shrink-0" color="#5f6368" size={22} />
        <input
          value={store.filterString}
          onChange={(e) => store.updateFilter(e.target.value)}
          className={`bg-transparent py-2 text-lg focus:outline-none ${
            !isSearchBarEnabled ? "cursor-not-allowed" : ""
          }`}
          placeholder="Search"
          disabled={!isSearchBarEnabled}
        />

        <button
          type="reset"
          disabled={!isSearchBarEnabled || store.filterString === ""}
          onClick={() => store.updateFilter("")}
        >
          <MdClose
            className={`shrink-0 absolute top-0 right-6 h-full ${
              !isSearchBarEnabled || store.filterString === "" ? "hidden" : ""
            }`}
            color="#5f6368"
            size={22}
          />
        </button>
      </form>
    </div>
  )
}

export default observer(SearchBar)
