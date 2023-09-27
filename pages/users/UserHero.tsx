import Avatar from "@/components/Avatar";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import React from "react";

interface Props {
  userId: string;
}
const UserHero: React.FC<Props> = ({ userId }) => {
  const { data: fethcedUser } = useUser(userId);

  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fethcedUser?.coverImage && <Image src={fethcedUser.coverImage} fill alt="Cover-Img" style={{ objectFit: "cover" }} />}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
