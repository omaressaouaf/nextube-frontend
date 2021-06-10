import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function useValidation(schema) {
  const validationSchema = yup.object().shape(schema);

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return { registerInput: register, wrapHandleSubmit: handleSubmit, errors: formState.errors, reset };
}
