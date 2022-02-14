console.log("Hello World!");

//Comentários
/* ou assim */
//const nome = "Erick"; = variável constante/imutável
//let idade = 22; = variável
//console.log(nome); = igual ao print do Python
// "Or" é || e "And" é && 

//Isso é igual a um dicionário de certa forma no Python, abre-se com {}
const Erick = {
    Nome: "Erick",
    Idade: 22,
    Cidade: "Jundiaí",   
    Sexo: "Masculino"
}

console.log(Erick.Nome, Erick.Idade, Erick.Cidade, Erick.Sexo)

//Isso é um array
const TesteArray = ["Valor 1", "Valor 2", "Valor 3", "Valor 4"]
//Pra adicionar items ao array é só fazer Array.push, exemplo:

TesteArray.push("Erick", "Teste deu certo");

console.log(TesteArray);

//if (condicao == condicao){
//    condicao if true;  
//} else {
//    condicao if false;
//}
// Pode-se fazer em uma linha só também assim:
// if(condicao == True){Fazer isso}else{fazer isso}
//Not é !. Exemplo: if (!condicao){fazer isso}
//Exemplo de for: for (let i = 0; i < 5, i++){
                        //fazer isso;
                //}
//Função
function DarOi5Vezes(nome){
    for (let i = 0; i < 5; i++){
        console.log("Oi " + nome)
    }
}

DarOi5Vezes("Erick")

const BotaoTeste = document.getElementById("Teste");
console.log(BotaoTeste);

function ClicouBotao(event){
    console.log("Você clicou neste botão!");
    console.log(event)
}

BotaoTeste.addEventListener("click", ClicouBotao)