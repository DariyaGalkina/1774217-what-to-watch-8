export type FilmCardProps = {
  id: number,
  filmName: string,
  preview: string,
  onMouseEnter: (id: number | null) => void,
};
