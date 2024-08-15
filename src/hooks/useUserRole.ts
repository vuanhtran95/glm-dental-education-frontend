import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from 'src/store/user/types';
import { getUserInfo } from 'src/utils';

const useAllowedRoles = (allowedRoles?: Array<UserRole>) => {
  const userInfo = getUserInfo();
  const navigate = useNavigate();

  const isStudent: boolean = useMemo(
    () => userInfo?.role === UserRole.STUDENT,
    [userInfo?.role]
  );

  useEffect(() => {
    if (!userInfo?.role || !allowedRoles?.includes(userInfo.role))
      navigate('/not-found');
  }, [allowedRoles, navigate, userInfo?.role]);

  return { isStudent };
};

export default useAllowedRoles;
