'use client'
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  disabled?: boolean;
  onAction?: (id: string)=> void;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  disabled,
  onAction,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
    const router = useRouter();
    const {getByValue} = useCountries();

    const location = getByValue(data.locationValue)
    const handleCancel  = useCallback((event:React.MouseEvent<HTMLButtonElement>)=> {
        event.stopPropagation();

        if(disabled) {
            return;
        }

        onAction?.(actionId)

    },[actionId, disabled, onAction]) 


  return <div>ListingCard</div>;
};

export default ListingCard;
