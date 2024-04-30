import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
  //For Translation
  const { t } = useTranslation();

  return (
    <div id="menu">
      <div className="menu-items">
        <Link to="/paint" className="menu-item">
          <h1>{t("homePage.Paint")}</h1>
        </Link>
        <Link to="/settings" className="menu-item">
          {t("homePage.Settings")}
        </Link>
        <Link to="/about" className="menu-item">
          {t("homePage.About")}
        </Link>
        <Link to="/contact" className="menu-item">
          {t("homePage.Contact")}
        </Link>
      </div>
      <div id="menu-background"></div>
    </div>
  );
};

export default Home;
