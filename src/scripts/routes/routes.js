import Main from '../views/pages/main';
import Detail from '../views/pages/detail';
import Favorite from '../views/pages/Favorite';

const routes = {
  '/': Main, // default page
  '/home': Main, // default page
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default routes;
