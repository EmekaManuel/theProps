"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, useCallback } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Modal from "./Modal";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [loading, setloading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setloading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setloading(false);

      if (callback?.ok) {
        toast.success("Logged In Success");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading subtitle="Login to your Account" title="Welcome Back" />

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
        onClick={() => {}}
      />
      <div className="text-center mt-4 font-light text-neutral-500 ">
        <div className="flex flex-row justify-center items-center gap-2">
          Don&apos;t have an account?
          <div
            onClick={loginModal.onClose}
            className="text-neutral-800 font-bold cursor-pointer hover:underline"
          >
            Sign Up here
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <Modal
        isOpen={loginModal.isOpen}
        onClose={loginModal.onClose}
        disabled={loading}
        title="Login"
        actionLabel="Continue"
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  );
};

export default LoginModal;
