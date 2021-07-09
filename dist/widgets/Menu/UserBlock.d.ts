import React from "react";
import { Login } from "../WalletModal/types";
import { LangType } from "./types";
interface Props {
    account?: string;
    login: Login;
    logout: () => void;
    buy: () => void;
    toggleTheme: (isDark: boolean) => void;
    isDark: boolean;
    currentLang: string;
    langs: LangType[];
    setLang: (lang: LangType) => void;
}
declare const UserBlock: React.FC<Props>;
export default UserBlock;
