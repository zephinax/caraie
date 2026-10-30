import Routes from './Pages/Routes';
import { useRoutes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { FavoritesProvider } from './Context/FavoritesContext';

export default function App() {
  const router = useRoutes(Routes);
  return (
    <FavoritesProvider>
      <Header />
      {router}
      <Footer />
    </FavoritesProvider>
  );
}
