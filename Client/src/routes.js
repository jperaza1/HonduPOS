import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";

const dashboardRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: "pe-7s-piggy",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/inventario",
    name: "Inventario",
    icon: "pe-7s-notebook",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/reporteria",
    name: "Reporteria",
    icon: "pe-7s-graph",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/pos",
    name: "POS",
    icon: "pe-7s-calculator",
    component: UserProfile,
    layout: "/admin",
  },
];

export default dashboardRoutes;
