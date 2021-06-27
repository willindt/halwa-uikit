import React from "react";
import Button from "../../components/Button/Button";
import { Flex } from "../../components/Flex";
import { useWalletModal } from "../WalletModal";
import { Login } from "../WalletModal/types";

interface Props {
  account?: string;
  login: Login;
  logout: () => void;
  buy: () => void;
}

const UserBlock: React.FC<Props> = ({ account, login, logout, buy }) => {
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account);
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
  return (
    <Flex>
      <Button
        size="sm"
        variant="tertiary"
        onClick={() => {
          buy();
        }}
      >
        BUY BNB
      </Button>
      {account ? (
        <Button
          size="sm"
          variant="tertiary"
          onClick={() => {
            onPresentAccountModal();
          }}
        >
          {accountEllipsis}
        </Button>
      ) : (
        <Button
          size="sm"
          onClick={() => {
            onPresentConnectModal();
          }}
        >
          Connect
        </Button>
      )}
    </Flex>
  );
};

export default UserBlock;
