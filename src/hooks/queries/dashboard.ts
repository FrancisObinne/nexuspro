// import { getRequest } from "@/service";
// import { DashboardStatResponse } from "@/types/dashboard";
// import { useSuspenseQuery } from "@tanstack/react-query";

// export const useDashboardStat = () => {
//   const { data, isPending } = useSuspenseQuery<DashboardStatResponse>({
//     queryKey: ["dashboardStat"],
//     queryFn: async () => {
//       return await getRequest<DashboardStatResponse>({
//         url: "/DashboardStat",
//       });
//     },
//   });
//   return { data: data.data, isPending };
// };
