import Like from './LikeModel.js'

const LikeController = {
    like: async (req, res) => {
        try {
            const { post_id, user_id } = req.body
            const postLikes = await Like.findOne({post_id: post_id})
            
            if(!postLikes){
                return res.status(404).json({
                    success: false,
                    message: `No document found by this id ${post_id}`
                })
            }
            const {newUserLikes, newUserDislikes} = getNewUserLikesAndDislikes(postLikes, user_id)
            
            await postLikes.updateOne({userDislikes: newUserDislikes, userLikes: newUserLikes})
            
            return res.status(200).json({
                success: true,
                message: 'Document successfully modified',
                data: null
            })

        }catch(err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Oops somethings goes wrong.',
                data: null
            })
        }
    },
    dislike: async (req, res) => {
        try {
            const { post_id, user_id } = req.body
            const postLikes = await Like.findOne({post_id: post_id})
            
            if(!postLikes){
                return res.status(404).json({
                    success: false,
                    message: `No document found by this id ${post_id}`
                })
            }
            const {newUserLikes, newUserDislikes} = getNewUserLikesAndDislikes(postLikes, user_id, false)
            
            console.log(newUserLikes, newUserDislikes)
            await postLikes.updateOne({userDislikes: newUserDislikes, userLikes: newUserLikes})

            return res.status(200).json({
                success: true,
                message: 'Document successfully modified',
                data: null
            })

        }catch(err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Oops somethings goes wrong.',
                data: null
            })
        }
    }
}


/**
 * 
 * @param {Array} postLikes 
 * @param {Boolean} like_clicked if the user click on Like default(true)
 * @returns {Object}
 */
function getNewUserLikesAndDislikes(postLikes, user_id, like_clicked = true){
    const {userLikes, userDislikes} = postLikes
    const array1 = like_clicked ? [...userLikes] : [...userDislikes]
    const array2 = like_clicked ? [...userDislikes] : [...userLikes]
    
    if(!array1.includes(user_id)){
        array1.push(user_id)
        if(array2.includes(user_id)){
            array2.splice(array2.indexOf(user_id), 1)
        }
    } else {
        array1.splice(array1.indexOf(user_id), 1)
    }

    return {
        newUserLikes: like_clicked ? array1 : array2,
        newUserDislikes: like_clicked ? array2 : array1 
    }

}



export default LikeController