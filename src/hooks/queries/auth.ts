// import { saveTokenToLocalStore } from "@/lib";
// import { postRequest } from "@/service";
// import { LoginPayload, LoginResponse } from "@/types";
// import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// export function useSignin({ email, password }: LoginPayload) {
//   const navigate = useNavigate();
//   const { mutate, isPending } = useMutation({
//     mutationFn: async () => {
//       const response = await postRequest<LoginResponse, LoginPayload>({
//         url: "/auth/login",
//         payload: { email, password },
//         protectedRoute: false,
//       });

//       return response;
//     },
//     onSuccess: (data) => {
//       console.log(data);
//       saveTokenToLocalStore("access_token", data.data.token);
//       saveTokenToLocalStore("user", data.data.user);
//       navigate("/");
//       toast.success("Login successful");
//     },
//   });

//   return { mutate, isPending };
// }
