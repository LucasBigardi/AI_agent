from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

#Criando Objeto da OpenAI, Inicializando o flask, ativando CORS, criando variavel de contexto e função do agente, e criando uma lista de histórico para sessão com o agente.
ai = OpenAI(api_key="")
app = Flask(__name__) 
CORS(app) 
assunto =  (
            "Você é um técnico em informática experiente, especializado em troubleshooting de computadores, "
            "sistemas operacionais, redes e hardware. Ofereça ajuda passo a passo, com paciência e clareza. "
            "Faça perguntas para entender melhor o problema antes de dar uma solução. Evite assuntos fora da TI."
            )
historico = [
    {"role": "system", "content": assunto}
]

def salvar_mensagem_usuario(mensagem):
    historico.append({"role": "user", "content": mensagem})

def salvar_resposta_assistente(resposta):
    historico.append({"role": "assistant", "content": resposta})


@app.route("/backend", methods=["POST"]) 
def resposta():
    dados = request.get_json()
    mensagem_front = dados.get("mensagem")
    mensagem = mensagem_front.lower()
    
    salvar_mensagem_usuario(mensagem)
    resposta = ai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=historico,
        max_tokens=250
    )
    conteudo = resposta.choices[0].message.content

    salvar_resposta_assistente(conteudo)

    return jsonify({"resposta": conteudo})

if __name__ == "__main__":
    app.run(port=5000)
