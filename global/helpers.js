import swal from "sweetalert2";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const formatDateAgo = date => {
  return dayjs(date).fromNow();
};

export const fireConfirm = callbackfn => {
  swal
    .fire({
      title: "Confirmation",
      text: "Are you sure",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3E7DE6",
      cancelButtonColor: "#FF0000",
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    })
    .then(result => {
      if (result.isConfirmed) {
        callbackfn();
      }
    });
};
export const fireAlert = (icon, title, text) => {
  swal.fire({
    icon,
    title,
    text,
    confirmButtonColor: "#3E7DE6",
  });
};
const toast = swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export const fireToast = (icon, title) => {
  toast.fire({ icon, title });
};

export const serializeServerError = err => {
  return {
    response: { status: err.response.status, data: { message: err.response.data.message } },
  };
};

export const saveToLocalStorage = (key, val) => {
  try {
    localStorage.setItem(key, val);
  } catch (err) {
    fireAlert("info", "Please enable local storage");
  }
};

export const getFromLocalStorage = key => {
  try {
    const val = localStorage.getItem(key);
    return val === null ? false : JSON.parse(val);
  } catch (err) {
    return false;
  }
};

export const validateFeelingsVariable = feelings => {
  if (feelings !== "likes" && feelings !== "dislikes") {
    throw new Error("feelings proprty must be either likes or dislikes");
  }
};

