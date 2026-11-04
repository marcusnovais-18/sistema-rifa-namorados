// 1. AS SUAS CHAVES DO FIREBASE EXATAS (Copiadas do seu script de vendas)
const firebaseConfig = {
  apiKey: "AIzaSyARJ-DbYM0FmoUj7EiKKKIOyLuZ3EUQxFU",
  authDomain: "rifa-hannover.firebaseapp.com",
  databaseURL: "https://rifa-hannover-default-rtdb.firebaseio.com",
  projectId: "rifa-hannover",
  storageBucket: "rifa-hannover.firebasestorage.app",
  messagingSenderId: "736580539031",
  appId: "1:736580539031:web:d85b8c93a22b38c34ecfd2",
  measurementId: "G-W8DX9VQ1MM"
};

// 2. Inicializa o Banco de Dados
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const rifaRef = database.ref('numeros_rifa');

document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("tableBody");
    const totalCompradoresEl = document.getElementById("totalCompradores");
    const numerosVendidosEl = document.getElementById("numerosVendidos");
    const numerosRestantesEl = document.getElementById("numerosRestantes");
    const totalRifa = 150; // Total de números disponíveis

    // 3. Ouve o Banco de Dados em tempo real
    rifaRef.on('value', (snapshot) => {
        const dadosBanco = snapshot.val();

        // Limpa a tabela antes de atualizar
        tableBody.innerHTML = "";
        let countVendidos = 0;
        let listaCompradoresArray = [];

        // Verifica se há dados
        if (!dadosBanco) {
            tableBody.innerHTML = `<tr><td colspan="4" class="loading-row">Nenhum número reservado ainda.</td></tr>`;
            totalCompradoresEl.textContent = "0";
            numerosVendidosEl.textContent = "0";
            numerosRestantesEl.textContent = totalRifa;
            return;
        }

        // 4. Processa os dados brutos e coloca em um Array para ordenar
        Object.keys(dadosBanco).forEach(numero => {
            const info = dadosBanco[numero];
            
            // Só adiciona se o status for 'reservado' (ou 'vendido')
            if (info.status === "reservado") {
                countVendidos++;
                
                // Monta um objeto limpo para o array
                listaCompradoresArray.push({
                    numero: parseInt(numero), // Converte pra número pra ordenar certo
                    nome: info.nome,
                    telefone: info.telefone,
                    data: info.data || "Sem data"
                });
            }
        });

        // 5. Ordena a lista pelo número (1, 2, 3...)
        listaCompradoresArray.sort((a, b) => a.numero - b.numero);

        // 6. Atualiza os Cartões de KPI
        totalCompradoresEl.textContent = listaCompradoresArray.length;
        numerosVendidosEl.textContent = countVendidos;
        numerosRestantesEl.textContent = totalRifa - countVendidos;

        // 7. Monta a tabela linha por linha
        if (listaCompradoresArray.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4" class="loading-row">Nenhum número reservado ainda.</td></tr>`;
            return;
        }

        listaCompradoresArray.forEach(comprador => {
            // Cria a linha (tr)
            const row = document.createElement("tr");

            // Cria e preenche as células (td)
            row.innerHTML = `
                <td class="numero-col">${comprador.numero}</td>
                <td>${comprador.nome}</td>
                <td class="telefone-col">${comprador.telefone}</td>
                <td>${comprador.data}</td>
            `;

            // Adiciona a linha na tabela
            tableBody.appendChild(row);
        });
    });
});