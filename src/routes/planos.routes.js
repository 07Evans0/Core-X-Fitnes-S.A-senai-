const express = require("express");
const router = express.Router();

router.get('/planos', (req, res) => {
  res.send(`[
  {
    "id": 1,
    "titulo": "Plano basico",
    "valor": 89.90,
    "descricao": [
      "Acesso à área de musculação",
      "Horários flexíveis"
    ]
  },
  {
    "id": 2,
    "titulo": "Plano intermediario",
    "valor": 109.90,
    "descricao": [
      "Acesso à área de musculação",
      "Aulas em grupo (Zumba, Pilates)",
      "Acesso aos vestiários premium"
    ]
  },
  {
    "id": 3,
    "titulo": "Plano Avançado",
    "valor": 129.90,
    "descricao": [
      "Acesso total e irrestrito",
      "Todas as aulas em grupo",
      "Acesso aos vestiários premium",
      "Avaliação física mensal"
    ]
  }
]`)
});

module.exports = router;
