import {toast} from "react-toastify";

export default function ToastMessage(message: string, type: string) {

    // const options = {
    //     type: toast.TYPE.type,
    //     position: toast.POSITION.BOTTOM_LEFT,
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    // };
    // toast(message, options)
    if (type === "error")
        toast.error(message, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    else if (type === "success")
        toast.success(message, {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    else if (type === "info")
        toast.info(message, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

}