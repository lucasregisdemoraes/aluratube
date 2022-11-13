import React from "react";

// create a context to be used globally in the app
// set mode, setMode, toggleMode before they be called in _app.js, otherwise they are returned undefined
export const ColorModeContext = React.createContext({
    mode: "",
    setMode: () => { alert() },
    toggleMode: () => { alert() }
})

export default function ColorModeProvider(props) {
    const [mode, setMode] = React.useState(props.initialMode)

    function toggleMode() {
        setMode(mode === "dark" ? "light" : "dark")
    }

    return (
        <ColorModeContext.Provider
            value={{
                mode: mode,
                setMode: setMode,
                toggleMode: toggleMode
            }}
        >
            {/* return children(App Components) */}
            {props.children}
        </ColorModeContext.Provider>
    )
}