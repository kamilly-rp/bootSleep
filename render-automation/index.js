const axios = require("axios");

const RENDER_API = "https://api.render.com/v1/services";
const SERVICE_ID = process.env.SERVICE_ID;
const API_KEY = process.env.API_KEY;

if (!SERVICE_ID || !API_KEY) {
  console.error("Erro: SERVICE_ID ou API_KEY não definidos nas variáveis de ambiente.");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${API_KEY}`,
};

// Função para mostrar horário no formato brasileiro
function getHoraBrasil() {
  const dataBrasil = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
  );
  return dataBrasil.toLocaleString("pt-BR", { hour12: false });
}

async function suspendService() {
  try {
    console.log("Suspending service...");
    await axios.post(`${RENDER_API}/${SERVICE_ID}/suspend`, {}, { headers });
    console.log(`Serviço suspenso com sucesso às ${getHoraBrasil()} (Horário de Brasília)`);
  } catch (error) {
    console.error("Erro ao suspender:", error.response?.data || error.message);
    process.exit(1);
  }
}

async function resumeService() {
  try {
    console.log("Resuming service...");
    await axios.post(`${RENDER_API}/${SERVICE_ID}/resume`, {}, { headers });
    console.log(`Serviço reativado com sucesso às ${getHoraBrasil()} (Horário de Brasília)`);
  } catch (error) {
    console.error("Erro ao reativar:", error.response?.data || error.message);
    process.exit(1);
  }
}

(async () => {
  const action = process.argv[2];
  if (action === "suspend") {
    await suspendService();
  } else if (action === "resume") {
    await resumeService();
  } else {
    console.error("Ação inválida. Use: suspend ou resume");
    process.exit(1);
  }
})();
