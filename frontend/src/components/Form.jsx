import { Plus } from 'lucide-react';
import { useRef } from 'react';

const Form = () => {

  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const handleFileClick = () => {
    console.log("File picked");
    fileInputRef.current.click();
  }

  const handleFolderClick = () => {
    folderInputRef.current.click();
  }

  const handleFileChange = (e) => {
    const files = e.target.files;

    for (const file of files) {
      console.log(file.name);
    }

    e.target.value = null;
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center ">

      <div className="bg-white w-[360px] rounded-2xl p-4 shadow-lg">

        <input type="file" multiple className='hidden' ref={fileInputRef} onChange={handleFileChange} />
        <input type="file" webkitdirectory="true" directory="" className='hidden' ref={folderInputRef} onChange={handleFileChange} />

        <form className="flex flex-col gap-4 text-sm">

          <div className="grid grid-cols-2 gap-1">
            <div className=" bg-[#e0eaff] p-4 justify-center items-center flex rounded-xl">

              <div className='flex flex-col items-center gap-2 h-15'>
                <button className='bg-blue-500  rounded-full p-2 text-white'
                  type='button'
                  onClick={handleFileClick}>
                  <Plus />

                </button>
                <div>
                  add files
                </div>
              </div>

            </div>
            <div className="bg-[#e0eaff] p-4 justify-center items-center flex  rounded-xl">

              <div className='flex flex-col items-center gap-2 h-15'>
                <button className='bg-blue-500 rounded-full p-2 text-white '
                  type='button'
                  onClick={handleFolderClick}>
                  <Plus />

                </button>
                <div>
                  add folder
                </div>
              </div>
            </div>
          </div>

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
