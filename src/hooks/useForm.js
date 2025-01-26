import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});


    //Cada vez que cambia el formstate, osea que cambie el nombre la password o el email
    //Se va a disparar el validador  
    useEffect(() => {
        createValidators();

    }, [formState])

    //Esto es para saber si es valido el formulario, y que se guarde en memoria
    //y que se modifique solo cuando el formState cambie
    const isFormValid = useMemo ( () => {

        //Vamos a barrer los campos
        for (const formValue of Object.keys( formValidation )) {
            
            //Si este campo que va varriendo no es null lanza un false, aunque sea uno solo
            if( formValidation[formValue] !== null) return false

        }

        return true;
    },[ formValidation ])


    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }



    //Este codigo es para las validaciones

    const createValidators = () => {

        const formCheckedValues = {};

        //Estamos varriendo los formvalidations que pasamos por parametro
        for (const formField of Object.keys(formValidations)) {
            const [funtion, errorMessage = 'Este campo es requerido'] = formValidations[formField];

            //Esto solo esta agregando el nombre del campo a validar con la palabra
            //Valid al final
            formCheckedValues[`${formField}Valid`] = funtion(formState[formField]) ? null : errorMessage;

        }

        //Con esto estoy seteandole al formValidation nuevo los campos ya validados y con su
        //true o su respectivo message
        setFormValidation( formCheckedValues );
        

    }


    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid,
    }
}