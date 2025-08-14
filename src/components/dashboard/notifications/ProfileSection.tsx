
import React from "react";
import { Avatar } from "@/components/ui/avatar";

interface ProfileSectionProps {
  name: string;
  role: string;
  avatarUrl: string;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  name,
  role,
  avatarUrl
}) => {
  return (
    <div className="flex items-center">
      <Avatar className="h-10 w-10 mr-3">
        <img 
          src={avatarUrl}
          alt={name} 
          className="object-cover"
        />
      </Avatar>
      <div className="text-sm">
        <div className="font-medium">{name}</div>
        <div className="text-gray-500 text-xs">{role}</div>
      </div>
    </div>
  );
};
