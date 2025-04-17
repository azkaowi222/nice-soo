// @ts-nocheck
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={
            "bg-[#18181B] text-white mt-4 hover:bg-[#2e2e39] hover:text-white"
          }
          variant="outline"
        >
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add product</DialogTitle>
          <DialogDescription>Lorem*15</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username">Price</Label>
            <Input id="username" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username">Category</Label>
            <Input id="username" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username">Description</Label>
            <Input id="username" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username">Image</Label>
            <Input
              type={"file"}
              id="username"
              className="col-span-3 border-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
