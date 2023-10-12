export default function handleApiError(error) {
    if (error.response.status === 422) {
        throw new Error(`Erro de resposta do servidor: email já cadastrado.`);
    }

    if (error.response) {
        // A solicitação foi feita, mas o servidor retornou um status diferente de 2xx
        throw new Error(`Erro de resposta do servidor: Status ${error.response.status}`);
    }

    if (error.request) {
        // A solicitação foi feita, mas não houve resposta do servidor
        throw new Error('Erro de rede: Não foi possível obter resposta do servidor', error.status);
    }

    // Algo aconteceu ao configurar a solicitação que desencadeou um erro
    throw new Error('Erro na solicitação: Não foi possível enviar a requisição');
};