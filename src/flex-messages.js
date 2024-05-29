/*
import express, { Request, Response } from "express";
import mongoose, { mongo } from "mongoose";
import Product, { IProduct } from "./model/product";
import Survey from "./model/survey";
import connectDB from "./config/db";
import cors from 'cors'
import * as line from '@line/bot-sdk';

  

const app = express();
const port = process.env.PORT || 8080;

connectDB()

app.use(cors({
  origin: '*',
  methods : 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: "eCR3NwXUmzIqOq8HMYtuXooaWPDEBlszMMeF6BGoyRk4XpK2Ho89HV+hF0IUBuhsTRZYhWxLzRPFV6GyywHaaY7EL4t6uH8KgWUDTh4crPqW560gTHNJC98g+eStkQXgxKUO5StidnjRdPDxScYUHAdB04t89/1O/w1cDnyilFU=",

});

app.get("/", (_req: Request, res: Response) => {
  res.status(201).json({ message: "Welcome to Auth ts" });
});

app.get("/ping", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome Ping" });
});

app.get("/products", async (_req: Request, res: Response) => {
  const data = await Product.find({})
  res.status(200).json(data);
});

app.get("/products/:id", async (req:Request , res:Response ) => {
   try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/products", (req:Request, res:Response) => {
  Product.create(req.body)
    .then((products) => {
      res.json(products);
    })

});

app.put("/products/:id", (req:Request, res:Response) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then( (products) => {
      res.json(products);
    })

});

app.delete("/products/:id", (req:Request, res:Response ) => {
  Product.findByIdAndDelete(req.params.id,req.body)
    .then(  (products) => {
      res.json(products);
    })

});

// Surveys
app.get("/surveys", (req:Request, res:Response) => {
  Survey.find()
    .then((surveys) => {
      res.json(surveys); 
    })
});


app.get("/surveys/:id", (req:Request , res:Response) => {
  Survey.findById(req.params.id)
    .then((surveys) => {
      res.json(surveys);
    })
   
});

app.post("/surveys", (req:Request, res:Response) => {
  Survey.create(req.body)
    .then((surveys) => {
      res.json(surveys);
    })
   
});

app.put("/surveys/:id", (req:Request, res:Response) => {
  Survey.findByIdAndUpdate(req.params.id,req.body)
    .then( (surveys) => {
      res.json(surveys);
    })
   
});

app.delete("/surveys/:id", (req:Request, res:Response) => {
  Survey.findByIdAndDelete(req.params.id,req.body)
    .then(  (surveys) => {
      res.json(surveys);
    })
   
});

app.post("/webhook", (req: Request, res: Response) => {
  const event = req.body.events[0] ?? undefined;
    if(!event)
    return res.sendStatus(200).end()
    console.log("event=>",event)
  

    if (event.type === 'message') {
      const message = event.message;
    
      if (message.type === 'text' ) {

       if(message.text === 'à¹à¸à¸£à¹à¸¡à¸à¸±à¸'){
          client.replyMessage({
          replyToken: event.replyToken,
          messages: [{
            type: 'text',
            text: 'à¹à¸ªà¸µà¸¢à¹à¸ ToT à¹à¸¡à¹à¸¡à¸µà¹à¸à¸£à¹à¸¥à¸¢à¸¢à¸¢',
             }]
          });
        }
        else if(message.text === 'à¸ªà¸­à¸à¸à¸²à¸¡à¸ªà¸´à¸à¸à¹à¸²'){
          client.replyMessage({
          replyToken: event.replyToken,
          messages: [{
            type: 'text',
            text: 'à¸¢à¸´à¸à¸à¸µà¸à¹à¸­à¸à¸£à¸±à¸à¸ªà¸¹à¹à¹à¸à¸à¸à¸­à¸ GameProduct \nà¸¥à¸­à¸à¸à¸à¸¥à¸´à¹à¸à¸à¹à¸à¸µà¹à¸à¸¹à¸à¹à¸²à¸²à¸² => https://liff.line.me/2005244347-lY246dm4 ',
             }]
          });
        }
       else if(message.text === 'à¸£à¸²à¸¢à¸¥à¸°à¹à¸­à¸µà¸¢à¸'){
          client.replyMessage({
          replyToken: event.replyToken,
          messages: [{
            type: 'text',
            text: 'à¸¢à¸´à¸à¸à¸µà¸à¹à¸­à¸à¸£à¸±à¸à¸ªà¸¹à¹à¹à¸à¸à¸à¸­à¸ GameProduct \nà¸à¸¶à¹à¸à¹à¸à¹à¸à¹à¸à¸à¸à¸µà¹à¹à¸­à¸²à¹à¸§à¹à¹à¸¥à¸·à¸­à¸à¸à¸¹à¸à¸±à¸§à¸­à¸¢à¹à¸²à¸à¸«à¸£à¸·à¸­à¸à¹à¸­à¸¡à¸¹à¸¥à¸à¸­à¸à¹à¸à¸¡',
             }]
          });
        }
       else if(message.text === 'à¸à¹à¸­à¸¡à¸¹à¸¥à¸à¸­à¸à¸à¸±à¸'){
          client.getProfile(event.source.userId).then(proflie =>{
            client.replyMessage({
              replyToken: event.replyToken,
              messages: [{
                type: 'text',
                text: `à¸à¸·à¹à¸­à¸à¸­à¸à¸à¸¸à¸ = ${proflie.displayName}\nà¸ªà¹à¸à¸à¸±à¸ªà¸à¸­à¸à¸à¸¸à¸ = ${proflie.statusMessage}
                `,
              }]
            })
          })
        }   
        else if(message.text === 'à¸£à¸­à¸à¸³à¹à¸à¸´à¸à¸à¸²à¸£...'){
          client.getProfile(event.source.userId).then(proflie =>{
            client.replyMessage({
              replyToken: event.replyToken,
              messages: [{
                type: 'text',
                text: `à¸à¸¸à¸ ${proflie.displayName} à¹à¸£à¸²à¸à¸­à¸à¸­à¸à¸à¸¸à¸à¸à¸µà¹à¹à¸§à¹à¹à¸à¹à¸£à¸²\n(à¸.à¸¥. à¹à¸à¹à¸à¹à¸à¸µà¸¢à¸à¸à¸²à¸£à¸à¸·à¹à¸­à¸à¸¥à¸­à¸¡à¹à¹à¸à¹à¸²à¸à¸±à¹à¸)`
              }]
            })
          })
        }else  {
          client.replyMessage(
            {
              replyToken: event.replyToken,
              messages: [
                {
                  type: 'text',
                text: 'à¸¢à¸´à¸à¸à¸µà¸à¹à¸­à¸à¸£à¸±à¸à¸ªà¸¹à¹à¹à¸à¸à¸à¸­à¸ GameProduct',
                quickReply: {
                    items: [
                      {
                        type: 'action',
                        action: {
                          type: 'message',
                          label: 'à¸ªà¸­à¸à¸à¸²à¸¡à¸ªà¸´à¸à¸à¹à¸²',
                          text: 'à¸ªà¸­à¸à¸à¸²à¸¡à¸ªà¸´à¸à¸à¹à¸²'
                        }
                      },
                      {
                        type: 'action',
                        action: {
                          type: 'message',
                          label: 'à¹à¸à¸£à¹à¸¡à¸à¸±à¸',
                          text: 'à¹à¸à¸£à¹à¸¡à¸à¸±à¸'
                        }
                      },
                      {
                        type: 'action',
                        action: {
                          type: 'message',
                          label: 'à¸à¹à¸­à¸¡à¸¹à¸¥à¸à¸­à¸à¸à¸±à¸',
                          text: 'à¸à¹à¸­à¸¡à¸¹à¸¥à¸à¸­à¸à¸à¸±à¸'
                        }
                      },
                      {
                        type: 'action',
                        action: {
                          type: 'message',
                          label: 'à¸£à¸²à¸¢à¸¥à¸°à¹à¸­à¸µà¸¢à¸',
                          text: 'à¸£à¸²à¸¢à¸¥à¸°à¹à¸­à¸µà¸¢à¸'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          )
        }   
      }
    }
    
  })

app.post("/sent-gameproduct/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  // const _id = req.query._id as string ;
  // console.log("id=> "+_id)
  
  // console.log(req.body)
  console.log(req.body)
  console.log("userId=> "+userId)
  const {prod_id, prod_img, prod_name, prod_desc, prod_price,url } = req.body ;

 
   client.pushMessage({
      to: userId,
      messages:[
        {
          "type": "flex",
          "altText": "รหัสสินค้า id "+prod_id,
          "contents": {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": prod_img,
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover",
              "action": {
                "type": "uri",
                "uri": url
              }
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text":  prod_name,
                  "weight": "bold",
                  "size": "xxl"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "margin": "lg",
                  "spacing": "md",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "vertical",
                      "spacing": "none",
                      "contents": [
                        {
                          "type": "box",
                          "layout": "vertical",
                          "contents": [
                            {
                              "type": "text",
                              "text": "รายละเอียด",
                              "weight": "bold",
                              "size": "xl"
                            }
                          ]
                        },
                        {
                          "type": "box",
                          "layout": "vertical",
                          "contents": [
                            {
                              "type": "text",
                              "text": prod_desc,
                              "size": "md",
                              "margin": "none",
                              "style": "italic",
                              "action": {
                                "type": "uri",
                                "uri": url,
                                "label": "Our Website"
                              },
                              "color": "#9290C3"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "text": "ราคา",
                          "size": "md",
                          "color": "#000000",
                          "weight": "bold"
                        }
                      ]
                    },
                    {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "box",
                          "layout": "vertical",
                          "contents": [
                            {
                              "type": "text",
                              "text": "จาก "+ (prod_price + (prod_price*50/100)).toFixed(0)+" บาท",
                              "style": "italic",
                              "decoration": "line-through",
                              "align": "center",
                              "color": "#B31312"
                            }
                          ]
                        },
                        {
                          "type": "text",
                          "text": "ลดเหลือ "+ prod_price.toFixed(0)+" บาท",
                          "color": "#22c55e",
                          "size": "lg",
                          "style": "normal",
                          "weight": "bold",
                          "align": "center"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "button",
                      "action": {
                        "type": "message",
                        "label": "ยืนยัน",
                        "text": "รอดำเนินการ..."
                      },
                      "color": "#ffffff"
                    }
                  ],
                  "backgroundColor": "#6842FF",
                  "justifyContent": "center",
                  "alignItems": "center",
                  "cornerRadius": "xxl",
                  "borderColor": "#000000",
                  "borderWidth": "none"
                }
              ]
            }
          }
        } 
        ,
        {
          type:"text",
          text: `รายละเอียด \n${prod_desc}`

        }
      ]
    })

  })



app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});




*/
