import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "./firebaseApp";
import {collection,addDoc,serverTimestamp, query, 
    orderBy, onSnapshot, where, doc, getDoc, updateDoc, deleteDoc, 
    arrayUnion, arrayRemove, limit} from 'firebase/firestore'

export const addPost=async (formData)=>{
    console.log(formData);
    const collectionRef=collection(db,'posts')
    const newItem={...formData,timestamp:serverTimestamp()}
    const newDocRef=await addDoc(collectionRef,newItem)
}

export const readPosts=async (setPosts,selectedCategories)=>{
    const collectionRef=collection(db,'posts')
    const q=selectedCategories.length==0 ?  query(collectionRef,orderBy('timestamp','desc')) :
                                            query(collectionRef,where('category','in',selectedCategories))
    const unsubscribe=onSnapshot(q,(snapshot)=>{
        setPosts(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
    })
    return unsubscribe
}

export const readPost=async (id,setPost,setLikes=null)=>{
    const docRef=doc(db,"posts",id)
    try{
        const docSnap=await getDoc(docRef)
        if(docSnap.exists()){
            setPost({...docSnap.data(),id:docSnap.id})
            setLikes && setLikes(docSnap.data().likes.length)
        }else
            console.log('A dokumentum nem létezik!');
    }catch(err){
        console.log(err);
    }
}
export const editPost=async (id,{title,category,description})=>{
    const docRef=doc(db,"posts",id)
    await updateDoc(docRef,{title,category,description})
}
export const deleteFile=async (url)=>{
    const fileRef=ref(storage,url)
    try{
        await deleteObject(fileRef)
        return true
    }catch(err){
        console.log('deleteFile:',err);
        return false
    }
}
export const deletePost=async (id)=>{
    const docRef=doc(db,"posts",id)
    await deleteDoc(docRef)
}
export const editLikes=async (postId,userId)=>{
    const docRef=doc(db,"posts",postId)
    const docSnap=await getDoc(docRef)
    //console.log(docSnap.data().likes.indexOf(userId));
    let likesCount=docSnap.data().likes.length
    if(docSnap.data().likes.indexOf(userId)==-1){
        likesCount++
        await updateDoc(docRef,{likes:arrayUnion(userId),likesCount})
    }else{
         likesCount--
        await updateDoc(docRef,{likes:arrayRemove(userId),likesCount}) 
    }
    //await update
    return likesCount
}

export const popularPosts=(setPosts)=>{
    const collectionRef=collection(db,'posts')
    const q=query(collectionRef,orderBy('likesCount','desc'),limit(3)) 
    const unsubscribe=onSnapshot(q,(snapshot)=>{
    setPosts(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
})
return unsubscribe
}