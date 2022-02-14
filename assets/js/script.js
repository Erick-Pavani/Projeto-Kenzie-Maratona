const ListaContatosLocal = [];
ListaContatosLocal.lenght = 0;
let id = 0;
let chave = 0;
MyStorage = localStorage;

//Storage cleaner
//MyStorage.clear();

//Lists
const ListaContatosContainer = document.querySelector(".SectionListaContatos_List");

//Inputs
const CampoNome = document.getElementById("CampoNome");
const CampoEmail = document.getElementById("CampoEmail");
const CampoTelefone = document.getElementById("CampoTelefone");

//Buttons
const btnAdd = document.getElementById("btnAdd");

//Functions

function BaixarStorage(){
    DownloadStorage = {
        id: MyStorage.getItem("Id" + chave),
        nome: MyStorage.getItem("Nome" + chave),
        email: MyStorage.getItem("Email" + chave),
        telefone: MyStorage.getItem("Telefone" + chave)
    }
    chave++;
    return DownloadStorage
}

function AddNewContact(){
    const ValorNome = CampoNome.value;
    const ValorEmail = CampoEmail.value;
    const ValorTelefone = CampoTelefone.value;
    
    if(!ValorNome || !ValorEmail || !ValorTelefone){
        alert("Favor digitar algo nos 3 campos do formulário!")
    } else {
        const NovoContato = {
            id: id,
            nome: ValorNome,
            email: ValorEmail,
            telefone: ValorTelefone
        };

        JSON.stringify(NovoContato);
        MyStorage.setItem("Id"  + NovoContato.id, NovoContato.id);
        MyStorage.setItem("Nome"  + NovoContato.id, NovoContato.nome);
        MyStorage.setItem("Email"  + NovoContato.id, NovoContato.email);
        MyStorage.setItem("Telefone"  + NovoContato.id, NovoContato.telefone);    
        id++;
        ListaContatosLocal.push(NovoContato);
        RenderLayout();
    }
}

function RenderLayout(){
    ListaContatosContainer.innerHTML = "";

    if(ListaContatosLocal.length !== 0){
        for (let i = 0; i < ListaContatosLocal.length; i++) {
            CreateLayout(ListaContatosLocal[i]);
        }
    } else if (ListaContatosLocal.length == 0 && MyStorage.length > 1){
        let keys = Object.keys(MyStorage);
        for (let i = 0; i < ((keys.length - 1) / 4 ); i++) {
            const Downloaded = BaixarStorage();
            ListaContatosLocal.push(Downloaded);
            CreateLayout(ListaContatosLocal[i]);
        }
        id = ((keys.length - 1) / 4 );
    } else {
        const ListaContatosVazia = `<li>
            <p>Não há contatos na sua lista! </p>
        </li>`;

        ListaContatosContainer.innerHTML = ListaContatosVazia;
    }
}

RenderLayout();

function CreateLayout(contato){

    const li = document.createElement("li");
    const Button = document.createElement("Button");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    const span = document.createElement("span");

    Button.id= "RemoverContato";
    Button.addEventListener("click", RemoveContato)

    li.dataset.id = contato.id;
    h2.innerText = contato.nome;
    p.innerText = contato.email
    span.innerText = contato.telefone;

    li.appendChild(Button);
    li.appendChild(h2);
    li.appendChild(p);
    li.appendChild(span);

    ListaContatosContainer.appendChild(li)
}

function RemoveContato(evento){
    const BotaoClicado = evento.target;
    const ContatoClicado = BotaoClicado.parentElement;
    const idContatoClicado = ContatoClicado.dataset.id;
    const ContatoRemovido = ListaContatosLocal.find((contato) => contato.id == idContatoClicado);
    const posicaoContatoRemovido = ListaContatosLocal.indexOf(ContatoRemovido);
    ListaContatosLocal.splice(posicaoContatoRemovido, 1);
    MyStorage.removeItem("Id" + idContatoClicado);
    MyStorage.removeItem("Nome" + idContatoClicado);
    MyStorage.removeItem("Email" + idContatoClicado);
    MyStorage.removeItem("Telefone" + idContatoClicado);
    for (let i = 0; i < (ListaContatosLocal.length + 1); i++){
        if (i > idContatoClicado) {
            const NewId = MyStorage.getItem("Id" + i);
            const NewNome = MyStorage.getItem("Nome" + i);
            const NewEmail = MyStorage.getItem("Email" + i);
            const NewTelefone = MyStorage.getItem("Telefone" + i);
            let a = ListaContatosLocal.find((contato) => contato.id == i);
            a.id -= 1;
            MyStorage.removeItem("Id" + i);
            MyStorage.removeItem("Nome" + i);
            MyStorage.removeItem("Email" + i);
            MyStorage.removeItem("Telefone" + i);
            MyStorage.setItem("Id" + (i - 1), NewId - 1);
            MyStorage.setItem("Nome" + (i - 1), NewNome);
            MyStorage.setItem("Email" + (i - 1), NewEmail);
            MyStorage.setItem("Telefone" + (i - 1), NewTelefone);
        }
    }
    RenderLayout();
}

btnAdd.addEventListener("click", AddNewContact);