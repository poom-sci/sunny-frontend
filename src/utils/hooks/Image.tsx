import { useState } from "react";

// Define the type for the selected files
type FileType = string; // or File if you are using actual File objects

const useFileSelection = (): [
  (file: FileType) => void,
  (file: FileType) => void,
  FileType[]
] => {
  // Initialize the state with an empty array of FileType
  const [selectedFiles, setSelectedFiles] = useState<FileType[]>([]);

  // Function to add a file
  const addFile = (file: FileType) => {
    setSelectedFiles((currentSelection) => [...currentSelection, file]);
  };

  // Function to remove a file
  const removeFile = (file: FileType) => {
    setSelectedFiles((currentSelection) => {
      const newSelection = currentSelection.slice();
      const fileIndex = currentSelection.indexOf(file);
      newSelection.splice(fileIndex, 1);
      return newSelection;
    });
  };

  return [addFile, removeFile, selectedFiles];
};

export default useFileSelection;
