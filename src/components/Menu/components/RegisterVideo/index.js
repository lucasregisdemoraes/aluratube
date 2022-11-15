import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";

// Custom Hook
function useForm(formProps) {
    const [values, setValues] = React.useState(formProps.initialValues)

    return {
        values,
        handleChange: (event) => {
            const value = event.currentTarget.value
            const name = event.currentTarget.name
            setValues({
                ...values,
                [name]: value
            })
        },
        clearForm: () => setValues({ title: "", url: "" })
    }
}

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}

// Supabase
const PROJECT_URL = "https://bdruzjgvrnrfagejzutu.supabase.co"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkcnV6amd2cm5yZmFnZWp6dXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzODkzODQsImV4cCI6MTk4Mzk2NTM4NH0.JVWBn_UKZIVnLozymTl-6ErVVrQVO3csadxPUgoppzI"
// Create a single supabase client for interacting with  database
const supabase = createClient(PROJECT_URL, API_KEY)

export default function RegisterVideo() {
    const formRegistration = useForm({
        initialValues: { title: "", url: "" }
    })
    const [formVisibility, setFormVisibility] = React.useState(false)

    return (
        <StyledRegisterVideo>
            <button
                className="add-video"
                onClick={() => setFormVisibility(true)}
            >+</button>

            {/* Short-circuit operator
                If formVisibility is true return the form else return false
            */}
            {
                formVisibility &&
                <form onSubmit={event => {
                    event.preventDefault()

                    // insert a new video on supabase
                    supabase.from("videos").insert({
                        title: formRegistration.values.title,
                        url: formRegistration.values.url,
                        thumb: getThumbnail(formRegistration.values.url),
                        playlist: "jogos"
                    })
                        .then((response) => {
                            // console.log(response)
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                    setFormVisibility(false)
                    formRegistration.clearForm()
                }}>
                    <div>
                        <button
                            /*  It's necessary have type attribute on buttons
                                    to not be confused with submit type button 
                            */
                            type="button"
                            className="close-modal"
                            onClick={() => setFormVisibility(false)}
                        >x</button>
                        <input
                            placeholder="Título"
                            name="title"
                            value={formRegistration.values.title}
                            onChange={formRegistration.handleChange}
                        />
                        <input
                            placeholder="URL"
                            name="url"
                            value={formRegistration.values.url}
                            onChange={formRegistration.handleChange}
                        />
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            }

            {/* Another way to be done:
                    Ternary operator
                    formVisivility ? <form></form> : false */}

        </StyledRegisterVideo>
    )
}