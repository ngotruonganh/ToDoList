import Home from "../pages/Home";
import ParentTest from "../pages/ParentTest";
import Error from "../pages/Error";

const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/parenttest",
    component: ParentTest,
  },
  {
    path: "*",
    component: Error,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
