import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, Mail, Lock, User, UserPlus, ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuthStore, UserRole } from '../store/useAuthStore';
import { cn } from '../lib/utils';

export const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('receptionist');
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would be a call to authService.signup(name, email, password, role)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
      };
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

      setAuth(mockUser, mockToken);
      navigate('/');
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image & Branding */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=2070"
          alt="Dental Professional"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-indigo-900/60 backdrop-blur-sm flex items-center justify-center p-12">
          <div className="max-w-md text-white">
            <h1 className="text-5xl font-bold mb-6">Junte-se à revolução na gestão dental.</h1>
            <p className="text-xl text-indigo-50 opacity-90">
              Cadastre sua clínica hoje e experimente o futuro da odontologia digital. Simples, rápido e eficiente.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50 overflow-y-auto">
        <div className="max-w-md w-full space-y-8 py-12">
          <div className="text-center">
            <div className="inline-flex w-16 h-16 bg-indigo-600 rounded-2xl items-center justify-center text-white mb-6 shadow-lg shadow-indigo-200">
              <Stethoscope size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Criar sua conta</h2>
            <p className="text-slate-500 mt-2">Preencha os dados abaixo para começar</p>
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
              Recepcionista
            </button>
            <button
              type="button"
              onClick={() => setRole('dentist')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all',
                role === 'dentist' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              )}
            >
              <User size={18} />
              Dentista
            </button>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <Input
              label="Nome Completo"
              type="text"
              placeholder="Ex: Dr. João Silva"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User size={18} />}
            />
            <Input
              label="E-mail Profissional"
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
              placeholder="Mínimo 8 caracteres"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={18} />}
            />

            <div className="text-xs text-slate-500">
              Ao se cadastrar, você concorda com nossos{' '}
              <a href="#" className="text-indigo-600 hover:underline">Termos de Uso</a> e{' '}
              <a href="#" className="text-indigo-600 hover:underline">Política de Privacidade</a>.
            </div>

            <Button type="submit" className="w-full py-6 text-lg" isLoading={isLoading}>
              Criar minha conta
            </Button>
          </form>

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-50 text-slate-500">Já possui conta?</span>
              </div>
            </div>

            <Link to="/login">
              <Button variant="outline" className="w-full py-4 bg-white gap-2">
                <ArrowLeft size={18} />
                Voltar para o Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
