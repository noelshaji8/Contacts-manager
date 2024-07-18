import React from 'react';
import "../utils/styles/homePage.css"
import '@radix-ui/themes/styles.css';
import "../utils/styles/contactDisplayCard.css"
import { Text, TextField, Flex, Theme, Box, Avatar, Card, Button, Select } from '@radix-ui/themes';
// import * as Select from "@radix-ui/react-select"

function ContactDisplayCard() {
    return (
        <div className='contact-display'>
            <div className='left'>
                <div className='contact-title'>

                    <Card size="3" variant='ghost' style={{ margin: "0" }}>
                        <Flex gap="6" align="center" direction="row">
                            <Avatar size="7" radius="medium" fallback="T" color="indigo" />
                            <Box>
                                <Text as="div" size="7" weight="bold">
                                    Teodros Girmay
                                </Text>

                            </Box>
                        </Flex>
                    </Card>

                </div>
                <div className='options'>
                    <h2>Options</h2>
                    <Flex gap="3" justify="center">
                        <Button size="3">Update</Button>
                        <Button size="3">Delete</Button>
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
                            <TextField.Root size="3"
                                placeholder="Enter full name"
                            />
                        </label>
                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Phone No.
                            </Text>
                            <TextField.Root size="3"
                                placeholder="Enter phone number"
                            />
                        </label>
                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Email
                            </Text>
                            <TextField.Root size="3"
                                placeholder="Enter email"
                            />
                        </label>

                    </Flex>
                    <Flex direction="column" gap="3" width="12vw">
                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Address
                            </Text>
                            <TextField.Root size="3"
                                placeholder="Enter address"
                            />
                        </label>
                        <label className='textarea'>
                            <Text as="div" size="3" mb="1" weight="bold">
                                Alt Phone No.
                            </Text>
                            <TextField.Root size="3"
                                placeholder="Enter alternate number"
                            />
                        </label>
                        <label className='textarea'>
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

                        </label>

                    </Flex>
                </Flex>
                <Button id='save-btn' size="3">Save</Button>
            </div>

        </div>


    );
}

export default ContactDisplayCard;

