import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, updateUserRole } from "../features/users/usersSlice";
import { RootState, AppDispatch } from "../app/store";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks";
// import { useToast } from "@/components/use-toast";

const UserManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, error } = useSelector(
    (state: RootState) => state.users
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllUsers());
    }
  }, [status, dispatch]);

  const handleRoleChange = async (userId: string, isAdmin: boolean) => {
    if (userId === user?.uid) {
      toast({
        title: "Action Denied",
        description: "You cannot change your own admin status.",
        variant: "destructive",
      });
      return;
    }
    try {
      await dispatch(updateUserRole({ userId, isAdmin })).unwrap();
      toast({
        title: "User role updated",
        description: `User role for ${userId} has been updated.`,
      });
    } catch (err) {
      toast({
        title: "Role update failed",
        description: "Something went wrong while updating the user role.",
        variant: "destructive",
      });
    }
  };

  if (status === "loading") {
    return <p className="text-center mt-8">Loading users...</p>;
  }

  if (status === "failed") {
    return <p className="text-center mt-8 text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of all registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Membership</TableHead>
            <TableHead>Admin Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((userProfile) => (
            <TableRow key={userProfile.uid}>
              <TableCell className="font-medium">
                {userProfile.name || userProfile.uid}
              </TableCell>
              <TableCell className="capitalize">
                {userProfile.membershipTier}
              </TableCell>
              <TableCell>
                <Switch
                  checked={userProfile.isAdmin}
                  onCheckedChange={(checked) =>
                    handleRoleChange(userProfile.uid, checked)
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;
