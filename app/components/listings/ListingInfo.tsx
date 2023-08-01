"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import React from "react";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser | null;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  locationValue,
  guestCount,
  category,
  roomCount,
  bathroomCount,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;
  return (
    <div className="flex-col gap-8 flex col-span-4">
      <div className="flex flex-col gap-2">
        <div className="text-xl flex flex-row gap-2 items-center font-semibold">
          <div>Hosted By {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms </div>
          <div>{bathroomCount} Bathrooms </div>
        </div>
      </div>
      <hr />
      {category ? (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      ) : null}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
