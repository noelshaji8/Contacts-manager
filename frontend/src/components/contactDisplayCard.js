import React, { useState } from 'react';
import "../utils/styles/homePage.css"
import '@radix-ui/themes/styles.css';
import "../utils/styles/contactDisplayCard.css"
import { Text, TextField, Flex, Theme, Box, Avatar, Card, Button, Select, AlertDialog } from '@radix-ui/themes';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, readContacts, updateContact } from '../utils/api';
import { readContactState } from '../redux/contactsSlice';
import { useNavigate } from "react-router-dom";

function ContactDisplayCard() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const contact = useSelector((state) => state.contacts.singleContact)

    const [name, setName] = useState(contact.name);
    const [address, setAddress] = useState(contact.address);
    const [phoneNo, setPhoneNo] = useState(contact.phone_no);
    const [altphoneNo, setAltPhoneNo] = useState(contact.alt_phone_no);
    const [email, setEmail] = useState(contact.email);
    const [company, setCompany] = useState(contact.company);
    const [isDisabled, setIsDisabled] = useState(true)

    const contactDeleteHandle = async () => {
        await deleteContact({ _id: contact._id })
        const loggedContacts = await readContacts()
        dispatch(readContactState(loggedContacts))
        navigate(-1)
    }

    const contactUpdateHandle = async () => {
        await updateContact({
            _id: contact._id,
            name: name,
            phone_no: phoneNo,
            alt_phone_no: altphoneNo,
            email: email,
            address: address,
            company: company
        })
        setIsDisabled(true)
        const loggedContacts = await readContacts()            
        dispatch(readContactState(loggedContacts))
    }

    return (
        <div className='contact-display'>
            <div className='left'>
                <div className='contact-title'>

                    <Card size="3" variant='ghost' style={{ margin: "0" }}>
                        <Flex gap="6" align="center" direction="row">
                            <Avatar size="7" radius="medium" fallback={contact.name[0]} color="indigo" />
                            <Box>
                                <Text as="div" size="7" weight="bold">
                                    {contact.name}
                                </Text>

                            </Box>
                        </Flex>
                    </Card>

                </div>
                <div className='options'>
                    <h2>Options</h2>
                    <Flex gap="3" justify="center">

                        <Button onClick={()=>setIsDisabled(false)} size="3">Update</Button>

                        <AlertDialog.Root>
                            <AlertDialog.Trigger>
                                <Button size="3" color="indigo">Delete</Button>
                            </AlertDialog.Trigger>
                            <AlertDialog.Content maxWidth="450px">
                                <AlertDialog.Title>Delete contact</AlertDialog.Title>
                                <AlertDialog.Description size="2">
                                    Are you sure that you want to delete this contact?
                                </AlertDialog.Description>

                                <Flex gap="3" mt="4" justify="end">
                                    <AlertDialog.Cancel>
                                        <Button variant="soft" color="gray">
                                            Cancel
                                        </Button>
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action>
                                        <Button onClick={() => contactDeleteHandle()} variant="solid" color="red">
                                            Delete contact
                                        </Button>
                                    </AlertDialog.Action>
                                </Flex>
                            </AlertDialog.Content>
                        </AlertDialog.Root>
                    </Flex>
                </div>
            </div>

            <div className='contact-details'>
                <Flex direction="row" justify="center" gap="6" style={{ scale: "1.4", marginBottom: "4vh" }}>
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
                <Button onClick={() => contactUpdateHandle()} id='save-btn' size="3">Save</Button>
            </div>

        </div>


    );
}

export default ContactDisplayCard;

