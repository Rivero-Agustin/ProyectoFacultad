export const obtenerHorario = () => {
  const now = new Date();

  return `${now.getHours()}-${now.getMinutes()}`;
};
