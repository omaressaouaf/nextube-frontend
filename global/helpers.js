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
      confirmButtonColor: "#F13527",
      cancelButtonColor: "#55AE59",
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
