// Composable para gerenciar vendedores

export const sellers = [
  {
    name: 'Bruna',
    phone: '5511970489098',
  },
];

export function getSellerByName(name) {
  return sellers.find((seller) => seller.name === name);
}

export function getAllSellers() {
  return sellers;
}
