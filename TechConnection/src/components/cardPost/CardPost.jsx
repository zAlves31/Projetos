import { Input } from '../input/Index';
import {
	FaPaperPlane,
	FaPaperclip,
	FaRegEnvelope,
	FaRegHeart,
	FaHeart,
} from 'react-icons/fa6';
import { FaRegComment } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import ImgPerfilHome from '../../../src/assets/images/modelo-persona.jpg';
import ImgContentHome from '../../../src/assets/images/profile.jpg';

import Tabs from '../Tabs/Tabs';

const CardPost = ({
	userImage,
	userName,
	commentTime,
	comment,
	heartCount,
	commentCount,
	styles,
	postId,
	userId,
	likes,
}) => {
	const [liked, setLiked] = useState(false);
	const [likesArray, setLikesArray] = useState(likes || []);
	const [animate, setAnimate] = useState(false);
	const [newComment, setNewComment] = useState();
	const [comments, setComments] = useState([]);
	const [dataComments, setCommentsData] = useState([]);
	const [showComments, setShowComments] = useState(false);
	const [dataUser, setDataUser] = useState([]);
	const [postData, setPostData] = useState({});

	useEffect(() => {
		setLiked(likesArray.includes(userId));
	}, [likesArray, userId]);

	useEffect(() => {
        // Função para buscar dados do post
        const fetchPostData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/posts/${postId}?_embed=user`);
                const data = await response.json();
                setPostData(data);
            } catch (error) {
                console.error(`Erro ao buscar dados do post: ${error}`);
            }
        };

        fetchPostData(); // Chama a função assim que o componente monta
    }, [postId]); // Dependência do postId para garantir que os dados sejam buscados quando o postId mudar

	useEffect(() => {
		const storedComments = localStorage.getItem(`comments_${postId}`);
		if (storedComments) {
			// Se houver comentários armazenados localmente, carregue-os
			setComments(JSON.parse(storedComments));
			fetchDataComments();
			fetchDataUser();
		} else {
			// Se não houver, busque da API
			fetchDataComments();
		}
	}, [postId]); // Certifique-se de incluir o postId como dependência

	const toggleShowComments = () => {
		setShowComments(!showComments);
	};

	const handleLike = () => {
		const updatedLikes = liked
			? likesArray.filter((id) => id !== userId)
			: [...likesArray, userId];

		setLikesArray(updatedLikes);
		setAnimate(true);
		setLiked(!liked);

		setTimeout(() => setAnimate(false), 300);
	};

	const fetchDataComments = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/comments?_embed=user`,
			);
			const data = await response.json();
			console.log(data);
			// Filtra os comentários pelo postId atual
			const filteredComments = data.filter(
				(comment) => comment.postId === postId,
			);

			// Atualiza o estado com os comentários filtrados
			setComments(filteredComments);

			// Salva os comentários no localStorage
			localStorage.setItem(
				`comments_${postId}`,
				JSON.stringify(filteredComments),
			);
		} catch (error) {
			console.log('Erro ao buscar comentários:', error);
		}
	};

	const fetchDataUser = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/posts/${postId}?_embed=user`,
			);
			const data = await response.json();
			// Definindo o usuário específico do post
			console.log('dados do usuario no post');
			console.log(data);
			setDataUser(data.user);
		} catch (error) {
			console.log(`Erro ao buscar dados do usuário: ${error}`);
		}
	};

	const filterCommentsByPostId = (postId) => {
		const filteredComments = dataComments.filter(
			(comment) => comment.postId === postId,
		);
		setComments(filteredComments);
		saveCommentsToLocalStorage(postId, filteredComments);
	};

	const saveCommentsToLocalStorage = (postId, comments) => {
		localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
	};

	function convertTimestampToDate(timestamp) {
		const date = new Date(timestamp);
		return date.toLocaleString('pt-BR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		});
	}

	const handlePostComment = async (ev) => {
		ev.preventDefault();
		try {
			const response = await fetch('http://localhost:3000/comments', {
				method: 'POST',
				body: JSON.stringify({
					userId: userId,
					postId: postId,
					comentario: newComment,
					created_at: new Date().getTime(),
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const newCommentData = await response.json();
			setCommentsData([...dataComments, newCommentData]);
			filterCommentsByPostId(postId);
			setNewComment('');
			fetchDataComments();
		} catch (error) {
			alert('Erro ao conectar ao servidor');
		}
	};

	return (
		<div
			className={`rounded border border-secondary-gray bg-white border-solid shadow-custom py-4 px-5 self-center w-[80%] mt-[30px] ${styles} overflow-hidden`}
		>
			{postData.user && (
                <div className="flex ">
                    <img
                        src={postData.user.user_image_path || ImgPerfilHome}
                        alt={'Imagem de perfil do usuário'}
                        className="w-[35px] h-[35px] rounded-full object-cover"
                    />
                    <div className="flex flex-col justify-center ml-1">
                        <p className="text-sm">{postData.user.username}</p>
                        <p className="text-xs text-secondary-darkGray">
                            {convertTimestampToDate(postData.created_at)}
                        </p>
                    </div>
                </div>
            )}
			<p className="my-5">{comment}</p>
			<div className="border border-x-0 border-secondary-gray flex py-2 pl-2.5">
				<div
					className={`flex items-center gap-1 mr-3 ${
						animate ? 'heart-animation' : ''
					}`}
					onClick={handleLike}
					style={{ cursor: 'pointer' }}
				>
					{liked ? (
						<FaHeart size={20} className="fill-secondary-red" />
					) : (
						<FaRegHeart size={20} className="fill-secondary-red" />
					)}
					<p className="text-xs font-semibold">{likesArray.length}</p>
				</div>
				<div className="flex items-center gap-1 ml-3">
					<FaRegComment size={20} className="fill-secondary-black" />
					<p className="text-xs font-semibold">{commentCount}</p>
				</div>
			</div>

			<div className="flex flex-col w-[100%] mb-2 ">
				<Input
					placeholder={'Adicione um comentário'}
					setValue={(c) => setNewComment(c.target.value)}
					value={newComment}
				/>
				<FaPaperPlane
					className="fill-secondary-black mt-[-25px] flex place-self-end mr-5"
					onClick={handlePostComment}
				/>
			</div>
			<button className="mt-2" onClick={toggleShowComments}>
				<p className="text-secondary-gray">
					{showComments ? 'Esconder comentários' : 'Ver comentários'}{' '}
					☆*: .｡. o(≧▽≦)o .｡.:*☆
				</p>
			</button>

			{showComments && (
				<div className="mt-4">
					{comments.map((c) => (
						<div key={c.id} className="py-2">
							<div className="flex items-center mb-1">
								<img
									src={
										c.user.user_image_path || ImgPerfilHome
									}
									alt={'Avatar do usuário'}
									className="w-[32px] h-[32px] rounded-full object-cover mr-2"
								/>
								<div className="flex flex-col">
									<span className="text-sm font-verdana">
										@{c.user.username}
									</span>
									<span className="text-sm text-secondary-gray">
										{convertTimestampToDate(c.created_at)}
									</span>
								</div>
							</div>
							<div className="bg-secondary-lightGray py-2 px-3 rounded-md">
								<p className="text-sm">{c.comentario}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export const CardPostImage = ({
	userImage,
	userName,
	commentTime,
	imgSource,
	imgDescription,
	comment,
	heartCount,
	commentCount,
	userId,
	likes,
	handleOpenModal,
	styles,
	onFocus,
	postId,
}) => {
	userId = '10c2';
	const [liked, setLiked] = useState(false);
	const [likesArray, setLikesArray] = useState(likes || []);
	const [animate, setAnimate] = useState(false);
	const [cliked, setCliked] = useState(false);
	const [newComment, setNewComment] = useState();
	const [comments, setComments] = useState([]);

	useEffect(() => {
		setLiked(likesArray.includes(userId));
	}, [likesArray, userId]);

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const response = await fetch(
					`http://localhost:3000/comments?postId=${postId}`,
				);
				const data = await response.json();
				setComments(data);
			} catch (error) {
				console.error('Erro ao buscar comentários:', error);
			}
		};

		fetchComments();
	}, [postId]);

	const handleLike = () => {
		const updatedLikes = liked
			? likesArray.filter((id) => id !== userId)
			: [...likesArray, userId];

		setLikesArray(updatedLikes);
		setAnimate(true);
		setLiked(!liked);

		setTimeout(() => setAnimate(false), 300);
	};

	// In CardPostImage.js
	const handlePostComment = async (ev) => {
		ev.preventDefault();
		try {
			const response = await fetch('http://localhost:3000/comments', {
				method: 'POST',
				body: JSON.stringify({
					userId: userId, // This should be passed as a prop or made available in the component
					postId: postId,
					comentario: newComment,
					created_at: new Date().getTime(),
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			setNewComment('');
		} catch (error) {
			alert('Erro ao conectar ao servidor');
		}
	};

	return (
		<div
			className={`${
				styles
					? styles
					: `rounded border border-secondary-gray bg-white border-solid shadow-custom py-4 px-5 self-center w-[80%] mt-[30px]`
			}`}
			onClick={handleOpenModal}
		>
			<div className="flex ">
				<img
					src={userImage || ImgPerfilHome}
					alt={'Imagem de perfil do usuário'}
					className="w-[35px] h-[35px] rounded-full object-cover"
				/>
				<div className="flex flex-col justify-center ml-1">
					<p className="text-sm">{userName}</p>
					<p className="text-xs text-secondary-darkGray">
						{commentTime}
					</p>
				</div>
			</div>
			<div>
				<img
					src={imgSource}
					alt={imgDescription}
					className="object-contain w-[100%] h-[400px] mt-3 rounded"
				/>
				<p className="my-5 overflow-wrap break-words">{comment}</p>
			</div>
			<div className="border border-x-0 border-secondary-gray flex py-2 pl-2.5">
				<div
					className={`flex items-center gap-1 mr-3 ${
						animate ? 'heart-animation' : ''
					}`}
					onClick={handleLike}
					style={{ cursor: 'pointer' }}
				>
					{liked ? (
						<FaHeart size={20} className="fill-secondary-red" />
					) : (
						<FaRegHeart size={20} className="fill-secondary-red" />
					)}
					<p className="text-xs font-semibold">{likesArray.length}</p>
				</div>
				<div className="flex items-center gap-1 ">
					<FaRegComment size={20} className="fill-secondary-black" />
					<p className="text-xs font-semibold">{commentCount}</p>
				</div>
			</div>
			<div className="flex flex-col w-[100%] mb-2 ">
				<Input
					placeholder={'Adicione um comentário'}
					setValue={(c) => setNewComment(c.target.value)}
					value={newComment}
				/>
				<FaPaperPlane
					className="fill-secondary-black mt-[-25px] flex place-self-end mr-5"
					onClick={handlePostComment}
				/>
			</div>
			{/* Exibir os comentários */}
			<div className="mt-4">
				{comments.map((c) => (
					<div
						key={c.id}
						className="border-b border-secondary-gray py-2"
					>
						<p className="text-sm">{c.comentario}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default CardPost;
