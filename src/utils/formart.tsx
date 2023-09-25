
export const formartDateDDMMYYYY = (date: Date): string => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const formartDDMMYYYToDateTime = (data: any) => {
  if (data) return new Date(data);
  return null;
};

export const formatDateYYYYDDMM = (data: string) => {
  if (data) {
    let mes = data.split("/")[0];
    let dia = data.split("/")[1];
    let ano = data.split("/")[2].substring(0, 4);
    return ano + "-" + ("0" + mes).slice(-2) + "-" + ("0" + dia).slice(-2);
  }
  return null;
};

export const addMaskCNPJ = (cnpj): string => {
  let x = cnpj.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
  cnpj = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');
  return cnpj;
}

// 00000-000
export const addMaskCEP = value => {
  if (value) {
    return value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2");
  }
  return value;
}

export const removeMaskDocument = (document: string): string => {
  if (document) {
    document = document.replaceAll("/", "");
    document = document.replaceAll(".", "");
    document = document.replaceAll("-", "");
  }
  return document;
}

export const currencyFormatter = (value: any) => {
  if (!Number(value)) return "";

  const amount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);

  return `${amount}`;
};

export const currencyLabelFormatter = (value: any) => {
  if (!Number(value)) return "R$ 0,00";

  const amount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);

  return `${amount}`;
};

export const currencyLabelTotalFormatter = (value: any) => {
  if (!Number(value)) return "R$ 0,00";

  const amount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

  return `${amount}`;
};

export const formatPercentage = (value: any) => {
  if (!Number(value)) return "";

  const amount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);

  return `${amount}`.replaceAll("R$", "");
};

export const currencyNumber = (value: any) => {
  if (!Number(value)) return "";
  return value.replace(/([^\d])+/gim, '');
};

export const countNumber = (value: string): number => {
  return (value.match(/[1-9]/g) || []).length;
};

export const countUpperCase = (value: string): number => {
  return (value.match(/[A-Z]/g) || []).length;
};

export const countLowerCase = (value: string): number => {
  return (value.match(/[a-z]/g) || []).length;
};

export const countCharacterSpecial = (value: string): number => {
  const noSpecialChars = value.replace(/[^a-zA-Z0-9 ]/g, '#');
  return (noSpecialChars.match(new RegExp("#", "g")) || []).length;
};

export const removeFormatMoney = (value: string) => {
  if (value) {
    let formatValue = value.replace("R$ ", "").replace(/\D/g, "");
    const slice = formatValue.length - 2;
    formatValue = [formatValue.slice(0, slice), ".", formatValue.slice(slice, formatValue.length)].join("");

    return Number(formatValue);
  }
  return 0;
};



export const valorAbreviado = (num: number, digits: number) => {
  let units = ['mil', 'Mi', 'Bi'],
    decimal;

  for (let i = units.length - 1; i >= 0; i--) {
    decimal = Math.pow(1000, i + 1);

    if (num <= -decimal || num >= decimal) {
      return +(num / decimal).toFixed(digits) + units[i];
    }
  }

  return num;
}
