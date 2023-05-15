import router from '../libs/router';
import { detailScript, DetailView, homeScript, HomeView } from "../controllers/Todo";

export default router([
  {
    path: '/',
    view: HomeView,
    script: homeScript
  },
  {
    path: '/detail',
    view: DetailView,
    script: detailScript
  },
]);
