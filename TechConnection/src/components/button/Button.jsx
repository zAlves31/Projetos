import {RiLogoutBoxLine} from "react-icons/ri";

// Botão puro para ser renderizado
export const Button = ({children, handleClick, buttonWidth, isGradient=false, addStyles}) => {

    return (
        <button
            onClick={handleClick}
            className={`text-center ${isGradient ? 'bg-techGradient' : 'bg-primary-blue'} rounded py-0.5 w-[100%] text-secondary-white font-verdana uppercase text-lg ${addStyles}`}
        >
            {children}
        </button>
    )
}

// um botão com ícone que pode ser alterado com base no icone
export const ButtonIcon = ({children, handleClick, icon, isGradient= false, addStyles}) => {

    return (
        <button
            onClick={handleClick}
            className={`relative text-center ${isGradient ? 'bg-techGradient' : 'bg-primary-blue'} rounded py-0.5 w-[100%] h-[30px] text-secondary-white font-verdana text-sm`}
        >
            {icon}
            {children}
        </button>
    )
}

// exemplo de botão com ícone que será usado no figma
export const ButtonLogout = ({children, handleClick, icon, styles}) =>{
    return(
        <ButtonIcon
            icon={<RiLogoutBoxLine className={`absolute left-2 top-2 ${styles}}`}/>}
        >Deslogar</ButtonIcon>
    )
}