import { Check, Plus } from 'lucide-react';
import { useRef, useState } from 'react';

const Form = () => {

  const [uploaded, setuploaded] = useState(false);
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [title, setTitle] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [folderFiles, setFolderFiles] = useState([]);

  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFolderClick = () => {
    folderInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = [...e.target.files];


    const uniqueFiles = selectedFiles.filter(f => !isDuplicate(f, files));

    if (uniqueFiles.length > 0) {
      setuploaded(true);
      setFiles(prev => [...prev, ...uniqueFiles]);
    }
    else {
      alert("Files already added");
    }


    if (uniqueFiles.length === 1) {
      setTitle(uniqueFiles[0].name);
    } else {
      setTitle(`${uniqueFiles.length} files`);
    }

    uniqueFiles.forEach(f => console.log(f.name));

    e.target.value = null;
  };

  const handleFolderChange = (e) => {
    const selectedFiles = [...e.target.files];
    if (!selectedFiles.length) return;

    const folderName =
      selectedFiles[0].webkitRelativePath.split("/")[0];

    if (isFolderDuplicate(folderName, folders)) {
      alert("Folder already added");
      e.target.value = null;
      return;
    }

    const uniqueFolderFiles = selectedFiles.filter(
      f => !isDuplicate(f, folderFiles)
    );

    if (uniqueFolderFiles.length === 0) {
      alert("Folder files already added");
      e.target.value = null;
      return;
    }

    setuploaded(true);

    setFolderFiles(prev => [...prev, ...uniqueFolderFiles]);

    setFolders(prev => [
      ...prev,
      {
        name: folderName,
        count: uniqueFolderFiles.length,
        size: uniqueFolderFiles.reduce((a, f) => a + f.size, 0)
      }
    ]);

    setTitle(folderName);

    e.target.value = null;
  };


  const formatSize = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(1) + " " + sizes[i];
  };

  const fileExtension = (filename) => {
    const extension = filename.split('.').pop();
    return extension;
  }

  const isDuplicate = (file, existingFiles) =>
    existingFiles.some(
      f => f.name === file.name && f.size === file.size
    );

  const isFolderDuplicate = (folder, existingFolders) =>
    existingFolders.some(
      f => f.name === folder.name && f.size === folder.size && f.count === folder.count
    );


  const fileCount = files.length;
  const folderCount = folders.length;

  const totalItems = fileCount + folderCount;

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center ">

      <div className="bg-white w-[360px] rounded-2xl p-4 shadow-lg">

        <input type="file" multiple className='hidden' ref={fileInputRef} onChange={handleFileChange} />
        <input type="file" webkitdirectory="" directory="" className='hidden' ref={folderInputRef} onChange={handleFolderChange} />

        <form className="flex flex-col gap-4 text-sm">

          {!uploaded && (<div className="grid grid-cols-2 gap-1">
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
          )
          }

          {
            uploaded && (
              <div className=''>
                {files.map((f, i) => (
                  <div key={i} className="text-black text-sm bg-[#f1f1f1] p-2 rounded-lg mb-1 ">
                    {f.name}
                    <p className='text-gray-500'>{formatSize(f.size)}  </p>
                  </div>

                ))}

                {folders.map((f, i) => (
                  <div key={"folder" + i}
                    className="text-black text-sm bg-[#f1f1f1] p-2 rounded-lg mb-1">
                    {f.name}
                    <p className="text-gray-500">
                      Folder {f.count} item
                    </p>
                  </div>
                ))}


                <div className='bg-[#e0eaff] p-2 rounded-lg mb-1 flex items-center justify-between'>
                  <div className='flex gap-3 items-center justify-between '>
                    <div className='text-blue-500'>
                      <Check />
                    </div>
                    <div className='text-blue-500 font-medium'>
                      {totalItems} {totalItems > 1 ? "items" : "item"} added
                    </div>

                  </div>

                  <div className="relative flex items-center">

                    <div
                      className="text-blue-500 font-semibold text-sm cursor-pointer"
                      onClick={() => setShowMenu(prev => !prev)}
                    >
                      Add more
                    </div>

                    <button
                      className="bg-blue-500 rounded-full p-2 text-white ml-2"
                      type="button"
                      onClick={() => setShowMenu(prev => !prev)}
                    >
                      <Plus size={10} />
                    </button>

                    {showMenu && (
                      <div className="absolute right-0 top-8 bg-white shadow-lg rounded-xl  text-sm overflow-hidden z-50">

                        <div
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            handleFileClick();
                            setShowMenu(false);
                          }}
                        >
                          Files
                        </div>

                        <div
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            handleFolderClick();
                            setShowMenu(false);
                          }}
                        >
                          Folders
                        </div>

                      </div>
                    )}
                  </div>

                </div>
              </div>


            )
          }

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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
