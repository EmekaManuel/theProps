"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import RentModal from "../modals/RentModal";

interface userMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<userMenuProps> = ({ currentUser }) => {
  const [isOpen, setisOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const toggleOpen = useCallback(() => {
    setisOpen((value) => !value);
  }, []);

  const onRent = useCallback(()=> {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    // open rent modal
    rentModal.onOpen();
  },[loginModal, rentModal, currentUser])
  return (
    <div className=" relative ">
      <div className="flex flex-row gap-3 items-center">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full transition cursor-pointer hover:bg-neutral-100"
        >
          airbnb home
        </div>
        <div
          onClick={toggleOpen}
          className="flex flex-row gap-3 items-center md:py-1 md:px-2 border-neutral-200  p-4 rounded-full transition cursor-pointer hover:shadow-md"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar  src={currentUser?.image}/>
          </div>
        </div>
      </div>
      {isOpen ? (
        <div className="absolute z-40  rounded-xl shadow-md w-[30vw] md-[w-2/4] overflow-hidden right-0 top-12 text-sm ">
          <div className="flex bg-white flex-col cursor-pointer ">
            {/* change this later auth issues remove the exclamation! */}
            {currentUser ? (
              <>
                <MenuItem label="My Trips" onClick={() => {}} />
                <MenuItem label="My Favorites" onClick={() => {}} />
                <MenuItem label="My Properties" onClick={() => {}} />
                <MenuItem label="My Reservations" onClick={() => {}} />
                <MenuItem label="AirBnB my home" onClick={rentModal.onOpen} />
                <hr /> 
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="login" onClick={loginModal.onOpen} />
                <MenuItem label="sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserMenu;
