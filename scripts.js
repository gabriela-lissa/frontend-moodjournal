const API = "https://backend-api-moodjournal.onrender.com";

async function carregar() {
  const res = await fetch(API);
  const data = await res.json();

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  data.forEach(m => {
    lista.innerHTML += `
      <div>
        ${m.humor} (${m.nota})
      </div>
    `;
  });
}

async function criar() {
  const humor = document.getElementById("humor").value;
  const nota = document.getElementById("nota").value;
  const descricao = document.getElementById("descricao").value;

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ humor, nota, descricao })
  });

  carregar();
}

carregar();