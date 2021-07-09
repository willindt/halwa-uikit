import React from "react";
import styled from "styled-components";
import { PancakeRoundIcon, CogIcon, SvgProps } from "../../components/Svg";
import Button from "../../components/Button/Button";
import * as IconModule from "./icons";
import { useTranslation } from 'react-i18next'
import Text from "../../components/Text/Text";
import { Flex } from "../../components/Flex";
import { useWalletModal } from "../WalletModal";
import { Login } from "../WalletModal/types";
import Dropdown from "../../components/Dropdown/Dropdown";
import MenuButton from "./MenuButton";
import { LangType } from "./types";

interface Props {
  account?: string;
  login: Login;
  logout: () => void;
  buy: () => void;
  toggleTheme: (isDark: boolean) => void;
  isDark: boolean,
  currentLang: string;
  langs: LangType[];
  setLang: (lang: LangType) => void;
}

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };
const { MoonIcon, SunIcon, LanguageIcon, MoreIcon } = Icons;

const MobileDropdown = styled(Dropdown)`
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }

  display: none;
`;

const StyledButton = styled(Button)`
  color: #FFFFFF !important;
  background-color: #ff992e !important;
`

const UserBlock: React.FC<Props> = ({
  account,
  login,
  logout,
  buy,
  toggleTheme,
  isDark,
  currentLang,
  langs,
  setLang
}) => {
  const { t } = useTranslation()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account);
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;  
  return (
    <Flex>
      <Dropdown
        position="top-right"
        target={
          <Button size="sm" variant="text">
            <Text color="textSubtle">{currentLang ? currentLang?.toUpperCase(): "EN"}</Text>
          </Button>
        }
      >
        {langs.map((lang) => (
          <MenuButton
            key={lang.code}
            fullWidth
            onClick={() => setLang(lang)}
            // Safari fix
            style={{ minHeight: "32px", height: "auto" }}
          >
            {lang.language}
          </MenuButton>
        ))}
      </Dropdown>
      <StyledButton size="sm" onClick={() => toggleTheme(!isDark)}>
        {/* alignItems center is a Safari fix */}
        <Flex alignItems="center">
          {isDark ? (<SunIcon color={"white"} width="24px" />) : (<MoonIcon color={"white"} width="24px" />)}
        </Flex>
      </StyledButton>
      <StyledButton
        size="sm"
        color="white"
        onClick={() => {
          buy();
        }}
      >
        <img src="/images/egg/mastercard.png" width="60px"/>
      </StyledButton>
      {account ? (
        <StyledButton
          size="sm"
          color="white"
          onClick={() => {
            onPresentAccountModal();
          }}
        >
          {accountEllipsis}
        </StyledButton>
      ) : (
        <StyledButton
          size="sm"
          onClick={() => {
            onPresentConnectModal();
          }}
        >
          {t('walletconnect')}
        </StyledButton>
      )}
    </Flex>
  );
};

export default UserBlock;
