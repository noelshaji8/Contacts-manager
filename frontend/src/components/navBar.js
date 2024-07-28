import React, { useState } from 'react';
import "../utils/styles/homePage.css"
import '@radix-ui/themes/styles.css';
import { Button, Flex, Avatar, Box, Card, Text } from '@radix-ui/themes';
import * as RadioGroup from '@radix-ui/react-radio-group';
import SearchBar from './searchBar';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { readSingleContactState } from '../redux/contactsSlice';
import { readContacts } from '../utils/api';

function NavBar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selected, setSelected] = useState('edit1');

    const selector = (state) => state.user
    const user = useSelector(selector, shallowEqual)

    const handleUserContact = () => {
        navigate("/home/user")
    }

    const handleContactsDisplay = () => {
        navigate("/home")
    }

    return (
        <div className="navbar">
            <div className='navbar-title'>Company</div>
            <SearchBar />

            <RadioGroup.Root className="navbar-btns-grp" value={selected} onValueChange={setSelected}>
                <RadioGroup.Item value="edit1" id="edit1" asChild>
                    <Button onClick={handleContactsDisplay} id='navbar-btns' size="3" radius='full' variant="ghost" color='gray'>Contacts</Button>
                </RadioGroup.Item>
                <RadioGroup.Item value="edit2" id="edit2" asChild>
                    <Button id='navbar-btns' size="3" radius='full' variant="ghost" color='gray'>Groups</Button>
                </RadioGroup.Item>
                <div className='navbar-profile'>
                    <Box >
                        <Card onClick={handleUserContact} size="1" variant='ghost'>
                            <Flex gap="3" align="center">
                                <Text as="div" size="3" weight="regular">
                                    {user.username}
                                </Text>
                                <Avatar size="3" radius="full" fallback={user.username[0]} color="indigo" />
                            </Flex>
                        </Card>
                    </Box>
                </div>
            </RadioGroup.Root>
        </div>

    );


}
export default NavBar;

