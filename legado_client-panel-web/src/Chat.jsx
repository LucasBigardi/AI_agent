import { useState } from "react";

function Chat() {
  const [mensagem, setMensagem] = useState("");
  const [resposta, setResposta] = useState("Olá, como posso ajudar?");

  const enviarMensagem = async () => {
    const res = await fetch("http://localhost:5000/backend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensagem })
    });

    const data = await res.json();
    setResposta(data.resposta);
    setMensagem("")
  };

  return (
  <div className="body"> 
  <div className="mainContent">
    <h2>Bem vindo à Matrix</h2>
    <div id="respostaAI">
      <strong>Agente Smith:</strong> {resposta}

    </div>
    <div class="botaocaixa">
      <input
        id="caixaPergunta" 
        type="text"
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter"){
            enviarMensagem();
          }
        }}
        placeholder="  Pergunte ao Agente Smith"
      />
      <button onClick={enviarMensagem} id="botaoenviar">
        Enviar
      </button>
    </div>
  </div>
</div>
  );
}

export default Chat;
