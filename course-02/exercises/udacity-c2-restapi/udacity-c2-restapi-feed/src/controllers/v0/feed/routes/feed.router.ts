import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import * as AWS from '../../../../aws';
import { reset } from 'continuation-local-storage';

const router: Router = Router();

// Get all feed items
router.get('/', async (req: Request, res: Response) => {
    const items = await FeedItem.findAndCountAll({order: [['id', 'DESC']]});
    items.rows.map((item) => {
            if(item.url) {
                item.url = AWS.getGetSignedUrl(item.url);
            }
    });
    res.send(items);
});

//@TODO
//Add an endpoint to GET a specific resource by Primary Key

// update a specific resource
router.patch('/:id', 
    // requireAuth, 
    async (req: Request, res: Response) => {
        //@TODO try it yourself
        const item = await FeedItem.findOne({where: {id : req.params.id}});
        if(item) {
            // update 
            const caption = req.body.caption;

            if(!req.params.id) {
                return res.status(400).send('Id is required');
            }

            if(!caption) {
                return res.status(400).send('Caption is required');
            }

            const updatedItem = await item.update({caption: caption}, 
                {where: {id:req.params.id}});
            
            return res.status(201).send(updatedItem);
        }

        res.send(400).send("Item not found");
        
});


// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName', 
    // requireAuth, 
    async (req: Request, res: Response) => {
    let { fileName } = req.params;
    const url = AWS.getPutSignedUrl(fileName);
    res.status(201).send({url: url});
});

// Post meta data and the filename after a file is uploaded 
// NOTE the file name is they key name in the s3 bucket.
// body : {caption: string, fileName: string};
router.post('/', 
    // requireAuth, 
    async (req: Request, res: Response) => {
    const caption = req.body.caption;
    const fileName = req.body.url;

    // check Caption is valid
    if (!caption) {
        return res.status(400).send({ message: 'Caption is required or malformed' });
    }

    // check Filename is valid
    if (!fileName) {
        return res.status(400).send({ message: 'File url is required' });
    }

    const item = await new FeedItem({
            caption: caption,
            url: fileName
    });

    const saved_item = await item.save();

    saved_item.url = AWS.getGetSignedUrl(saved_item.url);
    res.status(201).send(saved_item);
});

export const FeedRouter: Router = router;