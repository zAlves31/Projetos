import { ButtonIcon } from "../button/Button"
import { FaCheck } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export const ModalFollowers = ({ followersList, onClose }) => {
    return (
        <div className="w-[100vw] h-[100vh] bg-secondary-black bg-opacity-50">
            <div className="w-[400px] py-11 px-9 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center bg-secondary-white shadow-modal">
                <IoClose
                    className="absolute left-2 top-2 fill-primary-blue"
                    size={40}
                    onClick={onClose}
                />
                <div className="flex flex-col items-center mb-10">
                    <h2 className="font-chackra text-2xl font-semibold">Seus Seguidores</h2>
                    <hr className="border border-secondary-black w-[90%]" />
                </div>
                <div className="w-[100%]">
                    {/* quando o usuário segue de volta */}
                    <div className="flex items-center justify-between w-[100%] my-4">
                        <div className="flex items-center gap-2">
                            <img
                                src="https://i.pinimg.com/236x/f7/6c/25/f76c251349ed24d483ac514a95e5a9a7.jpg"
                                alt=""
                                className="w-[50px] h-[50px] rounded-full object-cover"
                            />
                            <p>@cachorro</p>
                        </div>
                        <div className="w-[40%]">
                            <ButtonIcon
                                icon={<FaCheck className="absolute top-3 left-2 " />}
                                addStyles={'text-xs py-[10px]'}
                            >Seguindo</ButtonIcon>
                        </div>
                    </div>
                    {/* quando o usuário não segue de volta */}
                    <div className="flex items-center justify-between w-[100%]">
                        <div className="flex items-center gap-2">
                            <img
                                src="https://i.pinimg.com/236x/f7/6c/25/f76c251349ed24d483ac514a95e5a9a7.jpg"
                                alt=""
                                className="w-[50px] h-[50px] rounded-full object-cover"
                            />
                            <p>@cachorro</p>
                        </div>
                        <div className="w-[40%]">
                            <ButtonIcon
                                icon={<FaRegUser className="absolute top-3 left-2 " />}
                                addStyles={'text-xs py-[10px]'}
                            >Seguir</ButtonIcon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}