const API = "https://backend-api-moodjournal.onrender.com/moods";

async function carregarMoods() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    console.log("Dados recebidos:", data); // 👈 DEBUG

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    if (data.length === 0) {
      lista.innerHTML = "<p>Nenhum registro ainda 💔</p>";
      return;
    }

    data.reverse().forEach(mood => {
      lista.innerHTML += `
        <div class="mood-item">
          <strong>${mood.humor}</strong> - Nota: ${mood.nota}<br>
          <small>${new Date(mood.data).toLocaleDateString()}</small>
          <p>${mood.descricao || ""}</p>

          <div class="actions">
            <button class="edit" onclick="editarMood(${mood.id})">Editar</button>
            <button class="delete" onclick="deletarMood(${mood.id})">Excluir</button>
          </div>
        </div>
      `;
    });

  } catch (erro) {
    console.error("Erro ao carregar:", erro);
  }
}

async function salvarMood() {
  const humor = document.getElementById("humor").value;
  const nota = Number(document.getElementById("nota").value);
  const descricao = document.getElementById("descricao").value;

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ humor, nota, descricao })
  });

  limparForm();
  carregarMoods();
}

async function deletarMood(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  carregarMoods();
}

async function editarMood(id) {
  const novoHumor = prompt("Novo humor:");
  const novaNota = prompt("Nova nota:");
  const novaDescricao = prompt("Nova descrição:");

  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      humor: novoHumor,
      nota: novaNota,
      descricao: novaDescricao
    })
  });

  carregarMoods();
}

function limparForm() {
  document.getElementById("humor").value = "";
  document.getElementById("nota").value = "";
  document.getElementById("descricao").value = "";
}

// inicialização SPA
carregarMoods();