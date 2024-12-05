import React, { useEffect, useState } from 'react';
import './Home.css';
import logosimples from '../../assets/images/logosimples.png';
import Header from '../../components/header/Header';
import CardPost, { CardPostImage } from '../../components/cardPost/CardPost';
import ButtonPost from '../../components/buttonPost/ButtonPost';
import MinCardProfile from '../../components/minCardProfile/MinCardProfile';
import { ModalPost } from '../../components/modalPost/Index';
import MinHeader from '../../components/minHeader/MinHeader';
import { IoClose } from "react-icons/io5";

import Suggested from "../../components/suggested/Suggested"

import { useLocation } from 'react-router-dom';

function Home() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalPostData, setModalPostData] = useState(null);
	const [openModalPost, setOpenModalPost] = useState(false);
	const [postCliked, setPostCliked] = useState();
	const user = useLocation().state;
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		if (user) {
			setUserId(user.id);
			console.log(`ID do usuario: ${userId}`);
		}
	}, [user]);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleOpenModalPost = (p) => {
		setPostCliked(p);
		setOpenModalPost(true);
	};

	const handleCloseModalPost = () => {
		setOpenModalPost(false);
	};


	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getPosts();
	}, []);

	async function getPosts() {
		const res = await fetch('http://localhost:3000/posts', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const allPosts = await res.json();
		setPosts(allPosts);
	}

	return (
		<section className={`w-full min-h-screen bg-secondary-lightGray flex flex-col items-center`}>
			<div className="flex sm:hidden bg-secondary-white w-full h-[55px] justify-center items-center border border-none">
				<img src={logosimples} alt="" />
			</div>

			<div className="hidden  lg:block">
				<Header onOpenCreateModal={handleOpenModal} /> {/* Pass handleOpenModal */}
			</div>

			<div className='block lg:hidden'>
				<MinHeader />
			</div>

			<div className="w-[95vw]  lg:w-[40%] mt-5">
				<ButtonPost onClick={handleOpenModal} />
			</div>

			<div className="w-[115vw]  md:w-[50vw] mt-5 flex flex-col">
			<CardPost comment="Estou desenvolvendo um APP em React Native, alguém tem indicação de uma biblioteca de caléndarios?😕"/>
				{posts.map((p) => (
					p.image_path ?

						<CardPostImage key={p.id} comment={p.text_content} imgSource={p.image_path} handleOpenModal={() => handleOpenModalPost(p)} /> :
						<CardPost key={p.id} comment={p.text_content} userId={userId} postId={p.id} />
				))}
			</div>

			<div className="hidden  lg:block">
				<MinCardProfile />
			</div>

			{openModalPost && (
				<div className='fixed inset-0 flex justify-center bg-black bg-opacity-50'>
					<IoClose className='absolute top-8 left-8 text-5xl text-secondary-lightGray cursor-pointer' onClick={handleCloseModalPost} />
					<CardPostImage
						styles={"rounded border border-secondary-gray bg-white border-solid shadow-custom py-4 px-5 self-center w-[50%]"}
						comment={postCliked.text_content} imgSource={postCliked.image_path} postId={postCliked.id}
					/>
				</div>
			)}

			{isModalOpen && (
				<ModalPost
					setIsOpen={setIsModalOpen}
					isOpen={isModalOpen}
					onClose={handleCloseModal}
				/>
			)}
		</section>
	);
}

export default Home;
