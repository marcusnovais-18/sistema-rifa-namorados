# 💝 Sistema Web Automatizado para Rifa Beneficente (Dia dos Namorados - Restaurante Hannover)

Este é um sistema Full-Stack desenvolvido para automatizar a arrecadação de fundos do grupo de jovens da minha igreja através de uma rifa online, eliminando o uso de canhotos de papel e o controle manual em planilhas.

🔗 **Links do Projeto em Produção:**
* **Site da Rifa (Público):** (https://zippy-rifahannover-91de4a.netlify.app)
* **Painel de Controle (Admin):** (https://paineldecontrole-rifahannover.netlify.app)

## 🎯 O Problema de Negócio
 Tradicionalmente, a venda de rifas para eventos da minha igreja utilizava blocos de papel e canhotos físicos, exigindo distribuição manual aos jovens, controle por mensagens de WhatsApp e anotações em cadernos ou planilhas desconexas. Esse método gerava alto atrito operacional, risco de perda de bilhetes e dificuldade no acompanhamento em tempo real do caixa.

## 💡 A Solução e Arquitetura
Desenvolvi uma plataforma web interativa dividida em duas frentes integradas:

1. **Landing Page de Vendas (Pública):** Um site leve e responsivo onde o participante visualiza os detalhes do prêmio (Jantar Romântico no restaurante Hannover), confere os dados de pagamento via Pix, escolhe seu número de forma visual (de 01 a 150) com um clique e preenche seus dados para reserva instantânea.
2. **Dashboard de Controle (Admin):** Um painel gerencial exclusivo para a liderança que monitora em tempo real métricas-chave (Total de Compradores, Números Vendidos e Restantes) além de uma tabela detalhada com o nome, WhatsApp e data/hora da reserva de cada participante.

## 🤖 Uso de Inteligência Artificial e Desenvolvimento
O escopo, a regra de negócio do sorteio e a experiência do usuário foram idealizados por mim. Para otimizar o tempo de entrega e estruturar a lógica dos scripts de forma limpa e sem erros, utilizei a **IA do Google Gemini** como ferramenta de auxílio na construção e refatoração do código frontend e na lógica de integração.

## 🛠️ Tecnologias Utilizadas
* **Front-end:** HTML5, CSS3, JavaScript (Vanilla) para interatividade dinâmica da escolha de números.
* **Banco de Dados em Tempo Real (BaaS):** Firebase para sincronização instantânea entre a escolha do usuário no site e a atualização no painel de controle.
* **Hospedagem e Deploy:** Netlify para publicação contínua das aplicações web.
