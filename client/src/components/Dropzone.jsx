import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';

const Dropzone = ({ onDrop, accept, multiple, title = "Select PDF files" }) => {
  const onDropCallback = useCallback((acceptedFiles) => {
    onDrop(acceptedFiles);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept,
    multiple
  });

  return (
    <div 
      {...getRootProps()} 
      className={`border-4 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors duration-200 ${
        isDragActive ? 'border-primary bg-red-50' : 'border-gray-300 hover:border-gray-400 bg-white'
      }`}
    >
      <input {...getInputProps()} />
      <UploadCloud className={`mx-auto h-20 w-20 mb-6 ${isDragActive ? 'text-primary' : 'text-gray-400'}`} />
      
      {isDragActive ? (
        <p className="text-2xl font-bold text-primary">Drop the files here ...</p>
      ) : (
        <>
          <p className="text-3xl font-bold text-gray-800 mb-4">{title}</p>
          <p className="text-xl text-gray-500 mb-6">or drop files here</p>
          <button className="bg-primary text-white text-lg font-bold py-4 px-10 rounded-full hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl">
            {title}
          </button>
        </>
      )}
    </div>
  );
};

export default Dropzone;
