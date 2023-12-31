"use client";

import axios from "axios";
import { useRouter } from "next/navigation"; 
import { toast } from "react-hot-toast";
import React, { useMemo, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Map from "../Map";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";


enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
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
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const bathroomCount = watch("bathroomCount");
  const roomCount = watch("roomCount");
  const imageSrc = watch("imageSrc");

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNextStep();
    }
    
    setIsLoading(true);

    axios.post('/api/listings', data)
    .then(() => {
      toast.success('Listing created!');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY)
      rentModal.onClose();
    })
    .catch(() => {
      toast.error('Something went wrong.');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

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
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share Some Basic Info About Your Place"
          subtitle="What Basic Amenities Do You Have ?"
        />
        <Counter
          title="Guests"
          subtitle="How Many Guests Do You Allow"
          value={guestCount}
          onChange={(value) => {
            setCustomValue("guestCount", value);
          }}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How Many Rooms Do You Have"
          value={roomCount}
          onChange={(value) => {
            setCustomValue("roomCount", value);
          }}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How Many Bathrooms  Do You Have"
          value={bathroomCount}
          onChange={(value) => {
            setCustomValue("bathroomCount", value);
          }}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Upload Pictures Of Your Apartment"
          subtitle="Show Guests What Your Place Looks Like"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How Would You Describe Your Place ?"
          subtitle="Short and Sweet Work Best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          required
          register={register}
          errors={errors}
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          required
          register={register}
          errors={errors}
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now Set Your Price"
          subtitle="How Much Do You Charge Per Night ?"
        />
        <Input 
        id="price"
        label="Price"
        formatPrice
        type="number"
        disabled={isLoading}
        errors={errors}
        required
        register={register}
        />
      </div>
    );
  }

  return (
    <Modal
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onPreviousStep}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={rentModal.isOpen}
      title="AirBnb My Home"
      body={bodyContent}
    />
  );
};

export default RentModal;
