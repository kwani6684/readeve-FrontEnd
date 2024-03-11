'use client'
import NavBar from "@/app/components/NavBar";
import BookLayoutItem from "../BookLayoutItem"
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import lampIcon from '/public/images/lampicon.png'
import Image from "next/image";

export interface PropType {
  params: {
    id: string
    searchParams: {}
  }
}

const Detail = (props: PropType) => {
  const session: any = useSession()

  const [myData, setMyData] = useState([])
  const [documents, setDocuments] = useState<any[]>([])
  const [myPageData,setMyPageData] = useState<any>([])

  const fetchData = async () => {
    if (session.data.user.id) {
      try {
        const response = await axios.get(
          `https://api.bookeverywhere.site/api/data/all/${session.data.user.id}`,
        );
        const data = response.data.data;
        setMyData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    }
  }
  useEffect(() => {
    const storedData = localStorage.getItem('allDataInfo')

    if (storedData) {
      const parsedData = JSON.parse(storedData)
      
      setDocuments(parsedData)
    }
  }, [])
 

  useEffect(() => {
    setMyPageData(documents)
  }, [documents])

  return (
    <><NavBar />
      <section className={`bg-[#F1E5CF] mx-auto h-screen`}>
      {/* 램프&내 서재 */}
      <div className="grid relative mx-auto justify-center text-center mb-10">
        <Image
          src={lampIcon}
          className="inline-block text-center"
          alt={'lampIcon'}
          width={150}
          height={100}
        />
        <div>
        <div className="absolute bottom-8 left-0 right-0 mx-auto myCustomText text-3xl text-white">내 서재</div>
        </div>
        </div>
       
   {documents.length > 0 && (
      <BookLayoutItem bookId={props.params.id} propsData={documents} />
        )}
         </section>
      </>
  )
}

export default Detail;