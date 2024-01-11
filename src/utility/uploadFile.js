import {storage} from './firebaseApp'
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';

export const uploadFile=async (file)=>{
    try{
        const fileRef=ref(storage,`uploads/${uuidv4()+file.name.slice(-4)}`)
        await uploadBytes(fileRef,file)
        const photoUrl=await getDownloadURL(fileRef)
        return photoUrl
    }catch(err){
        console.log('Hiba a fájlfeltöltés során:',err);
        throw err
    }

}