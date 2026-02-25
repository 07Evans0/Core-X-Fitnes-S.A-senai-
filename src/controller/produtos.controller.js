async function getAllProducts(req, res, next) {
  try {
    const produtos = [
      {
        "id": 1,
        "nome": "Garrafinha Térmica CoreX",
        "preco": 69.90,
        "descricao": "Garrafa de aço inoxidável 500ml, mantém a água gelada por até 12 horas."
      },
      {
        "id": 2,
        "nome": "Toalha de Rosto",
        "preco": 25.00,
        "descricao": "Toalha preta de algodão macio, ideal para secar o suor durante o treino."
      },
      {
        "id": 3,
        "nome": "Cápsulas de Cafeína (60 caps)",
        "preco": 45.00,
        "descricao": "Termogênico potente para aumentar o foco e a queima de gordura."
      },
      {
        "id": 4,
        "nome": "Camisa Oficial Aluno CoreX",
        "preco": 49.90,
        "descricao": "Tecido dry-fit leve e respirável, disponível em vários tamanhos."
      },
      {
        "id": 5,
        "nome": "Creatina em Cápsulas (120 caps)",
        "preco": 89.90,
        "descricao": "Auxilia no ganho de força e explosão muscular. Pote de 1kg equivalente."
      },
      {
        "id": 6,
        "nome": "Whey Protein Isolado - Chocolate",
        "preco": 140.00,
        "descricao": "Proteína de alto valor biológico, 1kg. Sabor chocolate suíço."
      },
      {
        "id": 7,
        "nome": "Whey Protein Isolado - Morango",
        "preco": 140.00,
        "descricao": "Proteína de alto valor biológico, 1kg. Sabor morango silvestre."
      },
      {
        "id": 8,
        "nome": "Pré-Treino Explosive",
        "preco": 115.00,
        "descricao": "Fórmula avançada para energia máxima e pump muscular."
      },
      {
        "id": 9,
        "nome": "Barra de Proteína (Unidade)",
        "preco": 12.00,
        "descricao": "Snack rápido com 20g de proteína. Sabor Cookies & Cream."
      },
      {
        "id": 10,
        "nome": "Strap de Levantamento de Peso",
        "preco": 35.00,
        "descricao": "Acessório para melhorar a pegada em exercícios de tração como o terra."
      }
    ];

    res.send(produtos);
  } catch (e) {
    next(e);
  }
}

module.exports = { getAllProducts };