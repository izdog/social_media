import Like from './LikeModel.js'

const LikeController = {
    like: async (req, res) => {
        try {
            const { post_id, user_id } = req.body
            const postLikes = await Like.findOne({post_id: post_id})
            let {userLikes, userDislikes} = postLikes
            
            if(!postLikes){
                return res.status(404).json({
                    success: false,
                    message: `No document found by this id ${post_id}`
                })
            }
            const {newUserLikes, newUserDislikes} = removeAddElement(userLikes, userDislikes, user_id)
            
            console.log(newUserLikes, newUserDislikes)
            const result = await postLikes.updateOne({userDislikes: newUserDislikes, userLikes: newUserLikes})
            return res.status(200).json({
                success: true,
                message: 'Document successfully modified',
                data: result
            })

        }catch(err) {
            console.log(err.message)
            return res.status(500).json({
                success: false,
                message: 'Oops somethings goes wrong.',
                data: null
            })
        }
    },
    dislike: async (req, res) => {

    }
}

function removeAddElement(add,remove, user_id){
    let array1 = add
    let array2 = remove
    const isPresentIn1 = array1.includes(user_id)
    const isPresentIn2 = array2.includes(user_id)

    if(!isPresentIn1) {
        array1.push(user_id)
        if(isPresentIn2){
            array2 = array2.filter(el => el  !== user_id)
        }
    } else {
        array1 = array1.filter(el => el !== user_id)
    }

    return {
        array1,
        array2
    }
}

export default LikeController