import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, Mail, Lock, UserRound, UserPlus } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuthStore, UserRole } from '../store/useAuthStore';
import { cn } from '../lib/utils';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('receptionist');
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would be a call to authService.login(email, password, role)
      // which returns { user, token }
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser = {
        id: '1',
        name: 'Dr Batman',
        email,
        role,
      };
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

      setAuth(mockUser, mockToken);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2070"
          alt="Dental Clinic"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-indigo-900/40 backdrop-blur-sm flex items-center justify-center p-12">
          <div className="max-w-md text-white">
            <h1 className="text-5xl font-bold mb-6">Gestão inteligente para sua clínica.</h1>
            <p className="text-xl text-indigo-50 opacity-90">
              Otimize seus atendimentos, organize sua agenda e tenha controle total do seu financeiro em um só lugar.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="inline-flex w-16 h-16 bg-indigo-600 rounded-2xl items-center justify-center text-white mb-6 shadow-lg shadow-indigo-200">
              <Stethoscope size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Bem-vindo de volta</h2>
            <p className="text-slate-500 mt-2">Acesse sua conta para gerenciar a clínica</p>
          </div>

          <div className="flex p-1 bg-slate-200 rounded-xl">
            <button
              type="button"
              onClick={() => setRole('receptionist')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all',
                role === 'receptionist' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              )}
            >
              <UserPlus size={18} />
              Sou Recepcionista
            </button>
            <button
              type="button"
              onClick={() => setRole('dentist')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all',
                role === 'dentist' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              )}
            >
              <UserRound size={18} />
              Sou Dentista
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={18} />}
            />
            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={18} />}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                Lembrar-me
              </label>
              <a href="#" className="text-indigo-600 font-medium hover:underline">Esqueceu a senha?</a>
            </div>

            <Button type="submit" className="w-full py-6 text-lg" isLoading={isLoading}>
              Entrar no Sistema
            </Button>
          </form>

          <p className="text-center text-slate-500">
            Não tem uma conta?{' '}
            <Link to="/cadastro" className="text-indigo-600 font-semibold hover:underline">
              Cadastre-se agora
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
