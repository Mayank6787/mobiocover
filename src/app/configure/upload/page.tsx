"use client";
import { Progress } from "@/components/ui/progress";

import { useToast } from "@/hooks/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
const Page = () => {
  const { toast } = useToast();
  //React state for drag, and by default it is false
  // and extra generic is passed as <boolean>
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const router = useRouter();




  

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;
      //while applying a transition , user will be push to the next page
      //with configId
      startTransition(() => {
        router.push(`/configure/design?id=${configId}`);
      });
    },
    //and then we get uploadoProgress and then we set to the setUploadProgress .
    onUploadProgress(p) {
      setUploadProgress(p);
    },
  });






  //This function get called if file is rejected
  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;

    setIsDragOver(false);

    //show error notification if the file is not accepted ,
    toast({
      title: `${file.file.type} type is not supported `,
      description: "Please choose a PNG , JPG , or JPEG image instead",
      variant: "destructive",
    });
  };

  //This function get called if the input is accepted
  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configId: undefined });

    //image was succefully accepted
    setIsDragOver(false);
  };

  // startTransition use this function when we navigate user to the next page
  const [isPending, startTransition] = useTransition();

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

              {/* conditional check */}
              {isDragOver ? (
                <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2"></MousePointerSquareDashed>
              ) : isUploading || isPending ? (
                //For user uploading till uploaded process
                <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2"></Loader2>
              ) : (
                // Image icon from lucide react
                <Image className=" h-6 w-6 text-zinc-500 mb-2" />
              )}
              <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <p>Uploading...</p>
                    <Progress
                      value={uploadProgress}
                      className="mt-2 w-40 bg-gray-300"
                    />
                  </div>
                ) : isPending ? (
                  <div className="flex flex-col items-center">
                    <p>Redirecting please wait...</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className="font-semibold">Drop file</span>
                    to upload
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                )}
              </div>

              {isPending ? null : (
                <p className="text-xs text-zinc-500">PNG , JPG , JPEG</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default Page;

/* Now the dropzone is ready with upload , let see how we are going to work with the progress bar and for progress bar to work we need to take and store the what user gives and to store that we use uploadthing.com
 */
