import { useState } from 'react';
import { useRouter } from 'next/router';

export const useRouteChecker = (route) => {
  const router = useRouter();
  const [isValidRoute] = useState(router.asPath.startsWith(route));

  return { isValidRoute };
};
