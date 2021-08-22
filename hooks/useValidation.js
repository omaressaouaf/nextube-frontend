import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function useValidation({ schema, defaultValues }) {
  const validationSchema = yup.object().shape(schema);

  const { register, handleSubmit, formState, reset, setValue } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  return {
    registerInput: register,
    wrapHandleSubmit: handleSubmit,
    errors: formState.errors,
    reset,
    setValue,
  };
}
