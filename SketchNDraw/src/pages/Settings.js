import React from "react";
import { useTranslation } from "react-i18next";

import Backwards from "./sections/Backwards.js";

export const Settings = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng.target.value);
  };

  return (
    <div id="settings">
      <Backwards />

      <div className="settings-items">
        <div className="settings-title">
          <h1>{t("Settings")}</h1>
        </div>

        <div className="settings-options">
          <div className="settings-option">
            <h3>{t("Language")}</h3>
            <select onChange={changeLanguage} className="language-select">
              <option value="en" default>
                En-English
              </option>
              <option value="mkd">Mkd-Macedonian</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
