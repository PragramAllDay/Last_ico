import { ethers } from "ethers";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useWagmi } from "wagmi";
import { useRainbow } from "@rainbow-me/rainbowkit";
import {AppReducer} from "./AppReducer";


const initiaState = {   
    address: null,
    provider: null,
}

export const GlobalContext = createContext(initiaState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initiaState);
    
    const updateAddress = (address) => {
        dispatch({
            type: "SET_ADDRESS",
            payload: address,
        });
    }

    const updateProvider = (provider) => {
        dispatch({
            type: "SET_PROVIDER",
            payload: provider,
        });
    }

    return (
        <GlobalContext.Provider value={{ ...state, updateAddress, updateProvider }}>
            {children}
        </GlobalContext.Provider>
    )
}