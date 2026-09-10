import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'

const Feed = () => {

    const [posts,setPosts]=useState([
        {
            _id:"1",
            image:"https://images.unsplash.com/photo-1598760122223-45f0f18a1bbd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGJhY2tncm91bmQlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",
            caption:"beautiful"
        }
    ])

    useEffect(() =>{
        axios.get("http://localhost:3000/posts")
        .then((res)=>{
            setPosts(res.data.posts)
        })
},[])

  return (
    <div>
      
    
    <section className='feed-section'>
        
        
        {
            posts.length>0 ? (
                posts.map((post)=>(
                    <div key={post._id} className='post-card'>
                        <img src={post.image} alt={post.caption}/>
                        <p>{post.caption}</p>

                    </div>
                ))
            ):(
                <h1>No posts Available</h1>
            )
        }
        

    </section>
    </div>
  )
}

export default Feed