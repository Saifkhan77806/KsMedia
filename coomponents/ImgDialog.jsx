import React, { useState } from "react";
import { useAuth } from "../store/auth";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  IconButton,
  Typography,
  Card,
} from "@material-tailwind/react";
 
 function ImgDialog({imgUrl}) {
  const {opened} = useAuth()
  //  const [opened, setOpened] =useState(isOpen)
  // const [open, setOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
 
  const handleOpen = () => opened();
  const handleIsFavorite = () => setIsFavorite((cur) => !cur);
 
  return (
    <>
       <Dialog size="xl" open={true} onClick={handleOpen} className="p-6 w-[100%] bg-gradient-to-tr from-zinc-200 to-slate-700">
        <DialogHeader className="justify-between">
          <div className="flex items-center gap-3 mb-2">
            <Avatar
              size="sm"
              variant="circular"
              alt="tania andrew"
              src={imgUrl}
            />
            <div className="-mt-px flex flex-col">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium"
              >
                Tania Andrew
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="text-xs font-normal"
              >
                @emmaroberts
              </Typography>
            </div>
          </div>
        </DialogHeader>
        <DialogBody>
          <img
            alt="nature"
            className="h-[48rem] w-full rounded-lg object-cover object-center"
            src={imgUrl}
          />
        </DialogBody>
        <DialogFooter className="justify-between">
          <div className="flex items-center gap-16 mt-2">
          <Button
            size="sm"
            variant="outlined"
            color="blue-gray"
            className="mr-5 flex items-center"
          >
            Share
          </Button>
          </div>

        </DialogFooter>
      </Dialog>
    </>
  );
}
export default ImgDialog;