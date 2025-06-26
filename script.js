// Base de dados de teste
const testData = [
    { nome: "Ana Silva Santos", telefone: "(11) 99999-1234", email: "ana.silva@email.com" },
    { nome: "Carlos Oliveira", telefone: "(11) 98888-5678", email: "carlos.oliveira@email.com" },
    { nome: "Maria José Costa", telefone: "(11) 97777-9012", email: "maria.costa@email.com" },
    { nome: "João Pedro Lima", telefone: "(11) 96666-3456", email: "joao.lima@email.com" },
    { nome: "Fernanda Souza", telefone: "(11) 95555-7890", email: "fernanda.souza@email.com" },
    { nome: "Ricardo Mendes", telefone: "(11) 94444-1234", email: "ricardo.mendes@email.com" },
    { nome: "Patrícia Alves", telefone: "(11) 93333-5678", email: "patricia.alves@email.com" },
    { nome: "Bruno Carvalho", telefone: "(11) 92222-9012", email: "bruno.carvalho@email.com" },
    { nome: "Juliana Pereira", telefone: "(11) 91111-3456", email: "juliana.pereira@email.com" },
    { nome: "Marcos Antonio", telefone: "(11) 90000-7890", email: "marcos.antonio@email.com" },
    { nome: "Luciana Barbosa", telefone: "(11) 89999-1234", email: "luciana.barbosa@email.com" },
    { nome: "Rafael Torres", telefone: "(11) 88888-5678", email: "rafael.torres@email.com" },
    { nome: "Camila Rodrigues", telefone: "(11) 87777-9012", email: "camila.rodrigues@email.com" },
    { nome: "Diego Nascimento", telefone: "(11) 86666-3456", email: "diego.nascimento@email.com" },
    { nome: "Adriana Ferreira", telefone: "(11) 85555-7890", email: "adriana.ferreira@email.com" }
];

// Variável para armazenar os dados atuais
let currentData = [];

// Função para embaralhar array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Função para selecionar dados aleatórios
function getRandomData() {
    const shuffled = shuffleArray(testData);
    const numberOfItems = Math.floor(Math.random() * 8) + 5; // Entre 5 e 12 itens
    return shuffled.slice(0, numberOfItems);
}

// Função para atualizar a tabela
function updateTable() {
    const tableBody = document.getElementById('table-body');
    const loadingDiv = document.getElementById('loading');
    
    // Mostrar loading
    loadingDiv.style.display = 'block';
    
    // Simular delay de carregamento
    setTimeout(() => {
        // Gerar novos dados
        currentData = getRandomData();
        
        // Limpar tabela
        tableBody.innerHTML = '';
        
        // Adicionar novos dados
        currentData.forEach((person, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${person.nome}</td>
                <td>${person.telefone}</td>
                <td>${person.email}</td>
            `;
            
            // Adicionar animação escalonada
            setTimeout(() => {
                row.classList.add('fade-in');
                tableBody.appendChild(row);
            }, index * 100);
        });
        
        // Atualizar timestamp
        updateTimestamp();
        
        // Esconder loading
        loadingDiv.style.display = 'none';
        
    }, 1000); // 1 segundo de delay para simular carregamento
}

// Função para atualizar o timestamp
function updateTimestamp() {
    const lastUpdateElement = document.getElementById('last-update');
    const now = new Date();
    const timeString = now.toLocaleTimeString('pt-BR');
    lastUpdateElement.textContent = timeString;
}

// Função para modificar alguns dados aleatoriamente
function modifyRandomData() {
    if (currentData.length === 0) return;
    
    // Modificar alguns nomes aleatoriamente
    const modifications = [
        { suffix: " Jr.", prefix: "" },
        { suffix: " Neto", prefix: "" },
        { suffix: "", prefix: "Dr. " },
        { suffix: "", prefix: "Dra. " },
        { suffix: " Silva", prefix: "" },
        { suffix: " Santos", prefix: "" }
    ];
    
    currentData.forEach(person => {
        if (Math.random() < 0.3) { // 30% de chance de modificar
            const mod = modifications[Math.floor(Math.random() * modifications.length)];
            person.nome = mod.prefix + person.nome.split(' ')[0] + ' ' + 
                         person.nome.split(' ').slice(1).join(' ') + mod.suffix;
        }
    });
}

// Função de inicialização
function init() {
    // Primeira carga de dados
    updateTable();
    
    // Configurar atualização automática a cada 10 segundos
    setInterval(() => {
        modifyRandomData();
        updateTable();
    }, 10000);
}

// Aguardar o DOM estar pronto
document.addEventListener('DOMContentLoaded', init);

// Adicionar indicador visual de que os dados estão sendo atualizados
let updateCounter = 1;
setInterval(() => {
    const cityElement = document.getElementById('city-name');
    const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador', 'Brasília'];
    cityElement.textContent = cities[updateCounter % cities.length];
    updateCounter++;
}, 30000); // Muda a cidade a cada 30 segundos