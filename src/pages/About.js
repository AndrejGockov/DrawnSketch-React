import React from "react";
import { useTranslation } from "react-i18next";

import Backwards from "./sections/Backwards.js";

export const About = () => {
  // For Translation
  const { t } = useTranslation();
  return (
    <div id="about">
      <Backwards />

      <div className="about-content">
        <div className="about-title">
          <h1>{t("aboutPage.Title")}</h1>
        </div>

        <div className="about-text">
          <p>
            {t("aboutPage.paragraphOne")}
            <br></br>
            {t("aboutPage.paragraphTwo")}
            <br></br>
            {t("aboutPage.paragraphThree")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
