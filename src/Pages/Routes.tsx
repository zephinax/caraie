import Home from './Home/Home';
import Category from './Category/Category';
import CarDetail from './CarDetail/CarDetail';
import Favorites from './Favorites/Favorites';
import { RouteObject, Navigate } from 'react-router-dom';

const Routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/category', element: <Category /> },
  { path: '/Category', element: <Category /> },
  { path: '/detail/:CarId', element: <CarDetail /> },
  { path: '/favorites', element: <Favorites /> },
  { path: '/Favorites', element: <Favorites /> },
  { path: '*', element: <Navigate to='/' /> },
];

export default Routes;
