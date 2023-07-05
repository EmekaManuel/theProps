"use client";

import React, { useMemo, useState } from "react";
import Modal from "./Modal";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroom: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onPreviousStep = () => {
    setStep((value) => value - 1);
  };
  const onNextStep = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8 ">
      <Heading
        title="Which of These Best Describes Your Place ?"
        subtitle="Pick a Category"
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 max-h-[50vh] overflow-y-auto ">
        {categories.map((item) => (
          <div className="col-span-1" key={item.label}>
            <CategoryInput
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
              onClick={(category) => setCustomValue("category", category)}
            />
          </div>
        ))}
      </div>
    </div>
  );
    if (step === STEPS.LOCATION) {
     bodyContent = (
        <div className="flex flex-col gap-8 ">
          <Heading
            title="Where is Your Place Located ?"
            subtitle="Help Users Find You"
          />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 max-h-[50vh] overflow-y-auto ">
        <CountrySelect/>
          </div>
        </div>
      )
    }

  return (
    <Modal
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onPreviousStep}
      onClose={rentModal.onClose}
      onSubmit={onNextStep}
      isOpen={rentModal.isOpen}
      title="AirBnb My Home"
      body={bodyContent}
    />
  );
};

export default RentModal;
