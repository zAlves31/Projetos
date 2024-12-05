import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MinCardProfile = ({ userData }) => {
	const BASE_URL = 'http://localhost:3000';
	const GITHUB_API_URL = 'https://api.github.com/users/';
	const location = useLocation();
	const [userInfo, setUserInfo] = useState({
		publications: 0,
		followers: 0,
		following: 0,
	});
	const { username, user_image_path } = location.state || {};
	const [topLanguages, setTopLanguages] = useState([]);

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

			// Buscar postagens do usuário
			const postsResponse = await fetch(`${BASE_URL}/posts`);
			const postsData = await postsResponse.json();
			const userPosts = postsData.filter(
				(post) => post.userId === user.id,
			);

			// Buscar seguidores e seguindo
			const followersResponse = await fetch(`${BASE_URL}/followers`);
			const followersData = await followersResponse.json();

			const followersCount = followersData.filter(
				(follower) => follower.followingId === user.id,
			).length;
			const followingCount = followersData.filter(
				(follower) => follower.followerId === user.id,
			).length;

			setUserInfo({
				publications: userPosts.length,
				followers: followersCount,
				following: followingCount,
			});
		} catch (error) {
			console.error('Erro ao buscar dados do usuário:', error);
		}
	};

	useEffect(() => {
		if (username) {
			fetchUserData(username);
			fetchTopLanguages(username);
		}
	}, [username]);

	if (!username) {
		return null;
	}

	const fetchTopLanguages = async (username) => {
		try {
		  const response = await fetch(`https://api.github.com/users/${username}`);
	  
		  if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		  }
	  
		  const userData = await response.json();
		  const userUrl = userData.repos_url;
	  
		  const userReposResponse = await fetch(userUrl);
		  const userReposData = await userReposResponse.json();
	  
		  let totalBytes = 0;
		  const languages = {};
	  
		  for (const repo of userReposData) {
			const repoLanguagesResponse = await fetch(repo.languages_url);
			const repoLanguagesData = await repoLanguagesResponse.json();
	  
			totalBytes += Object.values(repoLanguagesData).reduce((sum, bytes) => sum + bytes, 0);
	  
			for (const [language, bytes] of Object.entries(repoLanguagesData)) {
			  languages[language] = (languages[language] || 0) + bytes;
			}
		  }
	  
		  // Calcular porcentagem de cada linguagem
		  const sortedLanguages = Object.entries(languages).map(([lang, bytes]) => ({
			name: lang,
			percentage: Math.round((bytes / totalBytes) * 100),
		  })).sort((a, b) => b.percentage - a.percentage);
	  
		  setTopLanguages(sortedLanguages.slice(0, 4));
		} catch (error) {
		  console.error('Erro ao buscar dados de linguagens:', error);
		}
	  };
	  

	return (
		<div className="w-[350px] bg-secondary-white rounded shadow-custom border border-secondary-gray flex flex-col fixed right-7 top-5">
			<div className="w-full flex p-3">
				<div className="w-20 h-20 overflow-hidden rounded-full">
					<img
						src={
							user_image_path ||
							'https://img.freepik.com/vetores-premium/icone-de-perfil-de-usuario-em-estilo-plano-ilustracao-em-vetor-avatar-membro-em-fundo-isolado-conceito-de-negocio-de-sinal-de-permissao-humana_157943-15752.jpg'
						}
						alt={`Perfil de ${username}`}
						className="object-cover w-full h-full"
					/>
				</div>
				<div className="ml-4 flex flex-col justify-center">
					<h1 className="text-secondary-black text-start">
						{username}
					</h1>
					<div>
						{topLanguages.length > 0 ? (
							topLanguages.map((language, index) => (
								<span
									key={index}
									className="text-secondary-black text-sm mr-5"
								>
									{language.name}
								</span>
							))
						) : (
							<span>Nenhuma linguagem encontrada.</span>
						)}
					</div>
				</div>
			</div>

			<div className="p-3">
				<div className="flex mb-1">
					<span className="text-primary-purple text-base font-bold mr-1">
						{userInfo.publications || 0}
					</span>
					<p className="text-secondary-black text-base">
						Publicações
					</p>
				</div>
				<div className="flex mb-1">
					<span className="text-primary-blue text-base font-bold mr-1">
						{userInfo.followers || 0}
					</span>
					<p className="text-secondary-black text-base">Seguidores</p>
				</div>
				<div className="flex">
					<span className="text-primary-blue text-base font-bold mr-1">
						{userInfo.following || 0}
					</span>
					<p className="text-secondary-black text-base">Seguindo</p>
				</div>
			</div>
		</div>
	);
};

export default MinCardProfile;
