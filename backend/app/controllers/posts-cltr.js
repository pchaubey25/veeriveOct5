import Post from '../models/post-model.js'
const postsCltr = {}

postsCltr.list = async (req, res) => {
    try {
        // Extract context query parameter from the request
        const { context } = req.query;

        // If a context ID is provided, filter posts by context
        let query = {};
        if (context) {
            const contextArray = context.split(',').map(id => id.trim());
            query.context = { $in: contextArray };
        }

        // Fetch posts based on the query
        const posts = await Post.find(query);
        res.json(posts);
        console.log('Filtered posts:', posts);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).json({ error: err.message });
    }
};


postsCltr.date = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Validate and convert startDate and endDate
        if (!startDate || !endDate) {
            return res.status(400).send('Start date and end date are required');
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).send('Invalid date format');
        }

        // Ensure endDate is inclusive
        end.setDate(end.getDate() + 1);

        // Fetch posts within the date range
        const posts = await Post.find({
            date: {
                $gte: start,
                $lt: end
            }
        });

        res.json(posts);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).send('Server Error');
    }
};

postsCltr.create = async (req, res) => {

    try{
        const post = new Post(req.body)
        await post.save()
        res.status(201).json(post)
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'something went wrong'})
    }
}

postsCltr.update = async (req, res) => {

    try{
        let post
        const id = req.params.id
        const body = req.body
        post = await Post.findByIdAndUpdate(id, body, {new: true})
        
        if(!post){
            return res.status(404).json({ message: 'Post not found' })
        }
        return res.json(post)

    }catch(err){
        console.log(err)
        res.status(500).json({error: 'something went wrong'})
    }
}

postsCltr.delete = async (req, res) => {
    try{
        let post
        const id = req.params.id
        
        post = await Post.findByIdAndDelete(id)
        
        if(!post){
            return res.status(404).json({ message: 'Post not found' })
        }
        return res.json(post)

    }catch(err){
        console.log(err)
        res.status(500).json({error: 'something went wrong'})
    }
}

export default postsCltr