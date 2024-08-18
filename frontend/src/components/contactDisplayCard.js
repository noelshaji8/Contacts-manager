import React, { useEffect, useState } from 'react';
import "../utils/styles/homePage.css"
import '@radix-ui/themes/styles.css';
import "../utils/styles/contactDisplayCard.css"
import { Text, TextField, Flex, Theme, Box, Avatar, Card, Button, Select, AlertDialog, Em } from '@radix-ui/themes';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, readContacts, updateContact } from '../utils/api';
import { readContactState, readSingleContactState, update } from '../redux/contactsSlice';
import { useNavigate } from "react-router-dom";
import { useFilePicker } from 'use-file-picker';
import { FileAmountLimitValidator, FileTypeValidator, FileSizeValidator, ImageDimensionsValidator, } from 'use-file-picker/validators';
import { validateEmail, validatePhoneNumber, validateUsername, validCheck } from '../utils/inputValidation';
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { useMediaQuery } from "react-responsive";

/**
 * A functional component that displays a contact's information and allows for editing and deletion.
 * 
 * @return {JSX.Element} The JSX element representing the contact display card.
 */
function ContactDisplayCard() {

    const isMobile = useMediaQuery({ maxWidth: 768 });

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const contact = useSelector((state) => state.contacts.singleContact)

    const [name, setName] = useState(contact.name);
    const [address, setAddress] = useState(contact.address);
    const [phoneNo, setPhoneNo] = useState(contact.phone_no);
    const [altphoneNo, setAltPhoneNo] = useState(contact.alt_phone_no);
    const [email, setEmail] = useState(contact.email);
    const [company, setCompany] = useState(contact.company);
    const [pfp, setPfp] = useState(contact.pfp);
    const [isDisabled, setIsDisabled] = useState(true)
    const [submitDisabled, setSubmitDisabled] = useState(true)

    // Hook to open file picker for updating profile picture
    const { openFilePicker, filesContent, loading, errors } = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: true,
        validators: [
            new FileAmountLimitValidator({ max: 1 }), // limit to 1 file
            new FileTypeValidator(['jpg', 'jpeg', 'png']), // accept only image files
            new FileSizeValidator({ maxFileSize: 5 * 1024 * 1024 }), // limit file size to 5MB
        ],
    });

    // Function to delete contact
    const contactDeleteHandle = async () => {
        await deleteContact({ _id: contact._id })

        // Read contacts from database and update Redux store
        const loggedContacts = await readContacts()
        dispatch(readContactState(loggedContacts))
        navigate("/home", { replace: true })
        dispatch(update({ title: "Contact Deleted" }))
    }

    // Function to cancel contact update and reset input fields
    const cancelUpdate = () => {
        setName(contact.name)
        setAddress(contact.address)
        setPhoneNo(contact.phone_no)
        setAltPhoneNo(contact.alt_phone_no)
        setEmail(contact.email)
        setCompany(contact.company)
        setPfp(contact.pfp)
        setIsDisabled(true)
    }

    // Function to update contact
    const contactUpdateHandle = async (e) => {

        // Call updateContact function with contact details
        const updatedContact = await updateContact({
            _id: contact._id,
            name: name,
            phone_no: phoneNo,
            alt_phone_no: altphoneNo,
            email: email,
            address: address,
            company: company,
            pfp: pfp
        })
        // Disable input fields
        setIsDisabled(true)

        // Read contacts from database and update Redux store
        const loggedContacts = await readContacts()
        dispatch(readContactState(loggedContacts))
        dispatch(readSingleContactState(updatedContact))
        dispatch(update({ title: "Contact Updated" }))
    }

    // Update contact's profile picture when file picker is used
    useEffect(() => {
        const image = filesContent.map((file, index) => file.content);
        image[0] && setPfp(image[0])
    }, [filesContent])

    // Reset input fields when contact is changed
    useEffect(() => {
        setName(contact.name)
        setAddress(contact.address)
        setPhoneNo(contact.phone_no)
        setAltPhoneNo(contact.alt_phone_no)
        setEmail(contact.email)
        setCompany(contact.company)
        setPfp(contact.pfp)
    }, [contact])

    // Disable submit button if input validation fails
    useEffect(() => {
        setSubmitDisabled(!validCheck(name, phoneNo, email, altphoneNo))
    }, [name, phoneNo, email, altphoneNo])



    return (
        <div className='contact-display'>

            <div className='contact-title'>

                <Card size="3" variant='ghost' style={{ margin: "0" }}>
                    <Flex gap="6" align="center" direction="row">
                        <Avatar src={pfp} size="7" radius="medium" fallback={contact.name[0]} color="indigo" />
                        <Box>
                            <Text as="div" size="7" weight="bold">
                                {contact.name}
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Button style={{ marginBottom: "20px" }} onClick={() => openFilePicker()} disabled={isDisabled} size="1" variant='soft'>Edit profile picture</Button>

            </div>
            <div className='options'>
                <h2>Options</h2>
                <Flex style={{ marginBottom: "30px" }} gap="3" justify="center">

                    <Button onClick={() => isDisabled ? setIsDisabled(false) : cancelUpdate()} size="3" style={{ cursor: "pointer" }}>{isDisabled ? "Update" : "Cancel"}</Button>

                    <AlertDialog.Root>
                        <AlertDialog.Trigger>
                            <Button size="3" style={{ cursor: "pointer" }}>Delete</Button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Content maxWidth="450px">
                            <AlertDialog.Title>Delete contact</AlertDialog.Title>
                            <AlertDialog.Description size="2">
                                Are you sure that you want to delete this contact?
                            </AlertDialog.Description>

                            <Flex gap="3" mt="4" justify="end">
                                <AlertDialog.Cancel>
                                    <Button style={{ cursor: "pointer" }} variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action>
                                    <Button style={{ cursor: "pointer" }} onClick={(e) => contactDeleteHandle(e)} variant="solid" color="red">
                                        Delete contact
                                    </Button>
                                </AlertDialog.Action>
                            </Flex>
                        </AlertDialog.Content>
                    </AlertDialog.Root>
                </Flex>
            </div>




            <div className='contact-details'>
                <Flex className='details-flex' direction={isMobile ? "column" : "row"} justify="center" gap={isMobile ? "3" : "6"} >
                    <Flex direction="column" gap="3" width={isMobile ? "50vw" : "12vw"}>
                        <label className='textarea' >
                            <Text as="div" size="3" mb="1" weight="bold">
                                Name <Em>(required)</Em>
                            </Text>
                            <TextField.Root size="3" className='textfield' value={name} disabled={isDisabled} placeholder="Enter full name" onChange={(e) => setName(e.target.value)}>
                                <TextField.Slot side='right'>
                                    {name === "" || isDisabled ? null : validateUsername(name) ? (<CheckCircledIcon style={{ color: "green" }} />) : <CrossCircledIcon style={{ color: "red" }} />}
                                </TextField.Slot>
                            </TextField.Root>
                        </label>
                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Phone No. <Em>(required)</Em>
                            </Text>
                            <TextField.Root size="3" className='textfield' value={phoneNo} disabled={isDisabled} placeholder="Enter phone number" onChange={(e) => setPhoneNo(e.target.value)}>
                                <TextField.Slot side='right'>
                                    {phoneNo === "" || isDisabled ? null : validatePhoneNumber(phoneNo) ? (<CheckCircledIcon style={{ color: "green" }} />) : <CrossCircledIcon style={{ color: "red" }} />}
                                </TextField.Slot>
                            </TextField.Root>
                        </label>
                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Address
                            </Text>
                            <TextField.Root size="3" className='textfield' value={address} disabled={isDisabled}
                                placeholder="Enter address" onChange={(e) => setAddress(e.target.value)}
                            />

                        </label>


                    </Flex>
                    <Flex direction="column" gap="3" width={isMobile ? "50vw" : "12vw"}>
                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Email
                            </Text>
                            <TextField.Root size="3" className='textfield' value={email} disabled={isDisabled}
                                placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}
                            > <TextField.Slot side='right'>
                                    {email === "" || isDisabled ? null : validateEmail(email) ? (<CheckCircledIcon style={{ color: "green" }} />) : <CrossCircledIcon style={{ color: "red" }} />}
                                </TextField.Slot>
                            </TextField.Root>
                        </label>
                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Alt Phone No.
                            </Text>
                            <TextField.Root size="3" className='textfield' value={altphoneNo} disabled={isDisabled}
                                placeholder="Enter alternate number" onChange={(e) => setAltPhoneNo(e.target.value)}
                            > <TextField.Slot side='right'>
                                    {altphoneNo === "" || isDisabled ? null : validatePhoneNumber(altphoneNo) ? (<CheckCircledIcon style={{ color: "green" }} />) : <CrossCircledIcon style={{ color: "red" }} />}
                                </TextField.Slot>
                            </TextField.Root>
                        </label>
                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Company
                            </Text>
                            <TextField.Root size="3" className='textfield' value={company} disabled={isDisabled}
                                placeholder="Enter company" onChange={(e) => setCompany(e.target.value)}
                            />
                        </label>
                    
                    </Flex>
                </Flex>
                <Button disabled={submitDisabled || isDisabled} onClick={() => contactUpdateHandle()} id='save-btn' size="3">Save</Button>
            </div>

        </div>


    );
}

export default ContactDisplayCard;

