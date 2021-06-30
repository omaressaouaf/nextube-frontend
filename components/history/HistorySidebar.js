import { useDispatch, useSelector } from "react-redux";
import { deleteAllHistories } from "../../store/actions/historiesActions";
import Button from "../base/Button";
import { useRouter } from "next/router";
import { useState } from "react";
import { fireConfirm } from "../../global/helpers";

const HistorySidebar = () => {
  // redux
  const [historiesPerDay, deleteLoading] = useSelector(state => [
    state.historiesReducer.historiesPerDay,
    state.uiReducer.loadings.HistorySidebarDelete,
  ]);
  const dispatch = useDispatch();

  const handleDeleteAll = () => {
    fireConfirm(() => {
      dispatch(deleteAllHistories());
    })
  };

  const router = useRouter();
  const [query, setQuery] = useState("");
  const handleSearch = e => {
    e.preventDefault();
    router.push({ pathname: "/history", query: { query } });
  };

  return (
    <div className="bg-gray-200 dark:bg-black px-10 py-6 -mt-20 -mr-16 w-full md:min-h-screen md:fixed">
      <div className="relative text-gray-600">
        <form onSubmit={handleSearch}>
          <span className="absolute inset-y-0 left-0 flex items-center">
            <button type="submit" className="p-1 focus:outline-none">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </span>
          <input
            onChange={e => setQuery(e.target.value)}
            value={query}
            type="text"
            placeholder="Search Watch History"
            className="py-5 pl-10 pr-5  w-56 md:w-80 border-b border-gray-500 dark:border-darkGray focus:outline-none focus:border-blue-400 dark:focus:border-blue-400 placeholder-opacity-5 dark:text-gray-200 bg-transparent"
          />
        </form>
      </div>
      {historiesPerDay.length > 0 && (
        <div className="mt-10 px-3">
          <Button onClick={handleDeleteAll} disabled={deleteLoading} className="btn-red">
            {deleteLoading ? (
              <i className="fa fa-spinner fa-spin mr-2"></i>
            ) : (
              <i className="fa fa-trash mr-2"></i>
            )}
            <span className="font-semibold">Delete All Watch History</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default HistorySidebar;
