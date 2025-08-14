// import { getRequestWithParams } from "@/service";
// import { RolesResponse } from "@/types";

// import { useQuery } from "@tanstack/react-query";

// const queryKeys = {
//   role_list: "role_list",
// };

// export const useGetRoles = () => {
//   const { data, isPending } = useQuery<RolesResponse>({
//     queryKey: [queryKeys.role_list],
//     queryFn: async () => {
//       const response = await getRequestWithParams<RolesResponse>({
//         url: "/roles",
//         params: { page: 1, limit: 10 },
//       });

//       return response as unknown as RolesResponse;
//     },
//   });

//   return { roleInventory: data?.data.items, rolesInventoryLoading: isPending };
// };
