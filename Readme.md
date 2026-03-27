# OdontoTrack - Sistema de Gestão Odontológica

Este é um sistema frontend moderno para gestão de clínicas odontológicas, desenvolvido com React, TypeScript e TailwindCSS.

## 🚀 Tecnologias Utilizadas

- **React 19** com **Vite**
- **TypeScript** para tipagem estática
- **TailwindCSS 4** para estilização utilitária
- **React Router DOM** para navegação
- **React Query (TanStack Query)** para gerenciamento de estado assíncrono e cache
- **Zustand** para estado global (Autenticação)
- **Lucide React** para ícones
- **Motion** para animações
- **Axios** configurado para futuras integrações

## 🏗️ Estrutura do Projeto

- `/src/components`: Componentes reutilizáveis (Button, Input, Card, etc.)
- `/src/pages`: Páginas da aplicação (Dashboard, Pacientes, Login)
- `/src/layouts`: Layouts estruturais (DashboardLayout, AuthLayout)
- `/src/routes`: Configuração de rotas
- `/src/services`: Serviços de API (simulados com mocks)
- `/src/hooks`: Hooks customizados para lógica de negócio
- `/src/types`: Definições de tipos TypeScript
- `/src/mocks`: Dados simulados para desenvolvimento
- `/src/store`: Gerenciamento de estado global com Zustand

## ✨ Funcionalidades Implementadas

- **Controle de Acesso (RBAC)**: Diferenciação de permissões entre Dentista e Recepcionista.
- **Autenticação Mock**: Tela de login com seleção de perfil.
- **Dashboard Principal**: Cards de indicadores, agenda do dia e resumo financeiro.
- **Gestão de Pacientes**: Listagem completa com busca e formatação de dados (CPF).
- **Design Responsivo**: Sidebar colapsável e layout adaptável para diferentes telas.
- **UI Moderna**: Estilo SaaS com sombras suaves, tipografia limpa e estados interativos.

## 🛠️ Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 🔌 Integração com API

O sistema já está estruturado para receber uma API REST. Os serviços em `src/services` utilizam uma instância do Axios e podem ser facilmente alterados para apontar para um backend real, apenas trocando a implementação do `mockApi` para chamadas reais do `api`.

---
Desenvolvido por Gabriel Faria/David Gabriel
