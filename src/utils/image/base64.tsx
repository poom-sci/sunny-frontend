import imageCompression from "browser-image-compression";

const compressOptions = {
  // maxSizeMB: 1,
  maxWidthOrHeight: 2048,
  useWebWorker: true,
  initialQuality: 0.9
};

const encodeImages = async (files: File[]) => {
  const promises = files.map(async (file) => {
    const compressedFile = await imageCompression(file, compressOptions);

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(compressedFile);
    });
  });

  const encodedFiles = await Promise.all(promises);
  return encodedFiles;
};

const removeFileType = async (files: string[]) => {
  const removedFile: string[] = files.map((img: string) => {
    return img.replace(/^data:image\/[a-z]+;base64,/, "");
  });

  return removedFile;
};

export { encodeImages, removeFileType };
