import { IoClose } from 'react-icons/io5';
import { Button } from '../button/Button';
import { LuImagePlus } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { CreateImageFile } from '../../utils/configAzure/serverconfig';
import { useLocation } from 'react-router-dom';

export const ModalPost = ({ isOpen, setIsOpen, onClose, userId }) => {
	userId = '10c2';

	const [textPost, setTextPost] = useState(''); // Define estado inicial para o conteúdo do texto da postagem
	const [file, setFile] = useState(null); // Define estado inicial para o arquivo de imagem
	const [blob, setBlob] = useState(null); // Define estado para armazenar a URL do arquivo enviado
	const [preview, setPreview] = useState(null); // Define estado para pré-visualização da imagem
	const BASE_URL = 'http://localhost:3000';
	const location = useLocation();
	const { username, user_image_path } = location.state || {};

	const handleUploadFile = async () => {
		// Função para upload do arquivo de imagem
		try {
			if (file) { // Verifica se há arquivo
				const urlImage = await CreateImageFile(file); // Faz o upload da imagem e obtém a URL do Blob Storage
				if (urlImage) {
					setBlob(urlImage); // Define a URL da imagem no estado
					return urlImage; // Retorna a URL da imagem
				} else {
					alert('Erro ao conectar com o blobStorage'); // Alerta em caso de erro de conexão
				}
			}
		} catch {
			alert('Não foi possível salvar o arquivo'); // Alerta em caso de falha no upload
		}
		return null; // Retorna nulo se houver erro ou ausência de arquivo
	};

	useEffect(() => {
		setBlob(null); // Reseta o estado do blob sempre que o arquivo for alterado
	}, [file]); // Monitora mudanças no estado do arquivo (file)

	const handlePost = async (ev) => {
		// Função chamada ao submeter o formulário para criar a postagem
		ev.preventDefault(); // Previne comportamento padrão de atualização da página

		const uploadedBlobUrl = await handleUploadFile();
		// Faz o upload da imagem e armazena a URL retornada

		try {
			const res = await fetch('http://localhost:3000/posts', {
				// Envia requisição POST para salvar a postagem
				method: 'POST', // Define o método HTTP
				body: JSON.stringify({
					text_content: textPost, // Conteúdo de texto da postagem
					created_at: new Date().getTime(), // Data e hora de criação da postagem
					image_path: uploadedBlobUrl || '', // Caminho da imagem (ou string vazia se não houver)
					userId: userId, // ID do usuário autor da postagem
				}),
				headers: {
					'Content-Type': 'application/json', // Define o tipo de conteúdo da requisição
				},
			});
			if (res.ok) {
				setIsOpen(false); // Fecha o modal se a postagem for bem-sucedida
			} else {
				alert('Erro ao publicar'); // Alerta em caso de erro na publicação
			}
		} catch (error) {
			alert('Erro ao conectar ao servidor'); // Alerta em caso de falha de conexão
		}
	};

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

	// if (file) {
	// 	// Create a preview URL for the selected file
	// 	const objectUrl = URL.createObjectURL(file);
	// 	setPreview(objectUrl);

	// 	// Cleanup the URL when the component unmounts or file changes
	// 	return () => URL.revokeObjectURL(objectUrl);
	// } else {
	// 	setPreview(null);
	// }
	// {preview && (
	// 	<div className="mb-4">
	// 		<img
	// 			src={preview}
	// 			alt="Preview"
	// 			className="w-full h-40 object-cover rounded-lg"
	// 		/>
	// 	</div>
	// )}

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
    {/* Formulário para desktop */}
    <form
        onSubmit={handlePost}
        className="hidden md:block bg-secondary-white h-96 w-[70%] p-2 rounded-lg border border-primary-purple shadow-modal text-center"
    >
        <div className="items-center mb-4">
            <IoClose
                onClick={onClose}
                className="text-4xl text-primary-blue cursor-pointer"
            />
            <div className="flex flex-row gap-2 items-center pl-14">
                <img
                    className="w-12 h-12 rounded-full"
                    src={
                        user_image_path ||
                        'https://img.freepik.com/vetores-premium/icone-de-perfil-de-usuario-em-estilo-plano-ilustracao-em-vetor-avatar-membro-em-fundo-isolado-conceito-de-negocio-de-sinal-de-permissao-humana_157943-15752.jpg'
                    }
                />
                <h1 className="text-lg font-semibold text-black">
                    {username}
                </h1>
            </div>
        </div>
        {preview && (
            <div className="mb-4">
                <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg"
                />
            </div>
        )}

        <textarea
            className="w-[90%] h-44 p-4 border border-secondary-gray rounded-lg resize-none focus:outline-none"
            placeholder="No que você está pensando?"
            onChange={(ev) => setTextPost(ev.target.value)}
            value={textPost}
        ></textarea>

        <div className="flex items-center justify-between mt-4 pl-14 pr-14">
            <div className="flex flex-row gap-2">
                <LuImagePlus className="text-2xl text-primary-purple" />
                <label
                    htmlFor="image-input"
                    className="flex items-center text-primary-purple cursor-pointer"
                >
                    <span>adicionar arquivo...</span>
                    <input
                        id="image-input"
                        type="file"
                        accept=".jpg,.jpeg,.png,.gif"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: 'none' }}
                    />
                </label>
            </div>
            <div className="w-[15%]">
                <Button isGradient={true}>Publicar</Button>
            </div>
        </div>
    </form>

    {/* Formulário para mobile */}
    <form
        onSubmit={handlePost}
        className="block md:hidden bg-secondary-white w-full max-w-md p-4 rounded-lg border border-primary-purple shadow-modal text-left"
    >
        <div className="flex items-center mb-4">
            <div className="flex items-center gap-2">
                <img
                    className="w-12 h-12 rounded-full"
                    src={
                        user_image_path ||
                        'https://img.freepik.com/vetores-premium/icone-de-perfil-de-usuario-em-estilo-plano-ilustracao-em-vetor-avatar-membro-em-fundo-isolado-conceito-de-negocio-de-sinal-de-permissao-humana_157943-15752.jpg'
                    }
                />
                <h1 className="text-lg font-semibold text-black">
                    {username}
                </h1>
            </div>
            <IoClose
                onClick={onClose}
                className="text-4xl text-primary-blue cursor-pointer ml-auto"
            />
        </div>
        {preview && (
            <div className="mb-4">
                <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg"
                />
            </div>
        )}

        <textarea
            className="w-full h-32 p-4 border border-secondary-gray rounded-lg resize-none focus:outline-none"
            placeholder="No que você está pensando?"
            onChange={(ev) => setTextPost(ev.target.value)}
            value={textPost}
        ></textarea>

        <div className="flex items-center justify-between mt-4">
            <div className="flex flex-row gap-2">
                <LuImagePlus className="text-2xl text-primary-purple" />
                <label
                    htmlFor="image-input"
                    className="flex items-center text-primary-purple cursor-pointer"
                >
                    <span>adicionar arquivo...</span>
                    <input
                        id="image-input"
                        type="file"
                        accept=".jpg,.jpeg,.png,.gif"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: 'none' }}
                    />
                </label>
            </div>
            <div className="w-1/3">
                <Button isGradient={true}>Publicar</Button>
            </div>
        </div>
    </form>
</div>

	);
};
