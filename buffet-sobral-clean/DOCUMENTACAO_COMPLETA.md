# Documentação Completa - Buffet Sobral

## 1. Visão Geral

O Buffet Sobral é um site moderno e responsivo para um buffet localizado em Sobral-CE. O projeto foi desenvolvido com tecnologias web padrão (HTML, CSS, JavaScript) e integração com Supabase como backend.

### 1.1 Objetivo
- Permitir que os clientes visualizem os serviços oferecidos
- Simular orçamentos com base no número de convidados
- Agendar eventos através de uma agenda interativa
- Visualizar avaliações de clientes
- Acessar vídeos e fotos do espaço

### 1.2 Público-alvo
- Clientes que desejam contratar serviços de buffet
- Organizadores de festas de aniversário, casamentos, formaturas e eventos corporativos

## 2. Estrutura do Projeto

```
buffet-sobral-clean/
├── public/
│   ├── index.html
│   └── admin.html
├── cache-manager.js
├── data-models.js
├── error-handler.js
├── gallery-manager.js
├── monitoring-system.js
├── packages-manager.js
├── performance-optimizer.js
├── quotes-manager.js
├── services-manager.js
├── supabase.js
├── videos-manager.js
├── package.json
├── vercel.json
└── .gitignore
```

## 3. Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Hospedagem**: Vercel
- **Armazenamento**: localStorage para cache local

## 4. Funcionalidades Principais

### 4.1 Catálogo de Serviços
Apresenta todos os serviços oferecidos pelo buffet com informações detalhadas, preços e sliders para ajustar a quantidade de convidados.

### 4.2 Simulador de Orçamentos
Permite aos clientes simular orçamentos com base no número de convidados e serviços selecionados.

### 4.3 Agenda de Eventos
Mostra a disponibilidade do buffet e permite agendamento de eventos.

### 4.4 Avaliações de Clientes
Exibe avaliações e depoimentos de clientes satisfeitos.

### 4.5 Galeria de Fotos
Apresenta fotos do espaço do buffet.

### 4.6 Vídeos em Destaque
Mostra vídeos relacionados aos serviços do buffet.

## 5. Componentes Técnicos

### 5.1 CacheManager
Gerencia o cache local dos dados para melhorar a performance e permitir funcionamento offline.

### 5.2 ErrorHandler
Trata e exibe mensagens de erro de forma amigável para o usuário.

### 5.3 ServicesManager
Gerencia o carregamento e exibição dinâmica dos serviços.

### 5.4 PackagesManager
Gerencia os pacotes de serviços pré-definidos.

### 5.5 QuotesManager
Gerencia a criação e envio de orçamentos.

### 5.6 GalleryManager
Gerencia a exibição da galeria de fotos.

### 5.7 VideosManager
Gerencia a exibição de vídeos em destaque.

### 5.8 MonitoringSystem
Monitora a saúde e performance da aplicação.

### 5.9 PerformanceOptimizer
Implementa otimizações de performance como lazy loading e throttling.

## 6. Integração com Supabase

O projeto utiliza Supabase para:
- Armazenamento de dados dos serviços
- Autenticação de administradores
- Storage de imagens
- Gerenciamento de orçamentos salvos

## 7. Estrutura de Dados

### 7.1 Serviços
Cada serviço possui:
- ID único
- Nome
- Descrição
- Categoria
- Preço por pessoa
- Imagem (opcional)
- Status (ativo/inativo)

### 7.2 Pacotes
Cada pacote possui:
- ID único
- Nome
- Descrição
- Tipo de evento
- Preço por pessoa
- Serviços incluídos
- Status (ativo/inativo)

### 7.3 Orçamentos
Cada orçamento possui:
- ID único
- Nome do cliente
- Email do cliente
- Telefone do cliente
- Tipo de evento
- Número de convidados
- Serviços selecionados
- Valor total
- Data de criação

## 8. Personalização

O sistema permite personalização através do painel administrativo:
- Adicionar/editar/excluir serviços
- Adicionar/editar/excluir pacotes
- Adicionar fotos à galeria
- Adicionar vídeos em destaque
- Configurar streaming ao vivo

## 9. Responsividade

O site é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- Mobile (até 767px)
- Tablet (768px a 1023px)
- Desktop (1024px ou mais)

## 10. Performance

Implementações de performance:
- Lazy loading de imagens
- Cache local com TTL
- Throttling e debouncing de eventos
- Minificação de código
- Otimização de assets

## 11. Acessibilidade

Recursos de acessibilidade implementados:
- ARIA labels para elementos visuais
- Contraste adequado de cores
- Navegação por teclado
- Textos descritivos para imagens

## 12. Segurança

Medidas de segurança:
- Validação de dados no frontend
- Sanitização de entradas
- Proteção contra XSS
- Autenticação segura para administradores

## 13. Manutenção

Para manter o sistema:
1. Atualizar dados dos serviços através do painel administrativo
2. Adicionar novas fotos e vídeos conforme necessário
3. Monitorar logs de erro
4. Atualizar dependências periodicamente

## 14. Deploy

O projeto está configurado para deploy automático no Vercel:
1. Commit e push para o repositório
2. Vercel detecta as mudanças e inicia o deploy
3. O site é atualizado automaticamente

## 15. Contato

Para suporte e dúvidas:
- Email: contato@buffetsobral.com
- Telefone: (85) 99999-9999