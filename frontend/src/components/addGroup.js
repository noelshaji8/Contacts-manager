import React from 'react';
import "../utils/styles/homePage.css"
import '@radix-ui/themes/styles.css';
import { Dialog, Button, Flex, Text, TextField, TextArea } from '@radix-ui/themes';

function AddGroup() {
    return (

        <Dialog.Root>
            <Dialog.Trigger>
                <Button>Add Group</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Add Group</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                   Enter the group details
                </Dialog.Description>
                
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Name
                            </Text>
                            <TextField.Root
                                placeholder="Enter group name"
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Description
                            </Text>
                           
                            <TextArea placeholder="Enter group description" />
                        </label>
                       

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
export default AddGroup;



