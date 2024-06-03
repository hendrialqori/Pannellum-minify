# Background
Based on the issue created at pannellum repo's [https://github.com/mpetroff/pannellum/issues/1182](https://github.com/mpetroff/pannellum/issues/1182),
I took the initiative to create a src folder to minify the version using Webpack.

## how to implement?
### React
Copied the build folder from this repo and pasted it in your project, then created an index folder to import that file and import it to use in another file.
```js
//index.ts
import './build/pannellum.min.js'
import './build/pannellum.min.css'

const pannellum = (window as any).pannellum

export default pannellum
```
```jsx
//App.jsx
import React from 'react'
import pannellum from 'your_path_pannellum_export_file'

export default function App(){
    const containerRef = React.useRef()
    const viewerRef = React.useRef()
    
    React.useEffect(function initialView(){
        //read official API doc pannellumjs
        //https://pannellum.org/documentation/api/

        viewerRef.current = pannellum.viewer(containerRef.current, {
                type: "equirectangular",
                panorama: "https://pannellum.org/images/cerro-toco-0.jpg",
                yaw: 176,
                pitch: -12,
                autoLoad: true,
                hotSpots: [
                    {
                    "id": "1",
                    "pitch": 14.1,
                    "yaw": 100,
                    "type": "info",
                    "text": "Baltimore Museum of Art",
                    "dragHandlerFunc": dragHandler,
                    "dragHandlerArgs": "example arg"
                    "draggable": "true",
                    },
                ]
            })
    }, [])
  
     function dragHandler(event, args) {
        console.log(event, args);
      }

    return (
        // if styling using tailwind css
        <div ref={containerRef} className="w-full h-screen"/>
    )
}
```

### Vanilla Javascript
```html
<!DOCTYPE HTML>
<html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hot spots</title>
      <link rel="stylesheet" href="./build/pannellum.min.css"/>
      <script type="text/javascript" src="./build/pannellum.min.js"></script>
      <style>
      #panorama {
          width: 100%;
          height: 100vh;
      }
      </style>
  </head>
  <body>
  
  <div id="panorama"></div>
    <script>
    function dragHandler(event, args) {
        console.log(event, args);
    }
    
    pannellum.viewer('panorama', {
        "type": "equirectangular",
        "panorama": "examplepano.jpg",
        "hotSpots": [
            {
                "pitch": 14.1,
                "yaw": 1.5,
                "type": "info",
                "text": "Example",
                "draggable": true,
                "dragHandlerFunc": dragHandler,
                "dragHandlerArgs": "example arg"
            },
        ]
    });
    </script>
  
  </body>
</html>
```
