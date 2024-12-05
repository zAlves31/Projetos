import { TitleSuggested } from "../tilte/Title";
import { ButtonIcon } from "../button/Button"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Suggested = ({ listUsers }) => {

    const [following, setFollowing] = useState(false);

    const navigate = useNavigate();

    const alternarEstado = () => {
        setFollowing(prevEstado => !prevEstado);
    };

    const handleNavigation = (u) => {
        navigate('/perfil', { state: { profileSuggested: u, profileFollow: true } });
    };

    return (
        <div className={`w-[340px] h-[380px] m-4`}>
            <div className="shadow-custom space-y-4 p-5  bg-secondary-white border rounded">

                <TitleSuggested className="self-center">Perfis Sugeridos</TitleSuggested>
                {listUsers.slice(0, 4).map((u) => (
                    <div className="flex items-center p-2 space-x-12 justify-between">
                        <div className="flex items-center space-x-2">
                            <img className="w-12 h-12 rounded-full" src={u.user_image_path} alt="Descrição da imagem" onClick={() => handleNavigation(u)} />
                            <h4 className="text-secondary-black text-base" onClick={() => handleNavigation(u)}>{u.username}</h4>
                        </div>
                        <div className="w-[25%] h-[32px] text-base">
                            <ButtonIcon handleClick={alternarEstado}>{following ? "Seguindo" : "Seguir"}</ButtonIcon>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Suggested;