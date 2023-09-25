export function getClienteTipo(tipo: string):number {
  let tipoInteiro: number;
  switch (tipo) {
    case "Empresa":
      tipoInteiro = 1
      break;
    case "Escritorio":
      tipoInteiro = 2
     break;
    default:
      tipoInteiro = 3
      break;
  }

  return tipoInteiro;
}