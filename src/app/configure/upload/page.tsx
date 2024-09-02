"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
const Page = () => {
  //React state for drag, and by default it is false
  // and extra generic is passed as <boolean>
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const onDropRejected = () => {};

  //This function get called if the input is accepted
  const onDropAccepted = () => {
    console.log("accepted");
  };

  return (
    //Top level div return
    //classname is declared dynamically
    //height full , flex , margin - y 16 , bg-gray
    <div
      className={cn(
        "relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center",
        {
          "ring-blue-900/25 bg-blue-900/10": isDragOver,
        }
      )}
    >
      <div className="relative flex flex-1 flex-col items-center justify-center w-full">
        <Dropzone
          //if file type is wrong
          onDropRejected={onDropRejected}
          //if file type is correct
          onDropAccepted={onDropAccepted}
          //Takes what to take in as a value
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
          //Call when file is entered
          onDragEnter={() => setIsDragOver(true)}
          //call when file is not entered or already given in
          //the input.
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="h-full flex flex-1 flex-col items-center justify-center"
              //Taking all the props
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              asd
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default Page;