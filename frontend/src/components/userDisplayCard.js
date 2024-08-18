import React, { useEffect, useState } from 'react';
import "../utils/styles/homePage.css"
import "../utils/styles/contactDisplayCard.css"
import '@radix-ui/themes/styles.css';
import { Text, TextField, Flex, Theme, Box, Avatar, Card, Button, Select, AlertDialog, IconButton, Em } from '@radix-ui/themes';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, updateUserInfo } from '../utils/api';
import { useNavigate } from "react-router-dom";
import { info, logout } from '../redux/userSlice';
import { useFilePicker } from 'use-file-picker';
import { FileAmountLimitValidator, FileTypeValidator, FileSizeValidator, ImageDimensionsValidator, } from 'use-file-picker/validators';
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { validateEmail, validatePhoneNumber, validateUsername, validCheck } from '../utils/inputValidation';
import { createBrowserHistory } from "history";
import { logoutContacts } from '../redux/contactsSlice';
import store from '../redux/store';
import { useMediaQuery } from "react-responsive";


/**
 * A functional component that displays a user's profile information and allows them to update it.
 * 
 * @return {JSX.Element} The JSX element representing the user's profile information.
 */
function UserDisplayCard() {

    const isMobile = useMediaQuery({ maxWidth: 768 });

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const history = createBrowserHistory();

    const user = useSelector((state) => state.user)
    var recent = new Date().toISOString().split("T")[0];

    const [name, setName] = useState(user.username);
    const [address, setAddress] = useState(user.info.address);
    const [phoneNo, setPhoneNo] = useState(user.info.phone_no);
    const [altphoneNo, setAltPhoneNo] = useState(user.info.alt_phone_no);
    const [email, setEmail] = useState(user.info.email);
    const [company, setCompany] = useState(user.info.company);
    const [gender, setGender] = useState(user.info.gender);
    const [dob, setDob] = useState(user.info.dob);
    const [pfp, setPfp] = useState(user.info.pfp);
    const [isDisabled, setIsDisabled] = useState(true)
    const [submitDisabled, setSubmitDisabled] = useState(true)

    // Opens a file picker to select a profile picture
    const { openFilePicker, filesContent, loading, errors } = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: true,
        validators: [            
            new FileAmountLimitValidator({ max: 1 }), // Limit the number of files to 1            
            new FileTypeValidator(['jpg', 'jpeg', 'png']), // Limit the file types to jpg, jpeg, and png
            new FileSizeValidator({ maxFileSize: 5 * 1024 * 1024 }), // Limit the file size to 5MB
        ],
    });

    const userLogoutHandle = async () => {

        // Resets the store to its initial state
        store.dispatch({ type: "RESET" })
        const response = await logoutUser()
        navigate("/")
    }

    const cancelUpdate = () => {

        // Resets the fields to the user's information
        setName(user.username)
        setAddress(user.info.address)
        setPhoneNo(user.info.phone_no)
        setAltPhoneNo(user.info.alt_phone_no)
        setEmail(user.info.email)
        setCompany(user.info.company)
        setGender(user.info.gender)
        setDob(user.info.dob)
        setPfp(user.info.pfp)
        setIsDisabled(true)
    }

    // Updates the user's information
    const userUpdateHandle = async () => {

        // Updates the user's information
        const response = await updateUserInfo({
            _id: user.info._id,
            username: name,
            phone_no: phoneNo,
            alt_phone_no: altphoneNo,
            email: email,
            address: address,
            company: company,
            gender: gender,
            dob: dob,
            pfp: pfp
        })
        setIsDisabled(true) 
        dispatch(info(response))

    }

    // Updates the profile picture when a new file is selected
    useEffect(() => {
        const image = filesContent.map((file, index) => file.content);
        image[0] && setPfp(image[0])
    }, [filesContent])

    // Disables the submit button if the inputs are not valid
    useEffect(() => {
        setSubmitDisabled(!validCheck(name, phoneNo, email, altphoneNo))
    }, [name, phoneNo, email, altphoneNo])
 

    return (
        <div className='contact-display'>

            <div className='contact-title'>

                <Card size="3" variant='ghost' style={{ margin: "0" }}>
                    <Flex gap="6" align="center" direction="row">
                        <Avatar src={pfp} size="7" radius="medium" fallback={user.username[0]} color="indigo" />
                        <Box>
                            <Text as="div" size="7" weight="bold">
                                {user.username}
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Button onClick={() => openFilePicker()} disabled={isDisabled} size="1" variant='soft'>Edit profile picture</Button>

            </div>
            <div className='options'>
                <h2>Options</h2>
                <Flex gap="3" justify="center">

                    <Button onClick={() => isDisabled ? setIsDisabled(false) : cancelUpdate()} size="3" style={{ cursor: "pointer" }}>{isDisabled ? "Update" : "Cancel"}</Button>

                    <AlertDialog.Root>
                        <AlertDialog.Trigger>
                            <Button size="3" color="indigo" style={{ cursor: "pointer" }}>Log out</Button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Content maxWidth="450px">
                            <AlertDialog.Title>Log out</AlertDialog.Title>
                            <AlertDialog.Description size="2">
                                Are you sure that you want to log out?
                            </AlertDialog.Description>

                            <Flex gap="3" mt="4" justify="end">
                                <AlertDialog.Cancel>
                                    <Button style={{ cursor: "pointer" }} variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action>
                                    <Button style={{ cursor: "pointer" }} onClick={() => userLogoutHandle()} variant="solid" color="red">
                                        Log out
                                    </Button>
                                </AlertDialog.Action>
                            </Flex>
                        </AlertDialog.Content>
                    </AlertDialog.Root>
                </Flex>
            </div>


            <div className='user-contact-details'>
                <Flex className='user-details-flex' direction={isMobile ? "column" : "row"} justify="center" gap={isMobile ? "3" : "6"}>
                    <Flex direction="column" gap="3" width={isMobile ? "50vw" : "12vw"}>
                        <label className='textarea' >
                            <Text as="div" size="3" mb="1" weight="bold">
                                Name <Em>(required)</Em>
                            </Text>
                            <TextField.Root size="3" className='textfield' value={name} disabled={isDisabled}
                                placeholder="Enter full name" onChange={(e) => setName(e.target.value)}
                            ><TextField.Slot side='right'>
                                    {name === "" || isDisabled ? null : validateUsername(name) ? (<CheckCircledIcon style={{ color: "green" }} />) : <CrossCircledIcon style={{ color: "red" }} />}
                                </TextField.Slot>
                            </TextField.Root>
                        </label>
                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Phone No. <Em>(required)</Em>
                            </Text>
                            <TextField.Root size="3" className='textfield'  value={phoneNo} disabled={isDisabled}
                                placeholder="Enter phone number" onChange={(e) => setPhoneNo(e.target.value)}
                            ><TextField.Slot side='right'>
                                    {phoneNo === "" || isDisabled ? null : validatePhoneNumber(phoneNo) ? (<CheckCircledIcon style={{ color: "green" }} />) : <CrossCircledIcon style={{ color: "red" }} />}
                                </TextField.Slot>
                            </TextField.Root>
                        </label>
                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Address
                            </Text>
                            <TextField.Root size="3" className='textfield'  value={address} disabled={isDisabled}
                                placeholder="Enter address" onChange={(e) => setAddress(e.target.value)}
                            />
                        </label>

                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Company
                            </Text>
                            <TextField.Root size="3" className='textfield'  value={company} disabled={isDisabled}
                                placeholder="Enter company" onChange={(e) => setCompany(e.target.value)}
                            />
                        </label>


                    </Flex>
                    <Flex direction="column" gap="3" width={isMobile ? "50vw" : "12vw"}>
                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Email
                            </Text>
                            <TextField.Root size="3" className='textfield'  value={email} disabled={isDisabled}
                                placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}
                            ><TextField.Slot side='right'>
                                    {email === "" || isDisabled ? null : validateEmail(email) ? (<CheckCircledIcon style={{ color: "green" }} />) : <CrossCircledIcon style={{ color: "red" }} />}
                                </TextField.Slot>
                            </TextField.Root>
                        </label>
                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Alt Phone No.
                            </Text>
                            <TextField.Root size="3" className='textfield'  value={altphoneNo} disabled={isDisabled}
                                placeholder="Enter alternate number" onChange={(e) => setAltPhoneNo(e.target.value)}
                            ><TextField.Slot side='right'>
                                    {altphoneNo === "" || isDisabled ? null : validatePhoneNumber(altphoneNo) ? (<CheckCircledIcon style={{ color: "green" }} />) : <CrossCircledIcon style={{ color: "red" }} />}
                                </TextField.Slot>
                            </TextField.Root>
                        </label>
                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Date of Birth
                            </Text>
                            <TextField.Root className='textfield' type='date' max={recent} size="3" value={dob} disabled={isDisabled}
                                placeholder="Enter date of birth" onChange={(e) => setDob(e.target.value)}
                            />
                        </label>

                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Gender
                            </Text>

                            <Select.Root disabled={isDisabled} value={gender} onValueChange={(value) => { setGender(value) }}>
                                <Select.Trigger size="3" placeholder='Select gender' />
                                <Select.Content position='popper' style={{ scale: "1.2" }}>
                                    <Select.Group>
                                        <Select.Item value="Male">Male</Select.Item>
                                        <Select.Item value="Female">Female</Select.Item>

                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                        </label>


                    </Flex>
                </Flex>
                <Button disabled={isDisabled || submitDisabled} onClick={userUpdateHandle} className='user-save-btn' size="3">Save</Button>
            </div>

        </div>


    );
}

export default UserDisplayCard;

