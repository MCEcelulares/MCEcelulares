'use client';

import { useAuth } from '@/src/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface PermissionRouteProps {
  children: React.ReactNode;
  anyOf: string[];
}

export const PermissionRoute = ({ children, anyOf }: PermissionRouteProps) => {
  const { isAuthenticated, isLoading, hasAnyPermissao } = useAuth();
  const router = useRouter();

  const autorizado = hasAnyPermissao(anyOf);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    } else if (!isLoading && isAuthenticated && !autorizado) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, autorizado, router]);

  if (isLoading || !isAuthenticated || !autorizado) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-400 animate-pulse">Carregando...</p>
      </div>
    );
  }

  return <>{children}</>;
};