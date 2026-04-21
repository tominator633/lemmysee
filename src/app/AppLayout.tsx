import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import styles from "./AppLayout.module.css";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function AppLayout(): React.ReactElement {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        if (path === "/") {
            navigate("/technology");
        }
    }, [navigate, path]);
    
    return (
        <>
            <Header/>
            <main className={styles.appMain}>
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
}