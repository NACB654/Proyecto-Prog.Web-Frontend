import React, { useRef } from 'react';

const FileInput = ({onFileSelect}) => {
  const fileInputRef = useRef(null);

  const handleFileInputChange = () => {
    const selectedFile = fileInputRef.current.files[0];

    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleFileInputChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <button onClick={() => fileInputRef.current.click()}>Seleccionar archivo</button>
    </div>
  );
};

export default FileInput;