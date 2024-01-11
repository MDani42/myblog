import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { popularPosts } from '../utility/crudUtility'

export const PopularPosts = () => {
    const [posts,setPosts]=useState(null)
    const [flag, setFlag]=useState(false)
    useEffect(()=>{
        popularPosts(setPosts)
    },[flag])

  return (
    <div>
        <h6 onClick={()=>setFlag(!flag)}>
            {flag?'Hide popular posts':'Show popular posts'}
        </h6>

        {flag && posts.map(obj=>
            <div>{obj.title} - {obj.likesCount}</div>
            )}
    </div>
  )
}
