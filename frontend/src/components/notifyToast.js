import React, { useEffect, useState } from 'react';
import * as Toast from '@radix-ui/react-toast';
import '../utils/styles/notifyToast.css';
import { useSelector } from 'react-redux';
import { Cross2Icon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';

function NotifyToast() {

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("")

    const userUpdate = useSelector((state) => state.user.isUpdated)
    const contactsUpdate = useSelector((state) => state.contacts.isUpdated)


    useEffect(() => {
        setTitle(userUpdate.title)
        setOpen(true)
    }, [userUpdate])

    useEffect(() => {
        setTitle(contactsUpdate.title)
        setOpen(true)
    }, [contactsUpdate])

    return (
        title &&
        <Toast.Provider swipeDirection="right" duration="3000">
            <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
                <Toast.Title className="ToastTitle">{title}</Toast.Title>
                <Toast.Action className="ToastAction" asChild altText="Goto schedule to undo">
                    <IconButton onClick={()=>{setOpen(false)}} id='iconbtn' variant='ghost' color='teal' >
                        <Cross2Icon height="16" width="16" />
                    </IconButton>
                </Toast.Action>
            </Toast.Root>
            <Toast.Viewport className="ToastViewport" />
        </Toast.Provider>
    );
};


export default NotifyToast