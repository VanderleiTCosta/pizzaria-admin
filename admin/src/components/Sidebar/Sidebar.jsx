import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Adicionar Profissional</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Listar Profissionais</p>
        </NavLink>
        <NavLink to="/category" className="sidebar-option">
          {" "}
          <img src={assets.add_icon} alt="" /> <p>Categorias</p>
        </NavLink>
        <NavLink to="/state" className="sidebar-option">
          {" "}
          
          <img src={assets.order_icon} alt="" />{" "}
          <p>Estados</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
