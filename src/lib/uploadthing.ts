import { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react";


//Here generic is Ourfilerouter take in file , 
//To use anywhere for react components
export const {useUploadThing , uploadFiles} = generateReactHelpers<OurFileRouter>()