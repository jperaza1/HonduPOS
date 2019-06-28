import Dashboard from "views/Dashboard";
import Inventario from "views/Inventario";
import Reporteria from "views/Reporteria";
import Pos from "views/Pos";

const dashboardRoutes = [
  {
    path: "/inicio",
    name: "Inicio",
    icon: "pe-7s-piggy",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/inventario",
    name: "Inventario",
    icon: "pe-7s-notebook",
    component: Inventario,
    layout: "/admin",
  },
  {
    path: "/reporteria",
    name: "Reporteria",
    icon: "pe-7s-graph2",
    component: Reporteria,
    layout: "/admin",
  },
  {
    path: "/pos",
    name: "POS",
    icon: "pe-7s-calculator",
    component: Pos,
    layout: "/admin",
  },
];

export default dashboardRoutes;
