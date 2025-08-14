import { RouterErrorElement } from "@/components/error-boundary";
import Loader from "@/components/loader";
import NotFound from "@/components/not-found";
import { AuthenticatedLayout } from "@/layouts/authenticated";
import React, { lazy } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
}

const MainBody = ({ children }: Props) => {
  return (
    <main className="h-screen w-full bg-[#FCFAEE] !font-nunito">
      {children ? children : <Outlet />}
    </main>
  );
};

const ISuspense = ({ children }: Props) => {
  return (
    <React.Suspense fallback={<Loader text="Loading 😉😉" />}>
      {children}
    </React.Suspense>
  );
};

const Login = lazy(() => import("@/modules/unauthenticated/login"));
const ResetPassword = lazy(
  () => import("@/modules/unauthenticated/reset-password")
);
const VerifyEmail = lazy(
  () => import("@/modules/unauthenticated/email-verification")
);
const Support = lazy(() => import("@/modules/unauthenticated/support"));
const Dashboard = lazy(() => import("@/modules/authenticated/dashboard"));

const Routes = () => {
  const router = createBrowserRouter([
    {
      element: <MainBody />,
      children: [
        {
          path: "/",
          // element: <AuthenticatedLayout />,
          errorElement: <RouterErrorElement />,
          children: [
            {
              index: true,
              element: (
                <ISuspense>
                  <Dashboard />
                </ISuspense>
              ),
            },
            {
              path: "/service-users",
              children: [
                {
                  index: true,
                  element: (
                    <ISuspense>
                      {/* <ServiceUser /> */}
                    </ISuspense>
                  ),
                },
                {
                  path: "create",
                  element: (
                    <ISuspense>
                      {/* <CreateServiceUser /> */}
                    </ISuspense>
                  ),
                },
                {
                  path: ":serviceUserId/edit",
                  element: (
                    <ISuspense>
                      {/* <EditServiceUser /> */}
                    </ISuspense>
                  ),
                },
                {
                  path: ":serviceUserId/profile",
                  element: (
                    <ISuspense>
                      {/* <ViewServiceUser /> */}
                    </ISuspense>
                  ),
                },
              ],
            },
            {
              path: "staff",
              children: [
                {
                  index: true,
                  element: (
                    <ISuspense>
                      {/* <Staff /> */}
                    </ISuspense>
                  ),
                },
                {
                  path: "create",
                  element: (
                    <ISuspense>
                      {/* <CreateStaff /> */}
                    </ISuspense>
                  ),
                },
                {
                  path: ":publicId/edit",
                  element: (
                    <ISuspense>
                      {/* <EditStaff /> */}
                    </ISuspense>
                  ),
                },
              ],
            },
            {
              path: "task",
              element: (
                <ISuspense>
                  {/* <TaskManagement /> */}
                </ISuspense>
              ),
            },
            {
              path: "categories",
              element: (
                <ISuspense>
                  {/* <Categories /> */}
                </ISuspense>
              ),
            },
            {
              path: "rota",
              children: [
                {
                  index: true,
                  element: (
                    <ISuspense>
                      {/* <Rota /> */}
                    </ISuspense>
                  ),
                },
                {
                  path: "create",
                  element: (
                    <ISuspense>
                      {/* <CreateRota /> */}
                    </ISuspense>
                  ),
                },
                {
                  path: ":rotaId/edit",
                  element: (
                    <ISuspense>
                      {/* <EditRota /> */}
                    </ISuspense>
                  ),
                },
              ],
            },
            {
              path: "schedules",
              element: (
                <ISuspense>
                  {/* <ManageSchedule /> */}
                </ISuspense>
              ),
            },
            {
              path: "reports",
              children: [
                {
                  index: true,
                  element: (
                    <ISuspense>
                      {/* <Reports /> */}
                    </ISuspense>
                  ),
                },
                {
                  path: ":type",
                  element: (
                    <ISuspense>
                      {/* <ReportDetails /> */}
                    </ISuspense>
                  ),
                },
                {
                  path: "schedules-by-task",
                  element: (
                    <ISuspense>
                      {/* <ScheduleByTask /> */}
                    </ISuspense>
                  ),
                },
              ],
            },
            {
              path: "care-plans",
              element: (
                <ISuspense>
                  {/* <CarePlansPage /> */}
                </ISuspense>
              ),
            },
            {
              path: "schedules-by-task",
              element: (
                <ISuspense>
                  {/* <ScheduleByTask /> */}
                </ISuspense>
              ),
            },
            {
              path: "*",
              element: <NotFound />,
            },
          ],
        },
        {
          path: "auth",
          children: [
            {
              index: true,
              element: (
                <ISuspense>
                  <Login />
                </ISuspense>
              ),
            },
            {
              path: "reset-password",
              element: (
                <ISuspense>
                  <ResetPassword />
                </ISuspense>
              ),
            },
            {
              path: "verify-email",
              element: (
                <ISuspense>
                  <VerifyEmail />
                </ISuspense>
              ),
            },

            {
              path: "support",
              element: (
                <ISuspense>
                  <Support />
                </ISuspense>
              ),
            },

            {
              path: "*",
              element: <NotFound />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
