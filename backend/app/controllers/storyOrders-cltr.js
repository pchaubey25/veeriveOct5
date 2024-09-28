import StoryOrder from '../models/storyOrder-model.js'
const storyOrdersCltr = {}

storyOrdersCltr.list = async (req, res) => {
    try{
        const response = await StoryOrder.find({})
        res.json(response)
        console.log(response)
    } catch(err) {
        console.log(err)
        res.json(err)
    }
    
}

storyOrdersCltr.create = async (req, res) => {

    try {
        const storyOrders = req.body; // Expecting an array
        const savedOrders = await Promise.all(
            storyOrders.map(order => new StoryOrder(order).save())
        );
        res.status(200).json(savedOrders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

storyOrdersCltr.update = async (req, res) => {

    try{
        let storyOrder
        const id = req.params.id
        const body = req.body
        storyOrder = await StoryOrder.findByIdAndUpdate(id, body, {new: true})
        
        if(!storyOrder){
            return res.status(404).json({ message: 'Story Order not found' })
        }
        return res.json(storyOrder)

    }catch(err){
        console.log(err)
        res.status(500).json({error: 'something went wrong'})
    }
}

storyOrdersCltr.delete = async (req, res) => {
    try{
        let storyOrder
        const id = req.params.id
        
        storyOrder = await StoryOrder.findByIdAndDelete(id)
        
        if(!storyOrder){
            return res.status(404).json({ message: 'Story Order not found' })
        }
        return res.json(storyOrder)

    }catch(err){
        console.log(err)
        res.status(500).json({error: 'something went wrong'})
    }
}

export default storyOrdersCltr