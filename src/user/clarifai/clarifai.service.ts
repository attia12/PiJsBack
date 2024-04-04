import { Injectable } from '@nestjs/common';
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");


@Injectable()
export class ClarifaiService {
    
    // async detectImage(imageUrl: string): Promise<any> {
    //     const PAT = 'a9d8c7705f43455e85df03477823755d';
    //     const USER_ID = 'clarifai';
    //     const APP_ID = 'main';
    //     const MODEL_ID = 'general-image-detection';
    //     const MODEL_VERSION_ID = '1580bb1932594c93b7e2e04456af7c6f';
        
    
    //     const stub = ClarifaiStub.grpc();
    //     const metadata = new grpc.Metadata();
    //     metadata.set('authorization', 'Key ' + PAT);
    
    //     return new Promise((resolve, reject) => {
    //       stub.PostModelOutputs(
    //         {
    //           user_app_id: {
    //             user_id: USER_ID,
    //             app_id: APP_ID,
    //           },
    //           model_id: MODEL_ID,
    //           version_id: MODEL_VERSION_ID,
    //           inputs: [
    //             {
    //               data: {
    //                 image: {
    //                   url: imageUrl,
    //                   allow_duplicate_url: true,
    //                 },
    //               },
    //             },
    //           ],
    //         },
    //         metadata,
    //         (err, response) => {
    //           if (err) {
    //             reject(err);
    //           } else {
    //             resolve(response);
    //           }
    //         },
    //       );
    //     });
    //   }
    async detectImage(imageUrl: string): Promise<any> {
        const PAT = 'a9d8c7705f43455e85df03477823755d';
        const USER_ID = 'clarifai';
        const APP_ID = 'main';
        const MODEL_ID = 'general-image-detection';
        const MODEL_VERSION_ID = '1580bb1932594c93b7e2e04456af7c6f';
        
        const stub = ClarifaiStub.grpc();
        const metadata = new grpc.Metadata();
        metadata.set('authorization', 'Key ' + PAT);
    
        return new Promise((resolve, reject) => {
          stub.PostModelOutputs(
            {
              user_app_id: {
                user_id: USER_ID,
                app_id: APP_ID,
              },
              model_id: MODEL_ID,
              version_id: MODEL_VERSION_ID,
              inputs: [
                {
                  data: {
                    image: {
                      url: imageUrl,
                      allow_duplicate_url: true,
                    },
                  },
                },
              ],
            },
            metadata,
            (err, response) => {
              if (err) {
                reject(err);
              } else {
                resolve(response);

                // Logging region and concept details
                const regions = response.outputs[0].data.regions;
                regions.forEach(region => {
                    const boundingBox = region.region_info.bounding_box;
                    const topRow = boundingBox.top_row.toFixed(3);
                    const leftCol = boundingBox.left_col.toFixed(3);
                    const bottomRow = boundingBox.bottom_row.toFixed(3);
                    const rightCol = boundingBox.right_col.toFixed(3);

                    region.data.concepts.forEach(concept => {
                        const name = concept.name;
                        const value = concept.value.toFixed(4);

                        console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
                    });
                });
              }
            },
          );
        });
      }
   
      
}
