// 1. SUAS CHAVES DO FIREBASE REAIS
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
    const gridNumeros = document.getElementById("grid-numeros");
    const totalNumeros = 150; 

    // 3. Cria a grade de números na tela
    for (let i = 1; i <= totalNumeros; i++) {
        const btn = document.createElement("div");
        btn.classList.add("numero");
        btn.id = `num-${i}`;
        btn.textContent = i;
        gridNumeros.appendChild(btn);

        // 4. Ação ao clicar no número
        btn.addEventListener("click", () => {
            if (btn.classList.contains("vendido")) {
                Swal.fire('Oops...', 'Este número já foi reservado por outra pessoa!', 'warning');
                return;
            }

            // Abre a caixa pedindo NOME e TELEFONE
            Swal.fire({
                title: `Reservar o Número ${i}`,
                html: `
                    <p style="margin-bottom: 15px; color: #555;">Por favor, preencha seus dados para contato:</p>
                    <input id="swal-nome" class="swal2-input" placeholder="Seu Nome Completo" style="margin-bottom: 10px;">
                    <input id="swal-telefone" class="swal2-input" placeholder="Seu WhatsApp (Ex: 11957521033)" type="tel">
                `,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonColor: '#4a0e1e',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar Reserva',
                cancelButtonText: 'Cancelar',
                preConfirm: () => {
                    const nome = document.getElementById('swal-nome').value;
                    const telefone = document.getElementById('swal-telefone').value;
                    
                    if (!nome || !telefone) {
                        Swal.showValidationMessage('Por favor, preencha o seu nome e o seu WhatsApp!');
                        return false;
                    }
                    return { nome: nome, telefone: telefone };
                }
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const dadosComprador = result.value;

                    // Mostra carregando para evitar dois cliques rápidos
                    Swal.fire({
                        title: 'Salvando sua reserva...',
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });

                    // Salva no Banco de Dados
                    rifaRef.child(i).set({
                        nome: dadosComprador.nome,
                        telefone: dadosComprador.telefone,
                        status: "reservado",
                        data: new Date().toLocaleString()
                    }).then(() => {
                        // DEU CERTO! Força o botão a ficar cinza IMEDIATAMENTE (força bruta no estilo para não depender do CSS)
                        btn.classList.add('vendido');
                        btn.style.backgroundColor = "#cccccc"; 
                        btn.style.color = "#666666";
                        btn.style.borderColor = "#999999";
                        btn.style.pointerEvents = "none";
                        btn.title = `Reservado por: ${dadosComprador.nome}`;

                        // Mostra o alerta do PIX atualizado (R$ 20,00)
                        Swal.fire({
                            title: 'Reserva Confirmada!',
                            html: `Ótima escolha, <strong>${dadosComprador.nome}</strong>!<br><br>
                                   Faça o PIX de <b>R$ 20,00</b> para a chave:<br>
                                   <code>Uma.ggjsc@gmail.com</code><br><br>
                                   E envie o comprovante para o WhatsApp: <b>(11) 95752-1033</b>`,
                            icon: 'success',
                            confirmButtonColor: '#4a0e1e'
                        });
                    }).catch((erro) => {
                        Swal.fire({
                            title: 'Erro de Conexão!',
                            text: 'Não foi possível salvar sua reserva. Tente novamente.',
                            icon: 'error'
                        });
                    });
                }
            });
        });
    }

    // 5. Ouve o Banco de Dados para pintar os botões que JÁ FORAM reservados
    rifaRef.on('value', (snapshot) => {
        const dadosBanco = snapshot.val();

        if (dadosBanco) {
            Object.keys(dadosBanco).forEach(numeroComprado => {
                const btn = document.getElementById(`num-${numeroComprado}`);
                if (btn && !btn.classList.contains('vendido')) {
                    btn.classList.add('vendido');
                    btn.style.backgroundColor = "#cccccc";
                    btn.style.color = "#666666";
                    btn.style.borderColor = "#999999";
                    btn.style.pointerEvents = "none";
                    btn.title = `Reservado por: ${dadosBanco[numeroComprado].nome}`;
                }
            });
        }
    });
});