import React, { useState, useRef, useEffect } from 'react';
import "../utils/styles/homePage.css"
import '@radix-ui/themes/styles.css';
import { Dialog, Button, Flex, Text, TextField, Select, Avatar, Em } from '@radix-ui/themes';
import { createContact, readContacts } from '../utils/api';
import { readContactState, update } from '../redux/contactsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircledIcon, CheckIcon, CrossCircledIcon, PersonIcon } from '@radix-ui/react-icons';
import { useFilePicker } from 'use-file-picker';
import { FileAmountLimitValidator, FileTypeValidator, FileSizeValidator, ImageDimensionsValidator, } from 'use-file-picker/validators';
import { validateEmail, validatePhoneNumber, validateUsername, validCheck } from '../utils/inputValidation';
import { useMediaQuery } from "react-responsive";

/**
 * A React functional component for adding a new contact.
 * 
 * This component handles user input for contact details, 
 * validates the input, and saves the contact to the database.
 * 
 * @return {JSX.Element} The JSX element representing the add contact form.
 */
function AddContact() {

    const isMobile = useMediaQuery({ maxWidth: 768 });

    const dispatch = useDispatch()

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [altphoneNo, setAltPhoneNo] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [pfp, setPfp] = useState("");
    const [submitDisabled, setSubmitDisabled] = useState(true)

    // Initialize useFilePicker hook with options for file picker
    const { openFilePicker, filesContent, loading, errors } = useFilePicker({
        readAs: 'DataURL', // read file as DataURL
        accept: 'image/*',  // accept only image files
        multiple: true, // allow multiple file selection
        validators: [
            new FileAmountLimitValidator({ max: 1 }), // limit number of files to 1
            new FileTypeValidator(['jpg', 'jpeg', 'png']), // limit file types to jpg, jpeg and png
            new FileSizeValidator({ maxFileSize: 5 * 1024 * 1024 }), // limit file size to 5MB
        ],
    });


    // Function to handle adding a new contact
    const contactAddHandle = async () => {
        try {
            // Call createContact function with contact details
            await createContact({
                name: name,
                phone_no: phoneNo,
                alt_phone_no: altphoneNo,
                email: email,
                address: address,
                company: company,
                pfp: pfp
            })

            // Read contacts from database and update Redux store
            const loggedContacts = await readContacts()
            dispatch(readContactState(loggedContacts))
            
            // Dispatch update action with success message
            dispatch(update({ title: "Contact Added" }))


        } catch (error) {
            console.log(error);
        }

    }

    // Function to clear input fields and reset file picker
    const cancelAdd = () => {
        setName("")
        setAddress("")
        setPhoneNo("")
        setAltPhoneNo("")
        setEmail("")
        setCompany("")
        setPfp()
    }

    // Update pfp state when filesContent changes
    useEffect(() => {
        const image = filesContent.map((file, index) => file.content);
        image[0] && setPfp(image[0])
    }, [filesContent])


    // Disable submit button if any input field is invalid
    useEffect(() => {
        setSubmitDisabled(!validCheck(name, phoneNo, email, altphoneNo))
    }, [name, phoneNo, altphoneNo, email])


    return (

        <Dialog.Root>
            <Dialog.Trigger>
                <Button style={{ cursor: "pointer" }}>Add Contact</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Add Contact</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Enter the contact details
                </Dialog.Description>
                <Flex direction="row" justify="between">
                    <Flex direction="column" gap="3" width={isMobile ? "38vw" : "12vw"}>

                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Name <Em>(required)</Em>
                            </Text>
                            <TextField.Root required value={name} onChange={(e) => setName(e.target.value)}
                                placeholder="Enter full name">
                                <TextField.Slot side='right'>
                                    {name === "" ? null : validateUsername(name) ? (<CheckCircledIcon style={{ color: "green" }} />) : <CrossCircledIcon style={{ color: "red" }} />}
                                </TextField.Slot>
                            </TextField.Root>
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Phone No. <Em>(required)</Em>
                            </Text>
                            <TextField.Root required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}
                                placeholder="Enter phone number">
                                <TextField.Slot side='right'>
                                    {phoneNo === "" ? null : validatePhoneNumber(phoneNo) ? (<CheckCircledIcon style={{ color: "green" }} />) : <CrossCircledIcon style={{ color: "red" }} />}
                                </TextField.Slot>
                            </TextField.Root>
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Address
                            </Text>
                            <TextField.Root required value={address} onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter address">

                            </TextField.Root>
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Profile picture
                            </Text>
                            <Flex direction="row" gap="5" align="center">
                                <Avatar src={pfp} size="5" radius="medium" color="indigo" fallback={<PersonIcon width="30" height="30" color='gray' />} />
                                <Button onClick={() => openFilePicker()} size="1" variant='soft'>Edit photo</Button>
                            </Flex>
                        </label>

                    </Flex>
                    <Flex direction="column" gap="3" width={isMobile ? "38vw" : "12vw"}>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Email
                            </Text>

                            <TextField.Root required value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email">
                                <TextField.Slot side='right'>
                                    {email === "" ? null : validateEmail(email) ? (<CheckCircledIcon style={{ color: "green" }} />) : <CrossCircledIcon style={{ color: "red" }} />}
                                </TextField.Slot>
                            </TextField.Root>
                        </label>

                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Alt Phone No.
                            </Text>
                            <TextField.Root required value={altphoneNo} onChange={(e) => setAltPhoneNo(e.target.value)}
                                placeholder="Enter alternate number">
                                <TextField.Slot side='right'>
                                    {altphoneNo === "" ? null : validatePhoneNumber(altphoneNo) ? (<CheckCircledIcon style={{ color: "green" }} />) : <CrossCircledIcon style={{ color: "red" }} />}
                                </TextField.Slot>
                            </TextField.Root>
                        </label>
                        <label>

                            <Text as="div" size="2" mb="1" weight="bold">
                                Company
                            </Text>
                            <TextField.Root placeholder='Enter company' required value={company} onChange={(e) => setCompany(e.target.value)}>
                            </TextField.Root>

                        </label>

                    </Flex>
                </Flex>


                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button onClick={() => cancelAdd()} variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close disabled={submitDisabled}>
                        <Button onClick={() => contactAddHandle()} >Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>

    );
}
export default AddContact;



