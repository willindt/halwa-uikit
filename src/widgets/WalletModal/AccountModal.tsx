import React from "react";
import Button from "../../components/Button/Button";
import Text from "../../components/Text/Text";
import LinkExternal from "../../components/Link/LinkExternal";
import Flex from "../../components/Flex/Flex";
import { Modal } from "../Modal";
import CopyToClipboard from "./CopyToClipboard";
import { localStorageKey } from "./config";
import { useTranslation } from 'react-i18next'

interface Props {
  account: string;
  logout: () => void;
  onDismiss?: () => void;
}

const AccountModal: React.FC<Props> = ({ account, logout, onDismiss = () => null }) => {
  const { t } = useTranslation()
  return(
  <Modal title={t('yourwallet')} onDismiss={onDismiss}>
    <Text
      fontSize="20px"
      bold
      style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "8px" }}
    >
      {account}
    </Text>
    <Flex mb="32px">
      <LinkExternal small href={`https://bscscan.com/address/${account}`} mr="16px">
        {t('viewonbscscan')}
      </LinkExternal>
      <CopyToClipboard toCopy={account}>{t('copyaddress')}</CopyToClipboard>
    </Flex>
    <Flex justifyContent="center">
      <Button
        size="sm"
        variant="secondary"
        onClick={() => {
          logout();
          window.localStorage.removeItem(localStorageKey);
          onDismiss();
          window.location.reload();
        }}
      >
        {t('logout')}
      </Button>
    </Flex>
  </Modal>
  )
};

export default AccountModal;
