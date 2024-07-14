import React, { useState } from 'react';
import "../utils/styles/homePage.css"
import '@radix-ui/themes/styles.css';
import { Button, Flex, Avatar, Box, Card, Text } from '@radix-ui/themes';
import * as RadioGroup from '@radix-ui/react-radio-group';

function NavBar() {
    const user = { "username": "Thomas" }
    const [selected, setSelected] = useState('edit1');
    return (

        <div className="navbar">
            <div className='navbar-title'>Company</div>

            <RadioGroup.Root className="navbar-btns-grp" value={selected} onValueChange={setSelected}>
                <RadioGroup.Item value="edit1" id="edit1" asChild>
                    <Button id='navbar-btns' size="3" radius='full' variant="ghost" color='gray'>Contacts</Button>
                </RadioGroup.Item>
                <RadioGroup.Item value="edit2" id="edit2" asChild>
                    <Button id='navbar-btns' size="3" radius='full' variant="ghost" color='gray'>Groups</Button>
                </RadioGroup.Item>
                <RadioGroup.Item value="edit3" id="edit3" asChild>
                    <Button id='navbar-btns' size="3" radius='full' variant="ghost" color='gray'>Map</Button>
                </RadioGroup.Item>
            </RadioGroup.Root>

            <div className='navbar-profile'>
                <Box >
                    <Card size="1" variant='ghost'>
                        <Flex gap="3" align="center">
                            <Text as="div" size="3" weight="regular">
                                Noell Biju Michael
                            </Text>
                            <Avatar size="3" radius="full" fallback="T" color="indigo" />
                        </Flex>
                    </Card>
                </Box>
            </div>
        </div>

    );


}
export default NavBar;

