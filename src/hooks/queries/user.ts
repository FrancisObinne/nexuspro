// import { getRequest } from "@/service";
// import { useQuery } from "@tanstack/react-query";

// const queryKeys = {
//   user_details: "user_details",
// };

// export const useUserDetails = (user_id: string) => {
//   const { data, isPending } = useQuery({
//     queryKey: [queryKeys.user_details, user_id],
//     queryFn: async () =>
//       await getRequest({
//         url: "/user",
//         params: { user_id },
//       }),
//   });

//   return { data, isPending };
// };
