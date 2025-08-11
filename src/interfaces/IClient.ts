export interface IClient {
  id: string;
  razaoSocial: string;
  cnpj: string;
  nomeFantasia: string;
  tags: string[];
  status: 'Ativo' | 'Inativo';
  conectaPlus: 'Sim' | 'Não';
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}
