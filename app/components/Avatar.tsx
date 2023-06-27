'use client'

interface AvatarProps {
  src: string | null | undefined
}


import Image from "next/image"
import React from "react"
const Avatar: React.FC<AvatarProps> = ({src}) => {
  return (
    <Image
    className="rounded-full" height={"30"} width={"30"} alt="avatar" src={ src || "/images/placeholder.svg"}/>
    )
}

export default Avatar