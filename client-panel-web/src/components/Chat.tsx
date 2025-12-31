import { useState } from "react";
import "../App.css";
import { InputGroup, InputGroupInput } from "./ui/input-group";

function Chat() {
  const [mensagem, setMensagem] = useState("");
  const [resposta, setResposta] = useState("Olá, como posso ajudar?");

  const enviarMensagem = async () => {
    const res = await fetch("http://localhost:5000/backend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensagem }),
    });

    const data = await res.json();
    setResposta(data.resposta);
    setMensagem("");
  };

  return (
    <div className="body">
      <div className="mainContent">
        <h2>Agente de IA </h2>
        <div id="respostaAI">
          <strong>Agente Smith:</strong> {resposta}
        </div>
        <InputGroup />
      </div>
    </div>
  );
}

export default Chat;
