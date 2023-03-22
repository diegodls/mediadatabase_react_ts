export function formatDateFromString(date: string | undefined): string {
  if (date) {
    const fullDate = new Date(date);
    const dateInText = fullDate.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    return dateInText;
  }

  return "Data desconhecida!";
}
