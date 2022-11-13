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
                    console.log("Form values:", formRegistration.values)
                    formRegistration.clearForm()
                    setFormVisibility(false)
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