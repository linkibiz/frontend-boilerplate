import EditSocialsModal from "@/components/EditSocialsModal";
import Layout from "@/components/Layout";
import withAuth from "@/components/withAuth";
import { useAuthContext } from "@/context/auth-context";
import { API } from "@/utils/constant";
import { getToken } from "@/utils/helpers";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Logo from "../../../../public/images/linki-logo.png";
import InstagramIcon from "@/components/Icons/InstagramIcon";
import QuestionMark from "@/components/Icons/QuestionMark";

const ProfileEdit = () => {
  const [profileID, setProfileID] = useState();
  const [isLoading, setLoading] = useState(true);
  const { userData, setUserData } = useAuthContext();
  const [error, setError] = useState("");
  const router = useRouter();
  const { slug } = router.query;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleUserInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  // console.log("avatar", userData?.avatar);
  const src = userData.avatar?.url || "";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API}/profiles?filters[slug][$eq]=${slug}&populate=deep`);
        if (response.data.data[0].id !== userData.id) {
          router.push(`/${userData.username}`);
        } else {
          setProfileID(response.data.data[0].id);
          setLoading(false);
        }
      } catch (error) {
        console.error(`Error fetching user: ${error.message}`);
      }
    };

    if (userData.id) {
      fetchUser();
    }
  }, [userData.id, slug, router, userData.username]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Get the current state of the resource
      const getResponse = await axios.get(`${API}/profiles/${profileID}?populate=deep`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const currentData = getResponse.data.data.attributes;
      // Merge the current state with the updates
      const updatedData = { ...currentData, ...userData };
      // Make the PUT request
      const putResponse = await axios.put(
        `${API}/profiles/${profileID}`,
        { data: updatedData },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const data = putResponse.data;
      setUserData(data);
      router.push(`/${slug}`);
    } catch (error) {
      console.error(error);
      setError("Error while updating profile data");
    } finally {
      setLoading(false);
    }
  };

  const myLoader = ({ src }) => {
    return src;
  };

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <Layout pageName={`${slug} - Edit`}>
      <div className=" bg-black flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
        <div className=" w-[200px]">
          <Link href="/">
            <Image src={Logo} />
          </Link>
        </div>
        {!isLoading ? (
          <div className="w-full px-6 py-4 mt-6 overflow-hidden sm:max-w-md sm:rounded-lg">
            <form onSubmit={handleProfileUpdate}>
              {src === "" ? (
                ""
              ) : (
                <div className="relative flex flex-col items-center justify-center w-fit mx-auto">
                  <Image
                    className=" border-white border-[3px] h-[200px] w-[200px] object-cover rounded-full"
                    loader={myLoader}
                    src={src}
                    width={500}
                    height={500}
                    alt="User avatar"
                  />
                  <button className=" flex items-center justify-center bg-white text-black p-3 h-14 w-14 rounded-full text-sm text-center absolute bottom-0 right-0 font-bold">
                    Edit
                  </button>
                </div>
              )}

              <div className="mt-4">
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="nombre_completo"
                    placeholder="Name"
                    value={userData?.nombre_completo}
                    onChange={handleUserInputChange}
                    className=" p-3 bg-[#1a1a1a] text-white block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="ocupacion"
                    placeholder="Ocupacion"
                    value={userData?.ocupacion}
                    onChange={handleUserInputChange}
                    className=" p-3 bg-[#1a1a1a] text-white block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex flex-col items-start">
                  <textarea
                    name="sobre_mi"
                    rows="5"
                    cols="33"
                    placeholder="Bio"
                    value={userData?.sobre_mi}
                    onChange={handleUserInputChange}
                    className=" p-3 bg-[#1a1a1a] text-white block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>

              <div className="mt-4">
                <h3 className=" text-white my-3 font-bold uppercase tracking-wide">CONTACTO</h3>
                <div className="container mx-auto p-4 bg-[#1e1e1e] rounded-lg">
                  <button className="text-black w-full bg-white font-bold py-2 px-4 rounded" onClick={openModal}>
                    AGREGAR
                  </button>

                  <EditSocialsModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
                </div>
              </div>
              <div className="mt-4">
                <h3 className=" text-white my-3 font-bold uppercase tracking-wide">Redes sociales</h3>
                <div className="container mx-auto p-4 bg-[#1e1e1e] rounded-lg flex flex-col gap-4">
                  <div className="flex items-end gap-4">
                    <div className=" w-9">
                      <InstagramIcon />
                    </div>
                    <div className="flex flex-col grow gap-1">
                      <p className="flex text-white text-[12px] gap-1">
                        instagram
                        <span className=" w-[18px]">
                          <QuestionMark />
                        </span>
                      </p>
                      <div className="relative">
                        <input type="text" className="rounded-md py-1 px-2 w-full"></input>
                        <span className="absolute w-[18px] h-[18px] rounded-full bg-[#d36a6a] text-white left-[95%] bottom-[75%] font-bold flex items-center justify-center text-[10px]">X</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-black w-full bg-white font-bold py-2 px-4 rounded" onClick={openModal}>
                    AGREGAR
                  </button>

                  <EditSocialsModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
                </div>
              </div>
              <div className="mt-4">
                <h3 className=" text-white my-3 font-bold uppercase tracking-wide">Enlaces</h3>
                <div className="container mx-auto p-4 bg-[#1e1e1e] rounded-lg">
                  <button className="text-black w-full bg-white font-bold py-2 px-4 rounded" onClick={openModal}>
                    AGREGAR
                  </button>

                  <EditSocialsModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withAuth(ProfileEdit);
