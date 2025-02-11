import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const useQueryParams = (): { [key: string]: string } | null => {
  const router = useRouter();

  const value = useMemo(() => {
    const queryParamsStr = router.asPath.split('?').slice(1).join('');
    const urlSearchParams = new URLSearchParams(queryParamsStr);
    const allParams = Object.fromEntries(urlSearchParams.entries());

    return allParams;
  }, [router.asPath]);

  return value;
};
