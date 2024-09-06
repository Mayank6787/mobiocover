import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignPreview from "./DesignPreview";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }
//Using data base to access the id, 
  const configuartion = await db.configuration.findUnique({
    where: {id},

  });

  // if no id exists
  if(!configuartion){
    return notFound
  }


  return <DesignPreview/>




};
export default Page;
