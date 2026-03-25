// Armazenamento temporário em memória
let itensDoCarrinho = [];

const carrinhoControle = {
    // Listar itens e calcular o total
    listarTudo: (req, res) => {
        const valorTotal = itensDoCarrinho.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
        res.status(200).json({
            carrinho: itensDoCarrinho,
            total: valorTotal.toFixed(2)
        });
    },

    // Adicionar produto ao carrinho
    adicionar: (req, res) => {
        const { id, nome, preco, quantidade } = req.body;

        if (!id || !nome || !preco) {
            return res.status(400).json({ mensagem: "Erro: Informe ID, Nome e Preço." });
        }

        const indice = itensDoCarrinho.findIndex(item => item.id === id);

        if (indice > -1) {
            itensDoCarrinho[indice].quantidade += (quantidade || 1);
        } else {
            itensDoCarrinho.push({ id, nome, preco, quantidade: quantidade || 1 });
        }

        res.status(201).json({ mensagem: "Produto adicionado!", carrinho: itensDoCarrinho });
    },

    // Remover um item específico pelo ID
    remover: (req, res) => {
        const { id } = req.params;
        itensDoCarrinho = itensDoCarrinho.filter(item => item.id !== parseInt(id));
        res.status(200).json({ mensagem: "Produto removido com sucesso." });
    },

    // Limpar todo o carrinho
    limpar: (req, res) => {
        itensDoCarrinho = [];
        res.status(200).json({ mensagem: "Carrinho esvaziado." });
    }
};

module.exports = carrinhoControle;