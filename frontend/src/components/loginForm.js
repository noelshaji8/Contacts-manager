import React, { useRef, useState } from 'react';
import * as Form from '@radix-ui/react-form';
import '../utils/styles/authPage.css';
import { Card, Button, Callout  , Flex} from '@radix-ui/themes';
import {  InfoCircledIcon } from '@radix-ui/react-icons'
import { loginUser, readContacts } from '../utils/api';
import { useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import { readContactState } from '../redux/contactsSlice';

function LoginForm() {
   
    const dispatch = useDispatch();
    const errorMessage = useRef();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginHandle = async () => {
        try {
            const loggedUser = await loginUser({ username: username, password: password })
            dispatch(login(loggedUser))
            errorMessage.current.style.margin = "0";
            errorMessage.current.innerText = ""
            const loggedContacts = await readContacts()            
            dispatch(readContactState(loggedContacts))
            navigate("/home")

        } catch (error) {
            errorMessage.current.style.margin = "2vh 0 -2vh 0";
            errorMessage.current.innerText = error
        }
    }

    return (
        <div className='container'>
            <Card className='Card'>
                <h2>Login</h2>
                <Form.Root className="FormRoot">
                <Flex direction="column" gap="2" justify="between">
                    <Form.Field className="FormField" name="email">
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                            <Form.Label className="FormLabel">Username</Form.Label>
                            <Form.Message className="FormMessage" match="valueMissing">
                                Please enter your username
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <input required value={username} onChange={(e) => setUsername(e.target.value)} className="Input" type="email" />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field className="FormField" name="question">
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                            <Form.Label className="FormLabel">Password</Form.Label>
                            <Form.Message className="FormMessage" match="valueMissing">
                                Please enter your password
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <input required value={password} onChange={(e) => setPassword(e.target.value)} className="Input" type="password" />
                        </Form.Control>
                    </Form.Field>
                    <div ref={errorMessage} className='error'></div>
                    <Form.Submit asChild>
                        <Button className="Button" onClick={loginHandle} style={{ marginTop: "2vh" }}>
                            Login
                        </Button>
                    </Form.Submit>
                    </Flex>
                </Form.Root>
            </Card>

        </div>

    );
}


export default LoginForm;

<Callout.Root color='red' style={{ marginTop: "2vh", marginBottom: "-2vh" }}>
    <Callout.Icon>
        <InfoCircledIcon />
    </Callout.Icon>
    <Callout.Text>
        Incorrect.
    </Callout.Text>
</Callout.Root>