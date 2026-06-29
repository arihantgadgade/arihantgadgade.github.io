(() => {
    const storageKey = "site-theme";
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function getStoredTheme() {
        try {
            const theme = localStorage.getItem(storageKey);
            return theme === "light" || theme === "dark" ? theme : null;
        } catch {
            return null;
        }
    }

    function setTheme(theme) {
        document.documentElement.dataset.theme = theme;
    }

    function updateToggle(toggle) {
        const isDark = document.documentElement.dataset.theme === "dark";
        toggle.setAttribute("aria-checked", String(isDark));
        toggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
    }

    setTheme(getStoredTheme() || (mediaQuery.matches ? "dark" : "light"));

    document.addEventListener("DOMContentLoaded", () => {
        const toggles = document.querySelectorAll("[data-theme-toggle]");
        toggles.forEach(updateToggle);

        toggles.forEach((toggle) => {
            toggle.addEventListener("click", () => {
                const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
                setTheme(nextTheme);
                try {
                    localStorage.setItem(storageKey, nextTheme);
                } catch {
                    // The selected theme still applies for the current page.
                }
                toggles.forEach(updateToggle);
            });
        });
    });
})();
