import React, { useState, useRef, useEffect } from 'react';
import "../utils/styles/homePage.css"
import '@radix-ui/themes/styles.css';
import { Dialog, Button, Flex, Text, TextField, Select, Avatar } from '@radix-ui/themes';
import { createContact, readContacts } from '../utils/api';
import { readContactState, update } from '../redux/contactsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { PersonIcon } from '@radix-ui/react-icons';
import { useFilePicker } from 'use-file-picker';
import { FileAmountLimitValidator, FileTypeValidator, FileSizeValidator, ImageDimensionsValidator, } from 'use-file-picker/validators';



function AddContact() {

    const dispatch = useDispatch()

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [altphoneNo, setAltPhoneNo] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [pfp, setPfp] = useState("");

    const { openFilePicker, filesContent, loading, errors } = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: true,
        validators: [
            new FileAmountLimitValidator({ max: 1 }),
            new FileTypeValidator(['jpg', 'jpeg', 'png']),
            new FileSizeValidator({ maxFileSize: 5 * 1024 * 1024 }),
            // new ImageDimensionsValidator({
            //     maxHeight: 900, // in pixels
            //     maxWidth: 1600,
            //     minHeight: 600,
            //     minWidth: 768,
            // }),
        ],
    });

    useEffect(() => {
        const image = filesContent.map((file, index) => file.content);
        image[0] && setPfp(image[0])       
    }, [filesContent])

    const contactAddHandle = async () => {
        await createContact({
            name: name,
            phone_no: phoneNo,
            alt_phone_no: altphoneNo,
            email: email,
            address: address,
            company: company,
            pfp: pfp
        })
        const loggedContacts = await readContacts()
        dispatch(readContactState(loggedContacts))
        dispatch(update({ title: "Contact Added" }))
    }
    return (

        <Dialog.Root>
            <Dialog.Trigger>
                <Button>Add Contact</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Add Contact</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Enter the contact details
                </Dialog.Description>
                <Flex direction="row" justify="between">
                    <Flex direction="column" gap="3" width="12vw">
                      
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Name
                            </Text>
                            <TextField.Root required value={name} onChange={(e) => setName(e.target.value)}
                                placeholder="Enter full name"
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Phone No.
                            </Text>
                            <TextField.Root required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}
                                placeholder="Enter phone number"
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Email
                            </Text>
                            <TextField.Root required value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Profile picture
                            </Text>
                            <Flex direction="row" gap="5" align="center">
                                <Avatar src={pfp} size="5" radius="medium" color="indigo" fallback={<PersonIcon width="30" height="30" color='gray'/>} />
                                <Button onClick={() => openFilePicker()} size="1" variant='soft'>Edit photo</Button>
                            </Flex>
                        </label>

                    </Flex>
                    <Flex direction="column" gap="3" width="12vw">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Address
                            </Text>
                            <TextField.Root required value={address} onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter address"
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Alt Phone No.
                            </Text>
                            <TextField.Root required value={altphoneNo} onChange={(e) => setAltPhoneNo(e.target.value)}
                                placeholder="Enter alternate number"
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Company
                            </Text>
                            <TextField.Root required value={company} onChange={(e) => setCompany(e.target.value)}
                                placeholder="Enter company name"
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Group
                            </Text>

                            <Select.Root>
                                <Select.Trigger placeholder='Select' />
                                <Select.Content>
                                    <Select.Group>
                                        <Select.Item value="Group1">Group1</Select.Item>
                                        <Select.Item value="Group2">Group2</Select.Item>
                                        <Select.Item value="Group3">Group3</Select.Item>
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                        </label>

                    </Flex>
                </Flex>


                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={contactAddHandle} >Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>

    );
}
export default AddContact;



