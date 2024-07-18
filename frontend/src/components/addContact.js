import React from 'react';
import "../utils/styles/homePage.css"
import '@radix-ui/themes/styles.css';
import { Dialog, Button, Flex, Text, TextField, Select } from '@radix-ui/themes';

function AddContact() {
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
                            <TextField.Root
                                placeholder="Enter full name"
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Phone No.
                            </Text>
                            <TextField.Root
                                placeholder="Enter phone number"
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Email
                            </Text>
                            <TextField.Root
                                placeholder="Enter email"
                            />
                        </label>

                    </Flex>
                    <Flex direction="column" gap="3" width="12vw">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Address
                            </Text>
                            <TextField.Root
                                placeholder="Enter address"
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Alt Phone No.
                            </Text>
                            <TextField.Root
                                placeholder="Enter alternate number"
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
                        <Button>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>

    );
}
export default AddContact;



