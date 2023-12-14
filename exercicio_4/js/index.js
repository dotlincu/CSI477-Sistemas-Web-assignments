const getRepository = async (user) => {
    /* 
        Esta função vai faz um request na API aberta do github
        e retorna um array contendo as seguintes informações do usuário
        login, email, public_repos, followers, following
    */

    try{
        const url = `https://api.github.com/users`;
        const data = await fetch(`${url}/${user}`)
            .then((data) => data.json())
            .catch((err) => err.json());
        const { login, email, public_repos, followers, following } = data;
        return [login, email, public_repos, followers, following] ;
    } catch(e) {
        console.error(e);
    }   
};

const showError = (show) => {
    /*
        Criar uma função que mostre um erro ao usuário
        quando o usuário pesquisado não existir 
    */
    const errorText = document.getElementById("disable_text");
    if (show) {
        errorText.removeAttribute("hidden");
    } else {
        errorText.setAttribute("hidden", true);
    }
};

const insertRow = async () => {
    // Recupere o input digitado
    var nameValue = document.getElementById("github_name").value;

    const userInfos = await getRepository(nameValue);
    
    /*  
        Se o elemento login retornado pela função getRepository 
        for undefined, significa que o usuário não existe, então será
        mostrado ao usuário uma mensagem de erro
    */
    if (!userInfos[0]) {
        showError(true);
        return;
    }

    showError(false);

    // Adicione o usuário digitado na tabela de id "myTable"
    const tableBody = document.querySelector("#myTable tbody");
    const newRow = tableBody.insertRow();

    // Preencha as células com os dados do GitHub
    for (const userInfo of userInfos) {
    const newCell = newRow.insertCell();
    newCell.textContent = userInfo || "N/A";
    }
}
