import { useEffect } from "react";
import Layout from "./components/layout/index.js";
import HomePage from "./pages/homePage.js";
import LoginPage from "./pages/loginPage.js";
import SignUpPage from "./pages/signUpPage.js";
import DashboardPage from "./pages/dashboardPage.js";
import PatientsPage from "./pages/patientsPage.js";
import PatientPage from "./pages/patientProfilePage.js";
import ResearchPage from "./pages/researchAreasPage.js";
import AboutMePage from "./pages/aboutMePage.js";
import { QueryClientProvider, QueryClient } from "react-query";
import AuthContextProvider from "./contexts/authContext.js";
import ProtectedRoutes from "./components/protectedRoutes/protectedRoutes.js";
import { SnackbarProvider } from "./contexts/snackbarContext.js";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 360000,
            refetchInterval: 360000,
            refetchOnWindowFocus: false,
        },
    },
});

function App() {
    useEffect(() => {
        document.body.style.margin = 0;
    }, []);
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <SnackbarProvider>
                    <BrowserRouter>
                        <Routes>
                            {/* Routes that do not use Layout */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignUpPage />} />
                            <Route
                                path="/research"
                                element={<ResearchPage />}
                            />
                            <Route path="/aboutme" element={<AboutMePage />} />

                            {/* Routes that should use Layout */}
                            <Route path="/" element={<Layout />}>
                                {/* Protected Auth Routes should be within this */}
                                <Route element={<ProtectedRoutes />}>
                                    <Route
                                        path="dashboard"
                                        element={<DashboardPage />}
                                    />
                                    <Route
                                        path="patients"
                                        element={<PatientsPage />}
                                    />
                                    <Route
                                        path="patient/:id"
                                        element={<PatientPage />}
                                    />
                                </Route>
                            </Route>

                            {/* Catch-all route */}
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </BrowserRouter>
                </SnackbarProvider>
            </AuthContextProvider>
        </QueryClientProvider>
    );
}

export default App;
