import MainPage from '../main-page/main-page';
import { AppProps } from './type';

export default function App({filmInfo}: AppProps): JSX.Element {
  const {name, genre, release} = filmInfo;

  return (
    <MainPage filmName={name} filmGenre={genre} filmRelease={release}/>
  );
}
