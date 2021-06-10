import swal from "sweetalert2";


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
