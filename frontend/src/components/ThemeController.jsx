import React, { useState, useEffect } from "react";


function ThemeController() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

export default ThemeController;
