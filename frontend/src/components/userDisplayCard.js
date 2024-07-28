import React, { useState } from 'react';
import "../utils/styles/homePage.css"
import '@radix-ui/themes/styles.css';
import "../utils/styles/contactDisplayCard.css"
import { Text, TextField, Flex, Theme, Box, Avatar, Card, Button, Select, AlertDialog } from '@radix-ui/themes';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, readContacts, updateContact, updateUserInfo } from '../utils/api';
import { readContactState } from '../redux/contactsSlice';
import { useNavigate } from "react-router-dom";
import { info } from '../redux/userSlice';

function UserDisplayCard() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state) => state.user)

    const [name, setName] = useState(user.username);
    const [address, setAddress] = useState(user.info.address);
    const [phoneNo, setPhoneNo] = useState(user.info.phone_no);
    const [altphoneNo, setAltPhoneNo] = useState(user.info.alt_phone_no);
    const [email, setEmail] = useState(user.info.email);
    const [company, setCompany] = useState(user.info.company);
    const [gender, setGender] = useState(user.info.gender);
    const [dob, setDob] = useState(user.info.dob);
    const [isDisabled, setIsDisabled] = useState(true)

    const userLogoutHandle = async () => {
        //LOG OUT LOGIC
    }

    const userUpdateHandle = async () => {

        const response =  await updateUserInfo({
            _id: user.info._id,
            username: name,
            phone_no: phoneNo,
            alt_phone_no: altphoneNo,
            email: email,
            address: address,
            company: company,
            gender: gender,
            dob: dob
        })
        setIsDisabled(true)
        dispatch(info(response))
    }

    return (
        <div className='contact-display'>
            <div className='left'>
                <div className='contact-title'>

                    <Card size="3" variant='ghost' style={{ margin: "0" }}>
                        <Flex gap="6" align="center" direction="row">
                            <Avatar size="7" radius="medium" fallback={user.username[0]} color="indigo" />
                            <Box>
                                <Text as="div" size="7" weight="bold">
                                    {user.username}
                                </Text>

                            </Box>
                        </Flex>
                    </Card>

                </div>
                <div className='options'>
                    <h2>Options</h2>
                    <Flex gap="3" justify="center">

                        <Button onClick={() => setIsDisabled(false)} size="3">Update</Button>

                        <AlertDialog.Root>
                            <AlertDialog.Trigger>
                                <Button size="3" color="indigo">Log out</Button>
                            </AlertDialog.Trigger>
                            <AlertDialog.Content maxWidth="450px">
                                <AlertDialog.Title>Log out</AlertDialog.Title>
                                <AlertDialog.Description size="2">
                                    Are you sure that you want to log out?
                                </AlertDialog.Description>

                                <Flex gap="3" mt="4" justify="end">
                                    <AlertDialog.Cancel>
                                        <Button variant="soft" color="gray">
                                            Cancel
                                        </Button>
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action>
                                        <Button onClick={() => userLogoutHandle()} variant="solid" color="red">
                                            Log out
                                        </Button>
                                    </AlertDialog.Action>
                                </Flex>
                            </AlertDialog.Content>
                        </AlertDialog.Root>
                    </Flex>
                </div>
            </div>

            <div className='contact-details'>
                <Flex direction="row" justify="center" gap="6" style={{ scale: "1.2", marginBottom: "4vh" }}>
                    <Flex direction="column" gap="3" width="12vw">
                        <label className='textarea' >
                            <Text as="div" size="3" mb="1" weight="bold">
                                Name
                            </Text>
                            <TextField.Root size="3" value={name} disabled={isDisabled}
                                placeholder="Enter full name" onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Phone No.
                            </Text>
                            <TextField.Root size="3" value={phoneNo} disabled={isDisabled}
                                placeholder="Enter phone number" onChange={(e) => setPhoneNo(e.target.value)}
                            />
                        </label>
                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Email
                            </Text>
                            <TextField.Root size="3" value={email} disabled={isDisabled}
                                placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Date of Birth
                            </Text>
                            <TextField.Root size="3" value={dob} disabled={isDisabled}
                                placeholder="Enter date of birth" onChange={(e) => setDob(e.target.value)}
                            />
                        </label>

                    </Flex>
                    <Flex direction="column" gap="3" width="12vw">
                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Address
                            </Text>
                            <TextField.Root size="3" value={address} disabled={isDisabled}
                                placeholder="Enter address" onChange={(e) => setAddress(e.target.value)}
                            />
                        </label>
                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Alt Phone No.
                            </Text>
                            <TextField.Root size="3" value={altphoneNo} disabled={isDisabled}
                                placeholder="Enter alternate number" onChange={(e) => setAltPhoneNo(e.target.value)}
                            />
                        </label>
                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Company
                            </Text>
                            <TextField.Root size="3" value={company} disabled={isDisabled}
                                placeholder="Enter company" onChange={(e) => setCompany(e.target.value)}
                            />
                        </label>
                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Gender
                            </Text>
                            <TextField.Root size="3" value={gender} disabled={isDisabled}
                                placeholder="Enter gender" onChange={(e) => setGender(e.target.value)}
                            />
                        </label>

                        {/* <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Group
                            </Text>

                            <Select.Root defaultValue="Group2" >
                                <Select.Trigger size="3" />
                                <Select.Content position='popper' style={{ scale: "1.4" }}>
                                    <Select.Group>
                                        <Select.Item value="Group1">Group1</Select.Item>
                                        <Select.Item value="Group2">Group2</Select.Item>
                                        <Select.Item value="Group3">Group3</Select.Item>
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>

                        </label> */}

                    </Flex>
                </Flex>
                <Button onClick={ userUpdateHandle} id='save-btn' size="3">Save</Button>
            </div>

        </div>


    );
}

export default UserDisplayCard;

