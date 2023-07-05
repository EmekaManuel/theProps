"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, useCallback } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Button from "../Button";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [loading, setloading] = useState(false);
  const loginModal = useLoginModal();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setloading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setloading(false);
      });
  };

  const toggleAuth = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  },[loginModal, registerModal])




  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading subtitle="Create an Account" title="Welcome To Airbnb" />
      <Input
        id="name"
        label="Name"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3 ">
      <hr />
      <Button
        label="Continue with Google"
        outline
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        label="Continue with Github"
        outline
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="text-center mt-4 font-light text-neutral-500 ">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>Already have an account ?</div>
          <div onClick={toggleAuth} className="text-neutral-800 font-bold cursor-pointer hover:underline">Login</div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <Modal
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
        disabled={loading}
        title="Register"
        actionLabel="Continue"
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  );
};

export default RegisterModal;
