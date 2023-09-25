export const CorreiosAPI = (cep: string): Promise<any> => {
  
  return fetch(`https://viacep.com.br/ws/${cep}/json/`);
  
};