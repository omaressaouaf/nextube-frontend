import useSearch from "../../hooks/useSearch";

const VideoSearchForm = () => {


  const { handleSearch, query, setQuery } = useSearch("/videos/search");
  return (
    <form onSubmit={handleSearch} className="hidden md:flex">
      <input
        onChange={e => setQuery(e.target.value)}
        value={query}
        type="text"
        placeholder="Search"
        className="border border-gray dark:bg-lightBlack dark:border-darkGray py-2 px-4 w-80 ml-8 xl:ml-0 xl:w-128 focus:outline-none focus:ring-1 "
      />
      <button className="border-t border-r border-b border-0 border-gray dark:border-darkGray py-2 px-6 bg-gray-100 dark:bg-darkGray hover:bg-gray-200 focus:outline-none focus:ring-1 ">
        <i className="fa fa-search text-gray-500"></i>
      </button>
    </form>
  );
};

export default VideoSearchForm;
