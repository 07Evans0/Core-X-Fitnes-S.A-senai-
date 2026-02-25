const express = require("express");
const router = express.Router();

router.get('/planos', (req, res) => {
  res.send(`[
  {
    "titulo": "Plano basico",
    "valor": 89.9,
    "descricao": [
      "Acesso à área de musculação",
      "Horários flexíveis"
    ]
  },
  {
    "titulo": "Plano intermediario",
    "valor": 109.9,
    "descricao": [
      "Acesso à área de musculação",
      "Aulas em grupo (Zumba, Pilates)",
      "Acesso aos vestiários premium"
    ]
  },
  {
    "titulo": "Plano Avançado",
    "valor": 129.9,
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
