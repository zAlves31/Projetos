import React, { useEffect } from 'react';
import { LuImagePlus } from 'react-icons/lu';
import { useLocation } from 'react-router-dom';



// * Butao para iniciar uma postagem, ele fica na parte de cima da tela home
const ButtonPost = ({ styles, onClick }) => {

	const BASE_URL = 'http://localhost:3000';
	const location = useLocation();
	const { username, user_image_path } = location.state || {};


	const fetchUserData = async (username) => {
		try {
			// Buscar informações do usuário
			const userResponse = await fetch(
				`${BASE_URL}/users?username=${username}`,
			);
			const userData = await userResponse.json();
			const user = userData[0];
	
			if (!user) {
				console.error('Usuário não encontrado');
				return;
			}
		} catch (error) {
			console.error('Erro ao buscar dados do usuário:', error);
		}
	};

	useEffect(() => {
        if (username) {
            fetchUserData(username);
        }
    }, [username]);

    if (!username) {
        return null;
    }
	
	return (
		// * Div aleatoria (da ate para tirar)
		<div className={styles}>
			{/* // * button para iniciar uma postagem abrindo o modal postagem */}
			<button onClick={onClick} className="flex flex-row items-center justify-between border border-secondary-gray rounded-md w-full gap-3 py-2 px-3 bg-white shadow-custom">
				{/* //* imagem do usuario */}
				<img
					src={
						user_image_path ||
						'https://img.freepik.com/vetores-premium/icone-de-perfil-de-usuario-em-estilo-plano-ilustracao-em-vetor-avatar-membro-em-fundo-isolado-conceito-de-negocio-de-sinal-de-permissao-humana_157943-15752.jpg'
					}
					alt="foto_pessoal"
					className="rounded-full object-cover h-10 w-10"
				/>
				{/* //* div com o texto do botao */}
				<div className="w-full flex items-center justify-between">
					<p className="text-secondary-gray text-lg font-verdana">
						O que há de novo?
					</p>
					{/* //* icone do botao no final a esquerda */}
					<LuImagePlus color="#7943A7" className="text-2xl" />
				</div>
			</button>
		</div>
	);
};

export default ButtonPost;
