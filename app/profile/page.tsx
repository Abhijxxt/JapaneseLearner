'use client'

import { useEffect, useState } from "react"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { read } from "fs";

export default function ProfileBox() {
    
    const [user, setUser] : any = useState([]);
    const [readOnly, setReadOnly] = useState(true);
    const [saveButton, setSaveButton] = useState(false);
    const [open, setOpen] = useState(false);

      const logout = () => {
        localStorage.removeItem('user');
        setUser({});
        window.location.href = '/login';
    }

    const updateButton = () => {
        setReadOnly(false); 
        toast.info("You can add changes now and click save")
        setSaveButton(true);
    }

    const editPassword = (event : any) => {
        event.preventDefault();
        if(event.target[0].value === '' || event.target[1].value === '') {
            toast.error("Please fill in both password fields");
            return; 
        }
        if(event.target[0].value !== event.target[1].value) {
            toast.error("Passwords do not match");
            return;
        }
        const newPassword = event.target[0].value;
        setUser({ ...user, password: newPassword });
        setSaveButton(true);
        setOpen(false);
        toast.success("Press save to update your password");
    }

    const updateUser = async () => {
        console.log(user)
        const response = await fetch('/api/updateUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: user.uid,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
            }),
        });
        if(response.status !== 200) {
            toast.error("Failed to update user data");
        }
        else {
            const data = await response.json();
            toast.success("User data updated successfully");
            setReadOnly(true);
            setSaveButton(false);
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
        }
        // console.log("User data to be updated:", user);
    }

    const resetButton = () => {
        window.location.reload();
    }

    useEffect(() => {
        setReadOnly(true);
        setSaveButton(false);
        const user_data = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user_data || !user_data.firstname) {
            console.error("User data is not available");
            window.location.href = '/login';
            return;
        }
        setUser(user_data);
        // console.log("User data loaded:", user);
    }, [])

    return (
        <div className="w-full h-[90vh] flex items-center justify-center">
            <Card className="w-[30%] h-auto p-4 shadow-lg">
                <CardHeader>
                    <CardTitle>Profile page</CardTitle>
                    <CardDescription>View/Edit your profile data</CardDescription>
                    <CardAction><Button onClick={logout}>Log out</Button></CardAction>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-row gap-1">
                        <div>
                            <Label className="text-lg font-semibold">First Name:</Label>
                            <Input
                                defaultValue={user.firstname || ''}
                                // value={user.firstname || ''}
                                onChange={(e) => setUser({ ...user, firstname: e.target.value })}
                                readOnly={readOnly}
                                className="mb-2"
                            />
                        </div>
                        <div>
                            <Label className="text-lg font-semibold">Last Name:</Label>
                            <Input defaultValue={user.lastname || ''} 
                             onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                             readOnly={readOnly} className="mb-2" />
                        </div>
                    </div>
                    <label className="text-lg font-semibold">Email:</label>
                    <Input defaultValue={user.email || ''}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        readOnly={readOnly} 
                    />
                    
                    <Dialog open={open} onOpenChange={setOpen} >
                        <DialogTrigger className="w-full"><p className="w-full mt-4 text-blue-700 hover:cursor-pointer ">Change Password</p></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>What's your new password?</DialogTitle>
                            <DialogDescription>
                                Please enter your new password below.
                            </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={editPassword}>
                                <Label className="text-lg font-semibold">New Password:</Label>
                                <Input type="password" placeholder="********" />
                                <Label className="text-lg font-semibold mt-2">Re-enter Password:</Label>
                                <Input type="password" placeholder="********" />
                                <Input type="submit" className="mt-8 bg-slate-900 text-white" value="Change password" />
                            </form>
                        </DialogContent>
                    </Dialog>


                </CardContent>
                <CardFooter className="flex flex-row justify-between">
                    <div>
                        <Button onClick={updateButton}> Update </Button>
                        {saveButton && <Button onClick={updateUser} className="ml-4"> Save </Button>}
                    </div>
                    <Button onClick={resetButton} className="bg-red-500 hover:bg-red-800"> Reset </Button>
                </CardFooter>
            </Card>
        </div>
    )
}