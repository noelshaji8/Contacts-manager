import React from 'react';
import "../utils/styles/homePage.css"
import '@radix-ui/themes/styles.css';
import "../utils/styles/contactDisplayCard.css"
import { Text, TextField, Flex, Theme, Box, Avatar, Card, Button, Select, TextArea, Table, AlertDialog } from '@radix-ui/themes';
// import * as Select from "@radix-ui/react-select"

function GroupDisplayCard() {
    return (
        <div className='contact-display'>
            <div className='left'>
                <div className='contact-title'>

                    <Card size="3" variant='ghost' style={{ margin: "0" }}>
                        <Flex gap="6" align="center" direction="column">
                            <Text as="div" size="7" weight="bold">
                                Engineers
                            </Text>
                            <Box>
                                <Text as="div" size="4" weight="bold">
                                    Members: 5
                                </Text>

                            </Box>
                        </Flex>
                    </Card>

                </div>
                <div className='options'>
                    <h2>Options</h2>
                    <Flex gap="3" justify="center">
                        <Button size="3">Update</Button>

                        <AlertDialog.Root>
                            <AlertDialog.Trigger>
                                <Button color="red">Delete</Button>
                            </AlertDialog.Trigger>
                            <AlertDialog.Content maxWidth="450px">
                                <AlertDialog.Title>Revoke access</AlertDialog.Title>
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
                                        <Button variant="solid" color="red">
                                            Delete contact
                                        </Button>
                                    </AlertDialog.Action>
                                </Flex>
                            </AlertDialog.Content>
                        </AlertDialog.Root>

                        
                    </Flex>
                </div>
            </div>

            <div className='group-details'>

                <Flex direction="column" gap="3" >
                    <div className='group-textarea'>
                        <Text as="div" size="3" mb="1" weight="bold">
                            Description
                        </Text>
                        <TextArea size="3"
                            placeholder="Enter Description"
                        />
                    </div>
                </Flex>
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
                            <Table.Cell>danilo@example.com</Table.Cell>
                            <Table.Cell>Developer</Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
                            <Table.Cell>zahra@example.com</Table.Cell>
                            <Table.Cell>Admin</Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
                            <Table.Cell>jasper@example.com</Table.Cell>
                            <Table.Cell>Developer</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>

                <Button id='save-btn' size="3">Save</Button>
            </div>

        </div>


    );
}

export default GroupDisplayCard;

