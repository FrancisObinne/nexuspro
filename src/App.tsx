import { Toaster as Sonner, Toaster } from "@/components/sonner";
// import { Toaster } from "@/components/toaster";
// import { TooltipProvider } from "@/components/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Routes from "./routes";
import { ErrorBoundary, ErrorInfo } from "./components/error-boundary";
import { TooltipProvider } from "./components/tooltip";
import Layout from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { setUser } from "./features/auth/authSlice";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { setProfile } from "./features/profile/profileSlice";
import type { UserProfile } from "./features/profile/profileSlice";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ProMembersPage from "./pages/ProMembersPage";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import AdminDashboard from "./pages/AdminDashboard";
import { RootState } from "./app/store";
import MembershipPage from "./pages/MembershipPage";
import JobsPage from "./pages/JobsPage";
import JobDetailsPage from "./pages/JobDetailsPage";

const handleError = (error: Error, errorInfo: ErrorInfo): void => {
  console.log("App-level error handler:", error.message);
  console.log("ErrorInfo:", errorInfo);
};

// Create a client
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 60 * 1000,
//       refetchOnWindowFocus: false,
//     },
//   },
// });

// const App = () => {
//   return (
//     <React.StrictMode>
//       <ErrorBoundary
//         showDetails={process.env.NODE_ENV === "development"}
//         onError={handleError}
//       >
//         <Provider store={store}>
//           <QueryClientProvider client={queryClient}>
//             <TooltipProvider>
//               <Toaster />
//               <Sonner />
//               <Routes />
//             </TooltipProvider>
//           </QueryClientProvider>
//         </Provider>
//       </ErrorBoundary>
//     </React.StrictMode>
//   );
// };

function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      dispatch(setUser(user));
      if (user) {
        // Fetch profile data from Firestore
        const profileRef = doc(db, "profiles", user.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          const profileData = profileSnap.data();
          const validProfile: UserProfile = {
            uid: user.uid,
            name: profileData.name || "",
            bio: profileData.bio || "",
            membershipTier:
              profileData.membershipTier === "pro" ? "pro" : "free",
            isAdmin: profileData.isAdmin || false,
          };
          dispatch(setProfile(validProfile));
        } else {
          // If no profile exists, create a default one
          const newProfile = {
            uid: user.uid,
            name: user.email || "",
            bio: "",
            membershipTier: "free",
            isAdmin: false,
          };
          await setDoc(profileRef, newProfile);
          dispatch(setProfile(newProfile));
        }
      } else {
        dispatch(setProfile(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/pro-content" element={<ProMembersPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:eventId" element={<EventDetailsPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
