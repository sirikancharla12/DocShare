const Form = () => {
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center ">
      
      <div className="bg-white w-[360px] rounded-2xl p-4 shadow-lg">

        <form className="flex flex-col gap-4 text-sm">

          <div className="flex flex-col border-b border-gray-300 pb-2">
            <label className="text-gray-500">Your email</label>
            <input
              type="text"
              defaultValue="sirikancharla1290@gmail.com"
              className="bg-transparent outline-none text-gray-800"
            />
          </div>

          <div className="flex flex-col border-b border-gray-300 pb-2">
            <label className="text-gray-500">Title</label>
            <input
              type="text"
              className="bg-transparent outline-none text-gray-800"
            />
          </div>

          <div className="flex flex-col border-b border-gray-300 pb-2">
            <label className="text-gray-500">Message</label>
            <input
              type="text"
              className="bg-transparent outline-none text-gray-800"
            />
          </div>

          <div className="flex items-center justify-between ">
            <select
              type="button"
              className="border border-gray-300 rounded-lg px-4 py-2 text-blue-600 font-medium shadow-sm"
            >
              <option value="">1 day</option>
              <option value="">3 days</option>
              <option value="">7 days</option>
              <option value="">30 days</option>
              <option value="">60 days</option>
              <option value="">1 year</option>
              <option value="">Keep forever</option>
           
            </select>

            <button
              type="button"
              className="border border-gray-300  rounded-lg px-4 py-2 shadow-sm"
            >
              ⋯
            </button>
          </div>

          <button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Get a link
          </button>

        </form>
      </div>
    </div>
  );
};

export default Form;
