"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";

interface userMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<userMenuProps> = ({ currentUser }) => {
  const [isOpen, setisOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const toggleOpen = useCallback(() => {
    setisOpen((value) => !value);
  }, []);
  return (
    <div className=" relative ">
      <div className="flex flex-row gap-3 items-center">
        <div
          onClick={() => {}}
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
        <div className="absolute rounded-xl shadow-md w-[30vw] md-[w-2/4] overflow-hidden right-0 top-12 text-sm ">
          <div className="flex flex-col cursor-pointer ">
            {currentUser ? (
              <>
                <MenuItem label="My Trips" onClick={() => {}} />
                <MenuItem label="My Favorites" onClick={() => {}} />
                <MenuItem label="My Properties" onClick={() => {}} />
                <MenuItem label="My Reservations" onClick={() => {}} />
                <MenuItem label="AirBnB my home" onClick={() => {}} />
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
