const axios = require("axios");

const RENDER_API = "https://api.render.com/v1/services";
const SERVICE_ID = process.env.SERVICE_ID;
const API_KEY = process.env.API_KEY;

const headers = {
  Authorization: `Bearer ${API_KEY}`,
};

async function suspendService() {
  try {
    await axios.post(`${RENDER_API}/${SERVICE_ID}/suspend`, {}, { headers });
    console.log("Serviço suspenso com sucesso às", new Date().toLocaleString());
  } catch (error) {
    console.error("Erro ao suspender:", error.response?.data || error.message);
    process.exit(1);
  }
}

async function resumeService() {
  try {
    await axios.post(`${RENDER_API}/${SERVICE_ID}/resume`, {}, { headers });
    console.log("Serviço reativado com sucesso às", new Date().toLocaleString());
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
