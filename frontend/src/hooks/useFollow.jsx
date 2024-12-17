

import toast from 'react-hot-toast' ; 
import { useMutation,useQuery,useQueryClient } from '@tanstack/react-query';

const useFollow = ()=>{
    const queryClient = useQueryClient(); 

    const {mutate:follow,isPending} = useMutation({
        mutationFn:async(userId)=>{
            try {
                const res =await fetch(`/api/users/follow/${userId}`,{
                    method:"POST",
                    
                })
                const data =await res.json(); 
                console.log("follow data : ", data); 
                if(!res.ok){
                    throw new Error(data.error); 

                }
                return ; 
                
            } catch (error) {
                throw new Error(error); 

            }
        },
        onSuccess:()=>{
            Promise.all(
                queryClient.invalidateQueries({queryKey:['suggestedUsers']}),
            queryClient.invalidateQueries({queryKey:["authUser"]})
            )
        }

    })
    return {follow,isPending}; 
}

export default useFollow; 
