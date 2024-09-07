import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { displaySnackNotification } from '@services/recoil/app';
import { useAppTranslation } from '@hooks/index';
import { getMessageByCode } from '@services/i18n/translation';
import { userIDState } from '@states/app';
import useUserDetails from '../useUserDetails';

const useUserMainRoles = () => {
  const { t } = useAppTranslation();

  const { handleSaveDetails, user } = useUserDetails();

  const userID = useRecoilValue(userIDState);

  const [isCoordinator, setIsCoordinator] = useState(false);
  const [isSecretary, setIsSecretary] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFieldOverseer, setIsFieldOverseer] = useState(false);

  const handleToggleAdmin = async (value: boolean) => {
    try {
      if (userID !== user.id) {
        setIsAdmin(value);

        const newUser = structuredClone(user);

        if (value) {
          newUser.cong_role.push('admin');
        }

        if (!value) {
          newUser.cong_role = newUser.cong_role.filter(
            (role) => role !== 'admin'
          );
        }

        await handleSaveDetails(newUser);
      }
    } catch (error) {
      console.error(error);

      await displaySnackNotification({
        header: t('tr_errorTitle'),
        message: getMessageByCode(error.message),
        severity: 'error',
      });
    }
  };

  const handleToggleCoordinator = async (value: boolean) => {
    try {
      setIsCoordinator(value);

      const newUser = structuredClone(user);

      if (value) {
        newUser.cong_role.push('coordinator');
      }

      if (!value) {
        newUser.cong_role = newUser.cong_role.filter(
          (role) => role !== 'coordinator'
        );
      }

      await handleSaveDetails(newUser);
    } catch (error) {
      console.error(error);

      await displaySnackNotification({
        header: t('tr_errorTitle'),
        message: getMessageByCode(error.message),
        severity: 'error',
      });
    }
  };

  const handleToggleSecretary = async (value: boolean) => {
    try {
      setIsSecretary(value);

      const newUser = structuredClone(user);

      if (value) {
        newUser.cong_role.push('secretary');
      }

      if (!value) {
        newUser.cong_role = user.cong_role.filter(
          (role) => role !== 'secretary'
        );
      }

      await handleSaveDetails(newUser);
    } catch (error) {
      console.error(error);

      await displaySnackNotification({
        header: t('tr_errorTitle'),
        message: getMessageByCode(error.message),
        severity: 'error',
      });
    }
  };

  const handleToggleFieldOverseer = async (value: boolean) => {
    try {
      setIsFieldOverseer(value);

      const newUser = structuredClone(user);

      if (value) {
        newUser.cong_role.push('field_service_group_overseer');
      }

      if (!value) {
        newUser.cong_role = newUser.cong_role.filter(
          (role) => role !== 'field_service_group_overseer'
        );
      }

      await handleSaveDetails(newUser);
    } catch (error) {
      console.error(error);

      await displaySnackNotification({
        header: t('tr_errorTitle'),
        message: getMessageByCode(error.message),
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    const isCoordinator = user.cong_role.includes('coordinator');
    setIsCoordinator(isCoordinator);

    const isSecretary = user.cong_role.includes('secretary');
    setIsSecretary(isSecretary);

    const isAdmin = user.cong_role.includes('admin');
    setIsAdmin(isAdmin);

    const isFieldOverseer = user.cong_role.includes(
      'field_service_group_overseer'
    );
    setIsFieldOverseer(isFieldOverseer);
  }, [user]);

  return {
    isAdmin,
    handleToggleAdmin,
    isCoordinator,
    handleToggleCoordinator,
    isSecretary,
    isFieldOverseer,
    handleToggleSecretary,
    handleToggleFieldOverseer,
  };
};

export default useUserMainRoles;
