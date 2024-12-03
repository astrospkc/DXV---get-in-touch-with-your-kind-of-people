import { is, relations } from 'drizzle-orm';
import { body } from 'express-validator';
import { express } from 'express';
import { db } from '../db/db';
import { connectionTable } from '../db/schema/connection';
import { and, eq } from 'drizzle-orm';
import { addFollower, followersInfo } from '../db/queries/connectionQueries';
import router from './userRoutes';
import fetchuser from '../../middleware/fetchuser';
import { message } from '../db/schema';
// all followers
// followRequest
// followed
// if accept -> you are also following
// if declined -> the other user is the follower but you are not following

// follow Request : /follow/request
// followee_id -> the person who is followed (user itself)
// follower_id -> the person who is following (another user)
async function followRequest(req: express.Request, res: express.Response) {
    const user_id = req.user.id
    const { followee_id } = req.body

    const follower_idAdd = await addFollower(
        {

            follower_id: user_id,
            followee_id: followee_id
        }
    )

    res.json(follower_idAdd)

}


// follow accept: /follow/accept
async function followAccept(req: express.Request, res: express.Response) {
    const { isAccepted, followee_id } = req.body
    const follower_id = req.user.id

    if (isAccepted) {
        const follower_idAdd = await addFollower({

            followee_id: followee_id,
            follower_id: follower_id

        })

        res.json({ follower_idAdd, message: "follow request sent" })
    } else {
        res.json({ message: "follow request refused to send" })
    }
}

// unfollow user : /follow/unfollow
async function unfollow(req: express.Request, res: express.Response) {
    const { followee_id } = req.body
    const user_id = req.user.id
    await db.delete(connectionTable).where(and(eq(connectionTable.followee_id, followee_id), eq(connectionTable.follower_id, user_id))).execute()
    res.json({ message: "unfollowed" })
}

// get followers : /follow/followers
async function getFollowers(req: express.Request, res: express.Response) {
    const user_id = req.user.id
    const followers = await db.select().from(connectionTable).where(eq(connectionTable.followee_id, user_id)).execute()
    console.log("followers: ", followers)
    res.json(followers)
    // const followers_info = await followersInfo(followers)
    // res.json(followers_info)
}


//  get following
async function getFollowing(req: express.Request, res: express.Response) {
    const user_id = req.user.id
    const followers = await db.select().from(connectionTable).where(eq(connectionTable.follower_id, user_id)).execute()
    console.log("followers: ", followers)
    res.json(followers)
    // const followers_info = await followersInfo(followers)
    // res.json(followers_info)
}

// check following or not
async function isFollowing(req: express.Request, res: express.Response) {
    const { followee_id } = req.params
    const isfollowing_User = await db.select().from(connectionTable).where(and(eq(connectionTable.follower_id, req.user.id), eq(connectionTable.followee_id, followee_id))).limit(1).execute()
    console.log("isFollowing user: ", isfollowing_User)
    if (isfollowing_User.length > 0) {
        res.json({ isFollowing: true })
    } else {
        res.json({ isFollowing: false })
    }
}

// check follow status

router.post('/follow/request', fetchuser, followRequest)
router.post('/follow/accept', fetchuser, followAccept)
router.delete('/follow/unfollow', fetchuser, unfollow)
router.get('/follow/followers', fetchuser, getFollowers)
router.get('/follow/following', fetchuser, getFollowing)
router.get('/follow/isFollowing/:followee_id', fetchuser, isFollowing)
export default router