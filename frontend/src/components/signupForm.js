import * as Form from '@radix-ui/react-form';
import '../utils/styles/authPage.css';
import { Card, Button, Flex } from '@radix-ui/themes';
import { signupUser } from '../utils/api';
import React, { useState, useRef, useEffect } from 'react';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'
import { Link } from 'react-router-dom';
import { validatePassword, validateUsername } from '../utils/inputValidation';

function SignUpForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isConfirm, setisConfirm] = useState(false);

    const errorMessage = useRef();

    useEffect(() => {
        if (password === confirmPassword) {
            setisConfirm(true)
        }
        else {
            setisConfirm(false)
        }


    }, [confirmPassword, password])

    const signUpHandle = async (e) => {
        e.preventDefault()
        try {
            if (isConfirm && validatePassword(password) && validateUsername(username)) {
                await signupUser({ username: username, password: confirmPassword })
                errorMessage.current.style.margin = "2vh 0 -2vh 0";
                errorMessage.current.innerText = "Sign Up successful"
                errorMessage.current.style.color = "green";
            }
            else {
                if (!isConfirm) {
                    throw "The passwords do not match"
                }
                else{
                    throw "Please enter according to valid formats"
                }
            }
        } catch (error) {
            errorMessage.current.style.margin = "2vh 0 -2vh 0";
            errorMessage.current.innerText = error
            errorMessage.current.style.color = "red";
        }
    }

    return (
        <div>
            <Card className='Card'>
                <h2>Sign Up</h2>
                <Form.Root className="FormRoot">
                    <Flex direction="column" gap="2" justify="between">

                        <Form.Field className="FormField" >
                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                                <Form.Label className="FormLabel">Username</Form.Label>
                                <Form.Message className="FormMessage" match="valueMissing">
                                    Please enter your username
                                </Form.Message>
                                <Form.Message className="FormMessage" match={()=>!validateUsername(username)}>
                                    Must contain between 3-16 letters
                                </Form.Message>
                            </div>
                            <Form.Control asChild>
                                <input required value={username} onChange={(e) => setUsername(e.target.value)} className="Input" />
                            </Form.Control>
                        </Form.Field>
                        <Form.Field className="FormField" >
                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                                <Form.Label className="FormLabel">Password</Form.Label>
                                <Form.Message className="FormMessage" match="valueMissing">
                                    Please enter your password
                                </Form.Message>
                                <Form.Message className="FormMessage" match={()=>!validatePassword(password)}>
                                    Must be more than 4 characters long
                                </Form.Message>
                            </div>
                            <Form.Control asChild>
                                <input required value={password} onChange={(e) => setPassword(e.target.value)} className="Input" type="password" />
                            </Form.Control>
                        </Form.Field>
                        <Form.Field className="FormField">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Form.Label className="FormLabel">Confirm Password</Form.Label>
                                <Form.Message className="FormMessage" match="valueMissing">
                                    Please re-enter your password
                                </Form.Message>

                                {confirmPassword === "" ? null : isConfirm ? (<CheckIcon style={{ scale: "1.75", color: "green" }} />) : (<Cross2Icon style={{ scale: "1.75", color: "red" }} />)}

                            </div>
                            <Form.Control asChild>
                                <input required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="Input" type="password" />
                            </Form.Control>
                        </Form.Field>
                    </Flex>

                    <div ref={errorMessage} style={{ textAlign: "center" }} className='error'></div>

                    <Form.Submit asChild>
                        <Button className="Button" onClick={(e) => signUpHandle(e)} style={{ marginTop: "4vh" }}>
                            Sign Up
                        </Button>
                    </Form.Submit>
                </Form.Root>
                <div style={{ margin: "3vh 0 1vh 0 ", textAlign: "center" }}>Already registered?
                    <Link style={{ textDecoration: "none" }} to="/auth/login"> Login</Link>
                </div>
            </Card>

        </div>

    );
}


export default SignUpForm;
