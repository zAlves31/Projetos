import logosimples from "../../assets/images/logosimples.png";

import CardProfile from "../../components/CardProfile/CardProfile"
import CardPost, { CardPostImage } from "../../components/cardPost/CardPost";
import Header from "../../components/header/Header";
import Tabs from "../../components/Tabs/Tabs";
import userImage from "../../assets/images/modelo-persona.jpg"
import MinHeader from "../../components/minHeader/MinHeader";
import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";


function Profile() {
    const [posts, setPosts] = useState([]);

    const [published,setPublished] = useState([])
    const [hearted,setHearted] = useState([])
    const [commented,setCommented] = useState([])

    useEffect(() => {
        getPosts()
    }, []);

    async function getPosts() {
        const res = await fetch('http://localhost:3000/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const allPosts = await res.json();
        setPosts(allPosts)
        console.log(posts);
    }


    const location = useLocation();
    const profileSuggested = location.state?.profileSuggested;
    const stateProfile = location.state?.profileFollow;

    return (
        <section className=" w-full min-h-screen bg-secondary-lightGray h-[100%]">
            <div className="flex sm:hidden bg-secondary-white w-full h-[55px] justify-center items-center">
                <img src={logosimples} alt="" />
            </div>

            <Header addStyles={"hidden sm:flex"} />

            <div className='block lg:hidden'>
                <MinHeader />
            </div>

            <div className="sm:flex-row sm:ml-[25%] pt-6">

                <CardProfile />

                <Tabs
                    setPublished={published}
                    setHearted={hearted}
                    setCommented={commented}
                />

                <div className="w-[115vw] md:w-[60vw] mt-5 ml-[-8%] md:ml-[11%] flex flex-col">
                    {posts.map((p) => (
                        p.image_path ?
                            <CardPostImage comment={p.text_content} imgSource={p.image_path} /> :
                            <CardPost comment={p.text_content} />
                    ))}
                </div>
            </div>
        </section>
    );
}


export default Profile;
