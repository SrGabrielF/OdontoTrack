🦷 Sistema de Gestão para Clínica Odontológica (Frontend)
📌 Sobre o Projeto

Este projeto é um frontend de um sistema de gestão para clínicas odontológicas, desenvolvido com foco em produtividade, organização e experiência do usuário.

A aplicação simula um ambiente real de uso, permitindo o gerenciamento de pacientes, consultas, tratamentos e equipe clínica.

⚠️ Este repositório contém apenas o frontend. O backend será desenvolvido separadamente.

🚀 Tecnologias Utilizadas
React
TypeScript
Vite
TailwindCSS
React Router DOM
Axios
React Query / Zustand (opcional)
🎨 Funcionalidades
🔐 Autenticação (Mock)
Login de usuário (Recepcionista / Dentista)
Cadastro de usuário
Simulação de autenticação (sem backend)
📊 Dashboard
Indicadores do dia:
Pacientes atendidos
Aguardando atendimento
Em atendimento
Tratamentos ativos
👤 Pacientes
Cadastro de pacientes
Listagem completa
Busca por CPF
Visualização de dados
📅 Agenda
Visualização de consultas
Organização por data
Criação de novas consultas
🦷 Consultas
Listagem de consultas
Status:
Agendada
Em andamento
Finalizada
🧾 Tratamentos
Listagem de tratamentos
Status:
Aprovado
Em andamento
Enviado
Reprovado
👨‍⚕️ Equipe Clínica
Visualização de profissionais
Cadastro de membros da equipe
💰 Financeiro
Dashboard financeiro (mock)
Relatórios simples
🧩 Estrutura do Projeto
src/
  components/
  pages/
  layouts/
  routes/
  services/
  hooks/
  types/
  mocks/
🔌 Integração com Backend

O projeto está preparado para integração futura com API REST:

Axios configurado com baseURL
Services separados por domínio (ex: patientService.ts)
Hooks simulando consumo de API
📱 Responsividade
Layout responsivo
Sidebar colapsável
Adaptado para desktop e mobile
▶️ Como Rodar o Projeto
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repo.git

# Acesse a pasta
cd seu-repo

# Instale as dependências
npm install

# Rode o projeto
npm run dev
🎯 Objetivo

Este projeto tem como objetivo:

Simular um sistema real de clínica
Servir como base para integração fullstack
Demonstrar boas práticas de frontend moderno
📄 Licença

Este projeto é apenas para fins educacionais.

👨‍💻 Autor

Desenvolvido por Gabriel Faria

💡 Observações
Os dados exibidos são mockados
Não há persistência de dados
Backend será integrado futuramente
