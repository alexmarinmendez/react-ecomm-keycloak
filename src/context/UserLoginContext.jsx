/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

import Keycloak from 'keycloak-js'

const keycloakOptions = {
    url: "https://keycloak-alexmarinmendez-dev.apps.sandbox-m3.1530.p1.openshiftapps.com",
    realm: "super-ecomm",
    clientId: "react-super-ecomm"
}

export const UserLoginContext = createContext([])

export const UserLoginContextProvider = ({ children }) => {
    const [keycloak, setKeycloak] = useState(null);

    const handleLogout = () => {
        if (keycloak) {
            keycloak.logout();
        }
    }

    useEffect(() => {
        const initKeycloak = async () => {
            const keycloakInstance = new Keycloak(keycloakOptions);
            try {
                await keycloakInstance.init({ onLoad: 'login-required' })
                setKeycloak(keycloakInstance)
                if (keycloakInstance.authenticated) {
                    console.log(keycloakInstance)
                }
            } catch (error) {
                console.log(`Error: ${error}`);
            }
        }
        initKeycloak();
    }, []);

    return (
        <UserLoginContext.Provider value={{ keycloak, handleLogout }}>
            {children}
        </UserLoginContext.Provider>
    )
}