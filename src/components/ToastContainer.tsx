import dynamic from "next/dynamic";

const ToastContainer = dynamic(() =>
  import("react-toastify").then((mod) => mod.ToastContainer)
);

export default function Toaster() {
  return (
    <ToastContainer
      bodyClassName={"font-IBMPlexSanThai"}
      position="bottom-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
