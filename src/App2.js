import { useState} from 'react';
import {Container} from 'react-bootstrap';


function useInputWithValidate(initValue) {//Castom hook /Собстыенный ХУК / нужно вывести в отдельный файл/ начиианть хук с use...
    const [value, setValue]=useState(initValue);

    const onChange = event => {
        setValue(event.target.value);
    }

    const validateText = () => {
        return value.search(/\d/) >=0;
    }
    return {value, onChange, validateText}

}
const Form = () => {
    const input = useInputWithValidate('');
    const textArea = useInputWithValidate('');
    const color = input.validateText() ? 'text-danger' : null;

    return (
        <Container>
            <form className="w-50 border mt-5 p-3 m-auto">
                <div className="mb-3">
                    <input value={`${input.value} / ${textArea.value}`} type="text" className="form-control" readOnly/>
                    <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
                    <input 
                    onChange={input.onChange} 
                    type="email" 
                    value={input.value}
                    className={`form-control ${color}`}
                    id="exampleFormControlInput1" 
                    placeholder="name@example.com"/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea 
                    onChange={textArea.onChange}
                    value={textArea.value}
                    className="form-control" 
                    id="exampleFormControlTextarea1" 
                    rows="3"></textarea>
                </div>
            </form>
        </Container>
    )
}

function App() {
    return (
        <Form/>
    );
}

export default App;
