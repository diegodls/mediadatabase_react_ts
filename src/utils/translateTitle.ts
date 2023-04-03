export function translateTitle(title: string): string {
  switch (title) {
    case "Action & Adventure":
      return "Ação e Aventura";
    case "News":
      return "Noticias";
    case "Sci-Fi & Fantasy":
      return "Ficção e Fantasia";
    case "War & Politics":
      return "Guerra e Politica";
    case "Talk":
      return "Conversa";

    default:
      return title;
  }
}
