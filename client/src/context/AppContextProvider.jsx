import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../configs/Axios'; // Path theek kar lena agar alag ho

const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
    // Direct localStorage se initial state uthayen taake fast load ho
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    
    // User data object hota hai isliye [] ki jagah null behtar hai
    const [userData, setUserData] = useState(null); 
    
    const navigate = useNavigate();

    useEffect(() => {
        // Agar token mojood hai, toh backend se user ka data fetch karo
        if (token) {
            const fetchUserProfile = async () => {
                try {
                    const { data } = await api.get("/founder/me", {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    
                    if (data.success) {
                        setUserData(data.founder); // Data global state mein save ho gaya
                    } else {
                        // Agar token expire ho gaya ho ya galat ho
                        toast.error("Session expired, please login again");
                        localStorage.removeItem("token");
                        setToken("");
                        setUserData(null);
                        navigate("/login");
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    localStorage.removeItem("token");
                    setToken("");
                    setUserData(null);
                    navigate("/login");
                }
            };

            fetchUserProfile();
        } else {
            // Agar token nahi hai (e.g. logout), toh data clear kar do
            setUserData(null);
        }
    }, [token, navigate]); // Jab bhi token change hoga, yeh function dobara chalega

    const value = {
        name: 'AroFeature',
        token,
        setToken,
        navigate,
        userData,
        setUserData
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);