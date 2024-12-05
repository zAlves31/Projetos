import React, { useEffect } from 'react';
import { useState } from 'react';

export const Tabs = ({ setPublished, setHearted, setCommented }) => {

    const [activeTab, setActiveTab] = useState('Publicações');
    const tabs = ['Publicações', 'Curtidos'];

    const [posts, setPosts] = useState([]);

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

    useEffect(() => {
        if (setActiveTab(tabs) === activeTab) {

            return getPosts()

        } 
    },[])

    // else if (setActiveTab(tabs) === "Curtidos") {
            
    //     return null 
          
    // } else if (setActiveTab(tabs) === "Comentários") {
        
    //     return null
    // }

    return (
        <div className={`flex flex-row uppercase justify-center lg:gap-6 gap-2 mt-5 font-chackra text-sm`}>
            {tabs.map((tab) => (
                <p
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`cursor-pointer ${activeTab === tab ? 'border-b-2 border-b-black' : ''
                        }`}
                >
                    {tab}
                </p>
            ))}
        </div>
    );
};

export default Tabs;


// onClick={e => setSelectedPlace(item.id)}








