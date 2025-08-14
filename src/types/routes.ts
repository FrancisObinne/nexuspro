import { ReactNode } from "react";
import { UserType } from "./user";

export interface Link {
  to: string;
  label: string;
  grantPermission: UserType[];
  Icon: ReactNode;
  iconClassName?: string;
  onClick?: () => void;
}

export interface NavlinkProps extends Link {
  subLink?: Partial<Link>[];
}
